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
import { IFormConfig, ISerializedForm } from '@client/forms/index'
import {
  IQuestionConfig,
  isDefaultQuestionConfig,
  IDefaultQuestionConfig,
  getIdentifiersInDefaultForm,
  getCustomizedDefaultField
} from '@client/forms/questionConfig'
import { createCustomField } from '@client/forms/configuration/customUtils'
import { getEventDraft } from '@client/forms/configuration/formDrafts/utils'
import { registerForms } from './default'
import { DraftStatus, Event } from '@client/utils/gateway'
import { populateRegisterFormsWithAddresses } from './administrative/addresses'
import { deserializeForm } from '@client/forms/mappings/deserializer'

// THIS FILE SORTS & COMBINES CONFIGURATIONS WITH THE DEFAULT CONFIGURATION FOR RENDERING IN THE APPLICATION

/*
 * For precedingFieldId & foregoingFieldId to
 * denote front most and bottom most position
 */
export enum FieldPosition {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM'
}

/* For the enabled field in FormFields */
export enum FieldEnabled {
  DISABLED = 'DISABLED'
}

/* A singly linked list of questionConfigs whose
 * preceding field is a default field, which, is not
 * a part of the questionConfigs
 */
type IQuestionConfigList = {
  precedingFieldId: string
  questions: IQuestionConfig[]
}

function isConfigurable(status: DraftStatus | null) {
  return status === DraftStatus.Published || status === DraftStatus.InPreview
}

function filterOutDefaultFields(
  serializedForm: ISerializedForm,
  defaultQuestionConfigs: IDefaultQuestionConfig[]
): ISerializedForm {
  const filteredForm: ISerializedForm = { ...serializedForm }
  defaultQuestionConfigs.forEach(
    ({ identifiers: { sectionIndex, groupIndex, fieldIndex } }) => {
      filteredForm.sections = filteredForm.sections.map((section, idx) => {
        if (idx !== sectionIndex) {
          return section
        }
        return {
          ...section,
          groups: section.groups.map((group, idx) => {
            if (idx !== groupIndex) {
              return group
            }
            return {
              ...group,
              fields: group.fields.filter((_, idx) => idx !== fieldIndex)
            }
          })
        }
      })
    }
  )
  return filteredForm
}

function getQuestionConfigLists(questionConfigs: IQuestionConfig[]) {
  const questionsMap = questionConfigs.reduce<
    Record<string, IQuestionConfig | undefined>
  >((accum, question) => ({ ...accum, [question.fieldId]: question }), {})

  const foregoingFieldMap = questionConfigs.reduce<
    Record<string, IQuestionConfig | undefined>
  >((accum, question) => {
    accum[question.precedingFieldId] = question
    return accum
  }, {})

  return questionConfigs.reduce<IQuestionConfigList[]>((accum, question) => {
    /* Not the head of the linked list */
    if (question.precedingFieldId in questionsMap) {
      return accum
    }
    const { precedingFieldId } = question
    const questions: IQuestionConfig[] = []
    let currentQuestion: IQuestionConfig | undefined = question
    while (currentQuestion) {
      questions.push(currentQuestion)
      currentQuestion = foregoingFieldMap[question.fieldId]
    }
    return accum.concat({
      precedingFieldId,
      questions
    })
  }, [])
}

function getCustomizedFields(questionConfigs: IQuestionConfig[]) {
  return questionConfigs.map((question) => {
    if (isDefaultQuestionConfig(question)) {
      return getCustomizedDefaultField(question)
    }
    return createCustomField(question)
  })
}

function getFormWithCustomizedFields(
  serializedForm: ISerializedForm,
  questionConfigs: IQuestionConfig[]
) {
  const configuredForm: ISerializedForm = { ...serializedForm }

  const questionLists = getQuestionConfigLists(questionConfigs)

  questionLists.forEach((list) => {
    const { sectionIndex, groupIndex, fieldIndex } =
      getIdentifiersInDefaultForm(list.precedingFieldId)
    configuredForm.sections = configuredForm.sections.map((section, idx) => {
      if (idx !== sectionIndex) {
        return section
      }
      return {
        ...section,
        groups: section.groups.map((group, idx) => {
          if (idx !== groupIndex) {
            return group
          }
          const modifiedFields = getCustomizedFields(list.questions)
          return {
            ...group,
            fields: [
              ...group.fields.slice(0, fieldIndex),
              ...modifiedFields,
              ...group.fields.slice(fieldIndex)
            ]
          }
        })
      }
    })
  })

  return configuredForm
}

export function getConfiguredForm(
  serializedForm: ISerializedForm,
  { questionConfig }: IFormConfig
) {
  const defaultQuestionConfigs = questionConfig.filter(
    (question): question is IDefaultQuestionConfig =>
      isDefaultQuestionConfig(question)
  )
  const configuredForm = filterOutDefaultFields(
    serializedForm,
    defaultQuestionConfigs
  )

  return getFormWithCustomizedFields(configuredForm, questionConfig)
}

function filterOutDisabledFields(
  serializedForm: ISerializedForm
): ISerializedForm {
  return {
    ...serializedForm,
    sections: serializedForm.sections.map((section) => {
      return {
        ...section,
        groups: section.groups.map((group) => {
          return {
            ...group,
            fields: group.fields.filter(
              (field) => field.enabled !== FieldEnabled.DISABLED
            )
          }
        })
      }
    })
  }
}

/* This is for configuring the register and review forms */
export function getConfiguredOrDefaultForm(
  formConfig: IFormConfig,
  event: Event
) {
  const { status } = getEventDraft(formConfig.formDrafts, event) || {
    status: null
  }

  const formWithAddresses = populateRegisterFormsWithAddresses(
    registerForms[event],
    event
  )

  const form = isConfigurable(status)
    ? getConfiguredForm(formWithAddresses, formConfig)
    : formWithAddresses

  return deserializeForm(filterOutDisabledFields(form))
}
