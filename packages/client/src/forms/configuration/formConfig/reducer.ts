/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import { IForm, IFormConfig } from '@client/forms'
import { Event } from '@client/utils/gateway'
import { FieldPosition, getConfiguredForm } from '@client/forms/configuration'
import * as actions from '@client/forms/configuration/formConfig/actions'
import {
  getEventDraft,
  IFormDraft,
  DEFAULT_FORM_DRAFT
} from '@client/forms/configuration/formDrafts/utils'
import * as offlineActions from '@client/offline/actions'
import { Cmd, Loop, loop, LoopReducer } from 'redux-loop'
import {
  getConfigFieldIdentifiers,
  getElementsOfPreviewGroup,
  getIndexOfPlaceholderPreviewGroup,
  hasPreviewGroup,
  samePreviewGroupID,
  shiftCurrentFieldDown,
  shiftCurrentFieldUp
} from './motionUtils'
import { getSectionFieldsMap, IConfigFieldMap, ISectionFieldMap } from './utils'

export type IFormConfigState =
  | {
      state: 'LOADING'
      birth: null
      death: null
    }
  | {
      state: 'READY'
      birth: {
        formDraft: IFormDraft
        registerForm: IForm
        configFields: ISectionFieldMap
      }
      death: {
        formDraft: IFormDraft
        registerForm: IForm
        configFields: ISectionFieldMap
      }
    }

export const initialState: IFormConfigState = {
  state: 'LOADING',
  birth: null,
  death: null
}

type Actions = actions.ConfigFieldsActions | offlineActions.Action

function getPreviousField(fieldMap: IConfigFieldMap, fieldId: string) {
  const currentField = fieldMap[fieldId]

  const { precedingFieldId } = currentField

  return precedingFieldId && precedingFieldId !== FieldPosition.TOP
    ? fieldMap[precedingFieldId]
    : undefined
}

function getNextField(fieldMap: IConfigFieldMap, fieldId: string) {
  const currentField = fieldMap[fieldId]

  const { foregoingFieldId } = currentField

  return foregoingFieldId !== FieldPosition.BOTTOM
    ? fieldMap[foregoingFieldId]
    : undefined
}

function getReadyState({ formDrafts, questionConfig }: IFormConfig) {
  const birthForm = getConfiguredForm(questionConfig, Event.Birth, true)
  const deathForm = getConfiguredForm(questionConfig, Event.Death, true)
  return {
    state: 'READY' as const,
    birth: {
      formDraft:
        getEventDraft(formDrafts, Event.Birth) ||
        DEFAULT_FORM_DRAFT[Event.Birth],
      registerForm: birthForm,
      configFields: getSectionFieldsMap(Event.Birth, birthForm, questionConfig)
    },
    death: {
      formDraft:
        getEventDraft(formDrafts, Event.Death) ||
        DEFAULT_FORM_DRAFT[Event.Death],
      registerForm: deathForm,
      configFields: getSectionFieldsMap(Event.Death, deathForm, questionConfig)
    }
  }
}

function shiftUp(fieldMap: IConfigFieldMap, fieldId: string) {
  let newSection = { ...fieldMap }
  let currentField = fieldMap[fieldId]
  let previousField = getPreviousField(fieldMap, fieldId)
  let nextField = getNextField(fieldMap, fieldId)

  if (undefined !== previousField && hasPreviewGroup(previousField)) {
    while (
      previousField &&
      getIndexOfPlaceholderPreviewGroup(newSection, previousField) > -1 &&
      !samePreviewGroupID(previousField, currentField)
    ) {
      newSection = shiftCurrentFieldUp(
        newSection,
        currentField,
        previousField,
        nextField
      )

      previousField = getPreviousField(newSection, fieldId)
      nextField = getNextField(newSection, fieldId)
      currentField = newSection[fieldId]
    }
  } else {
    newSection = shiftCurrentFieldUp(
      fieldMap,
      currentField,
      previousField,
      nextField
    )
  }

  return newSection
}

function shiftDown(fieldMap: IConfigFieldMap, fieldId: string) {
  let newSection = { ...fieldMap }
  let currentField = fieldMap[fieldId]
  let previousField = getPreviousField(fieldMap, fieldId)
  let nextField = getNextField(fieldMap, fieldId)

  if (undefined !== nextField && hasPreviewGroup(nextField)) {
    while (
      nextField &&
      getIndexOfPlaceholderPreviewGroup(newSection, nextField, true) > -1 &&
      !samePreviewGroupID(nextField, currentField)
    ) {
      newSection = shiftCurrentFieldDown(
        newSection,
        currentField,
        previousField,
        nextField
      )

      previousField = getPreviousField(newSection, fieldId)
      nextField = getNextField(newSection, fieldId)
      currentField = newSection[fieldId]
    }
  } else {
    newSection = shiftCurrentFieldDown(
      fieldMap,
      currentField,
      previousField,
      nextField
    )
  }

  return newSection
}

export const formConfigReducer: LoopReducer<IFormConfigState, Actions> = (
  state: IFormConfigState = initialState,
  action: Actions
): IFormConfigState | Loop<IFormConfigState, Actions> => {
  /* First loading when offline formConfig is ready*/
  if (state.state === 'LOADING') {
    if (action.type === offlineActions.READY) {
      return getReadyState(action.payload.formConfig)
    }
    return state
  }

  switch (action.type) {
    case offlineActions.APPLICATION_CONFIG_LOADED:
    case offlineActions.OFFLINE_FORM_CONFIG_UPDATED: {
      return getReadyState(action.payload.formConfig)
    }

    case actions.ADD_CUSTOM_FIELD: {
      const { event, section, customField } = action.payload
      const fields = {
        ...state[event].configFields[section],
        [customField.fieldId]: customField
      }

      if (
        customField.precedingFieldId &&
        customField.precedingFieldId !== FieldPosition.TOP
      ) {
        fields[customField.precedingFieldId] = {
          ...fields[customField.precedingFieldId],
          foregoingFieldId: customField.fieldId
        }
      }

      return {
        ...state,
        [event]: {
          ...state[event],
          configFields: {
            ...state[event].configFields,
            [section]: fields
          }
        }
      }
    }

    case actions.MODIFY_CONFIG_FIELD: {
      const { fieldId, modifiedProps } = action.payload
      const { event, sectionId } = getConfigFieldIdentifiers(fieldId)
      const { [fieldId]: originalField, ...fields } =
        state[event].configFields[sectionId]

      /* Adjusting precedingFieldId & foregoingFieldId */
      if (modifiedProps.fieldId && fieldId !== modifiedProps.fieldId) {
        if (
          originalField.precedingFieldId &&
          originalField.precedingFieldId !== FieldPosition.TOP
        ) {
          fields[originalField.precedingFieldId] = {
            ...fields[originalField.precedingFieldId],
            foregoingFieldId: modifiedProps.fieldId
          }
        }

        if (originalField.foregoingFieldId !== FieldPosition.BOTTOM)
          fields[originalField.foregoingFieldId] = {
            ...fields[originalField.foregoingFieldId],
            precedingFieldId: modifiedProps.fieldId
          }

        fields[modifiedProps.fieldId] = {
          ...originalField,
          ...modifiedProps
        }

        return {
          ...state,
          [event]: {
            ...state[event],
            configFields: {
              ...state[event].configFields,
              [sectionId]: fields
            }
          }
        }
      }

      fields[fieldId] = {
        ...originalField,
        ...modifiedProps
      }

      return {
        ...state,
        [event]: {
          ...state[event],
          configFields: {
            ...state[event].configFields,
            [sectionId]: fields
          }
        }
      }
    }

    case actions.REMOVE_CUSTOM_FIELD: {
      const { fieldId } = action.payload
      const { event, sectionId } = getConfigFieldIdentifiers(fieldId)

      const { [fieldId]: fieldToRemove, ...fields } =
        state[event].configFields[sectionId]

      if (
        fieldToRemove.precedingFieldId &&
        fieldToRemove.precedingFieldId !== FieldPosition.TOP
      ) {
        fields[fieldToRemove.precedingFieldId] = {
          ...fields[fieldToRemove.precedingFieldId],
          foregoingFieldId: fieldToRemove.foregoingFieldId
        }
      }
      if (fieldToRemove.foregoingFieldId !== FieldPosition.BOTTOM) {
        fields[fieldToRemove.foregoingFieldId] = {
          ...fields[fieldToRemove.foregoingFieldId],
          precedingFieldId: fieldToRemove.precedingFieldId
        }
      }

      return {
        ...state,
        [event]: {
          ...state[event],
          configFields: {
            ...state[event].configFields,
            [sectionId]: fields
          }
        }
      }
    }

    case actions.SHIFT_CONFIG_FIELD_UP: {
      const { fieldId } = action.payload
      const { event, sectionId } = getConfigFieldIdentifiers(fieldId)
      const fieldMap = state[event].configFields[sectionId]
      const currentField = fieldMap[fieldId]
      let newSection = { ...fieldMap }

      if (hasPreviewGroup(currentField)) {
        const elements = getElementsOfPreviewGroup(
          fieldMap,
          currentField.previewGroupID
        )

        elements.forEach((element) => {
          newSection = shiftUp(newSection, element.fieldId)
        })
      } else {
        newSection = shiftUp(fieldMap, fieldId)
      }

      return {
        ...state,
        [event]: {
          ...state[event],
          configFields: {
            ...state[event].configFields,
            [sectionId]: newSection
          }
        }
      }
    }

    case actions.SHIFT_CONFIG_FIELD_DOWN: {
      const { fieldId } = action.payload
      const { event, sectionId } = getConfigFieldIdentifiers(fieldId)
      const fieldMap = state[event].configFields[sectionId]
      const currentField = fieldMap[fieldId]
      let newSection = { ...fieldMap }

      if (hasPreviewGroup(currentField)) {
        const elements = getElementsOfPreviewGroup(
          fieldMap,
          currentField.previewGroupID
        )

        elements.reverse().forEach((element) => {
          newSection = shiftDown(newSection, element.fieldId)
        })
      } else {
        newSection = shiftDown(fieldMap, fieldId)
      }

      return {
        ...state,
        [event]: {
          ...state[event],
          configFields: {
            ...state[event].configFields,
            [sectionId]: newSection
          }
        }
      }
    }

    case actions.UPDATE_FORM_CONFIG: {
      const { formDraft, questionConfig } = action.payload

      const { event } = formDraft

      const newState = {
        ...state,
        [event]: {
          ...state[event],
          formDraft
        }
      }

      const {
        birth: { formDraft: birthFormDraft },
        death: { formDraft: deathFormDraft }
      } = newState

      return loop(
        newState,
        Cmd.action(
          offlineActions.updateOfflineFormConfig(
            [birthFormDraft, deathFormDraft],
            questionConfig
          )
        )
      )
    }

    default:
      return state
  }
}
