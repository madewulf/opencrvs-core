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

import {
  IFormField,
  ISerializedFormSection,
  ISerializedFormSectionGroup,
  SerializedFormField,
  IRadioOption,
  ISelectOption,
  RADIO_GROUP_WITH_NESTED_FIELDS,
  RADIO_GROUP,
  SELECT_WITH_OPTIONS,
  DOCUMENT_UPLOADER_WITH_OPTION,
  ISerializedForm,
  IRadioGroupFormField,
  IRadioGroupWithNestedFieldsFormField,
  ISelectFormFieldWithOptions,
  IDocumentUploaderWithOptionsFormField
} from '@client/forms'
import {
  IQuestionConfig,
  IDefaultQuestionConfig,
  ICustomQuestionConfig,
  isDefaultQuestionConfig,
  IIdentifiers
} from '@client/forms/questionConfig'
import { Event, QuestionInput } from '@client/utils/gateway'
import { FieldPosition } from '@client/forms/configuration'
import { deserializeFormField } from '@client/forms/mappings/deserializer'
import { createCustomField } from '@client/forms/configuration/customUtils'
import { PlaceholderPreviewGroups } from '@client/forms/configuration/default'
import {
  isPreviewGroupConfigField,
  getLastFieldOfPreviewGroup,
  previewGroupToQuestionConfig,
  IPreviewGroupConfigField,
  getPreviewGroupLabel
} from './previewGroup'
import { ICustomConfigField, isCustomConfigField } from './customConfig'
import {
  IDefaultConfigField,
  defaultFieldToQuestionConfig,
  isDefaultConfigField,
  hasDefaultFieldChanged
} from './defaultConfig'

export * from './previewGroup'
export * from './motion'
export * from './customConfig'
export * from './defaultConfig'

export type IConnection = {
  precedingFieldId: string
  foregoingFieldId: string
}

export type IConfigField =
  | IDefaultConfigField
  | ICustomConfigField
  | IPreviewGroupConfigField

export type IConfigFieldMap = Record<string, IConfigField>

export type ISectionFieldMap = Record<string, IConfigFieldMap>

export function getConfigFieldIdentifiers(fieldId: string) {
  const [event, sectionId] = fieldId.split('.')
  return {
    event: event as Event,
    sectionId
  }
}

export function getFieldDefinition(
  configField: IDefaultConfigField | ICustomConfigField,
  defaultForm: ISerializedForm
) {
  let formField: IFormField
  if (isDefaultConfigField(configField)) {
    const { sectionIndex, groupIndex, fieldIndex } = configField.identifiers
    formField = deserializeFormField({
      ...defaultForm.sections[sectionIndex].groups[groupIndex].fields[
        fieldIndex
      ],
      required: configField.required
    })
  } else {
    formField = deserializeFormField(createCustomField(configField))
  }
  /* We need to build the field regardless of the conditionals */
  delete formField.conditionals
  return formField
}

function hasOptions(
  formField: IFormField
): formField is
  | IRadioGroupFormField
  | IRadioGroupWithNestedFieldsFormField
  | ISelectFormFieldWithOptions
  | IDocumentUploaderWithOptionsFormField {
  if (
    formField.type === RADIO_GROUP ||
    formField.type === RADIO_GROUP_WITH_NESTED_FIELDS ||
    formField.type === SELECT_WITH_OPTIONS ||
    formField.type === DOCUMENT_UPLOADER_WITH_OPTION
  ) {
    return true
  }
  return false
}

function getContentKey(formField: IFormField) {
  let contentKeys = [formField.label.id]
  if (
    hasOptions(formField) &&
    !['country', 'countryPrimary', 'countrySecondary'].includes(formField.name)
  ) {
    contentKeys = contentKeys.concat(
      /* We can remove this type assertion in typescript 4.2+ */
      (formField.options as (ISelectOption | IRadioOption)[]).map(
        (option) => option.label.id
      )
    )
  }
  return contentKeys
}

export function getContentKeys(
  configField: IDefaultConfigField | IPreviewGroupConfigField,
  defaultForm: ISerializedForm
) {
  return isDefaultConfigField(configField)
    ? getContentKey(getFieldDefinition(configField, defaultForm))
    : configField.configFields
        .map((field) => getContentKey(getFieldDefinition(field, defaultForm)))
        .flat()
}

export function getCertificateHandlebar(formField: IFormField) {
  return formField.mapping?.template?.[0]
}

export function getFieldId(
  event: Event,
  section: ISerializedFormSection,
  group: ISerializedFormSectionGroup,
  field: SerializedFormField
) {
  return [event, section.id, group.id, field.name].join('.')
}

export function getSectionFieldsMap(
  event: Event,
  defaultForm: ISerializedForm,
  questionConfig: IQuestionConfig[]
) {
  const questionsMap = questionConfig.reduce<Record<string, IQuestionConfig>>(
    (accum, question) => ({ ...accum, [question.fieldId]: question }),
    {}
  )

  const hasPreviewGroup = (
    field: SerializedFormField
  ): field is SerializedFormField & { previewGroup: string } => {
    return !!field.previewGroup
  }

  const isPlaceHolderPreviewGroup = (previewGroup: string) => {
    return PlaceholderPreviewGroups.includes(previewGroup)
  }

  const addPreviewGroup = (
    fieldId: string,
    previewGroupId: string,
    connections: IConnection,
    identifiers: IIdentifiers,
    fieldMap: IConfigFieldMap
  ) => {
    const { precedingFieldId, foregoingFieldId } = connections
    const { sectionIndex, groupIndex, fieldIndex } = identifiers
    const group = defaultForm.sections[sectionIndex].groups[groupIndex]
    const field = group.fields[fieldIndex]

    const defaultConfigField = defaultFieldToQuestionConfig(
      fieldId,
      connections,
      identifiers,
      field
    )
    if (previewGroupId in fieldMap) {
      ;(fieldMap[previewGroupId] as IPreviewGroupConfigField).configFields.push(
        defaultConfigField
      )
    } else {
      fieldMap[previewGroupId] = {
        precedingFieldId,
        foregoingFieldId,
        fieldId: previewGroupId,
        label: getPreviewGroupLabel(group, previewGroupId),
        configFields: []
      }
    }
  }

  const isCustomizedField = (fieldId: string) => {
    return fieldId in questionsMap
  }

  const addCustomizedField = (fieldId: string, fieldMap: IConfigFieldMap) => {
    fieldMap[fieldId] = {
      ...questionsMap[fieldId],
      foregoingFieldId: FieldPosition.BOTTOM
    }
  }

  const addDefaultField = (
    fieldId: string,
    connections: IConnection,
    identifiers: IIdentifiers,
    fieldMap: IConfigFieldMap
  ) => {
    const { sectionIndex, groupIndex, fieldIndex } = identifiers
    const field =
      defaultForm.sections[sectionIndex].groups[groupIndex].fields[fieldIndex]
    const defaultConfigField = defaultFieldToQuestionConfig(
      fieldId,
      connections,
      identifiers,
      field
    )
    fieldMap[fieldId] = defaultConfigField
  }

  return defaultForm.sections.reduce<ISectionFieldMap>(
    (sectionFieldMap, section, sectionIndex) => {
      let precedingFieldId: string = FieldPosition.TOP
      sectionFieldMap[section.id] = section.groups.reduce<IConfigFieldMap>(
        (groupFieldMap, group, groupIndex) =>
          group.fields.reduce((fieldMap, field, fieldIndex) => {
            const fieldId = getFieldId(event, section, group, field)
            const connections = {
              precedingFieldId,
              foregoingFieldId: FieldPosition.BOTTOM
            }
            const identifiers = {
              sectionIndex,
              groupIndex,
              fieldIndex
            }
            if (isCustomizedField(fieldId)) {
              addCustomizedField(fieldId, fieldMap)
            } else if (
              hasPreviewGroup(field) &&
              isPlaceHolderPreviewGroup(field.previewGroup)
            ) {
              addPreviewGroup(
                fieldId,
                [event, section.id, group.id, field.previewGroup].join('.'),
                connections,
                identifiers,
                fieldMap
              )
            } else {
              addDefaultField(fieldId, connections, identifiers, fieldMap)
            }

            if (precedingFieldId in fieldMap) {
              fieldMap[precedingFieldId].foregoingFieldId = fieldId
            }
            precedingFieldId = fieldId

            return fieldMap
          }, groupFieldMap),
        {}
      )
      return sectionFieldMap
    },
    {}
  )
}

export function generateKeyFromObj(obj: any) {
  return btoa(JSON.stringify(obj))
}

function configFieldToQuestionConfig(
  configField: IConfigField
): Array<IDefaultQuestionConfig | ICustomQuestionConfig> {
  if (isCustomConfigField(configField)) {
    const { foregoingFieldId, ...rest } = configField
    return [rest]
  }
  if (isPreviewGroupConfigField(configField)) {
    return previewGroupToQuestionConfig(configField)
  }
  const { foregoingFieldId, ...rest } = configField
  return [rest]
}

function configFieldsToQuestionConfigs(configFields: ISectionFieldMap) {
  const getPrecedingFieldId = ({ precedingFieldId, fieldId }: IConfigField) => {
    if (precedingFieldId === FieldPosition.TOP) return precedingFieldId
    const { sectionId } = getConfigFieldIdentifiers(fieldId)
    const previousConfigField = configFields[sectionId][precedingFieldId]
    if (isPreviewGroupConfigField(previousConfigField)) {
      return getLastFieldOfPreviewGroup(previousConfigField).fieldId
    }
    return previousConfigField.fieldId
  }

  return Object.values(configFields).reduce<
    Array<IDefaultQuestionConfig | ICustomQuestionConfig>
  >(
    (sectionQuestionConfigs, sectionConfigFields) =>
      Object.values(sectionConfigFields).reduce(
        (questionConfigs, configField) => {
          return [
            ...questionConfigs,
            ...configFieldToQuestionConfig(configField).map(
              (questionConfig) => ({
                ...questionConfig,
                precedingFieldId: getPrecedingFieldId(configField)
              })
            )
          ]
        },
        sectionQuestionConfigs
      ),
    []
  )
}

export function generateModifiedQuestionConfigs(
  configFields: ISectionFieldMap,
  defaultRegisterForm: ISerializedForm
): QuestionInput[] {
  const questionConfigs = configFieldsToQuestionConfigs(configFields)

  return questionConfigs
    .filter((questionConfig) => {
      if (isDefaultQuestionConfig(questionConfig)) {
        return hasDefaultFieldChanged(questionConfig, defaultRegisterForm)
      }
      return true
    })
    .map((questionConfig) => {
      if (isDefaultQuestionConfig(questionConfig)) {
        const { identifiers, ...rest } = questionConfig
        return rest
      }
      return questionConfig
    })
}
