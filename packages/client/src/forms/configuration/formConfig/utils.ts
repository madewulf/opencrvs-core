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
  getIdentifiersFromFieldId
} from '@client/forms/questionConfig'
import { Event, CustomFieldType, QuestionInput } from '@client/utils/gateway'
import { camelCase, keys } from 'lodash'
import { FieldPosition, FieldEnabled } from '@client/forms/configuration'
import { getDefaultLanguage } from '@client/i18n/utils'
import { MessageDescriptor } from 'react-intl'
import { deserializeFormField } from '@client/forms/mappings/deserializer'
import { createCustomField } from '@client/forms/configuration/customUtils'
import {
  registerForms,
  PlaceholderPreviewGroups
} from '@client/forms/configuration/default'

const CUSTOM_FIELD_LABEL = 'Custom Field'

type IConnection = {
  precedingFieldId: string
  foregoingFieldId: string
}

type IIdentifiers = {
  sectionIndex: number
  groupIndex: number
  fieldIndex: number
}

export type IDefaultConfigField = IDefaultQuestionConfig & IConnection

export type ICustomConfigField = ICustomQuestionConfig & IConnection

export type IPreviewGroupConfigField = {
  fieldId: string //previewGroupId
  label: MessageDescriptor
  configFields: IDefaultConfigField[]
} & IConnection

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

export function isDefaultConfigField(
  configField: IConfigField
): configField is IDefaultConfigField {
  return (
    !isCustomConfigField(configField) && !isPreviewGroupConfigField(configField)
  )
}

export function isCustomConfigField(
  configField: IConfigField
): configField is ICustomConfigField {
  return 'custom' in configField
}

export function isPreviewGroupConfigField(
  configField: IConfigField
): configField is IPreviewGroupConfigField {
  return 'previewGroupId' in configField
}

export function getLastFieldOfPreviewGroup({
  configFields
}: IPreviewGroupConfigField) {
  return configFields[configFields.length - 1]
}

export function getFirstFieldOfPreviewGroup({
  configFields
}: IPreviewGroupConfigField) {
  return configFields[0]
}

function defaultFieldToQuestionConfig(
  fieldId: string,
  { precedingFieldId }: IConnection,
  { sectionIndex, groupIndex, fieldIndex }: IIdentifiers,
  field: SerializedFormField
): IDefaultConfigField {
  return {
    fieldId,
    enabled: field.enabled ?? '',
    required: field.required,
    precedingFieldId,
    foregoingFieldId: FieldPosition.BOTTOM,
    identifiers: {
      sectionIndex,
      groupIndex,
      fieldIndex
    }
  }
}

export function getFieldDefinition(
  configField: IDefaultConfigField | ICustomConfigField
) {
  const { event } = getConfigFieldIdentifiers(configField.fieldId)
  const defaultForm = registerForms[event]
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

export function getContentKeys(formField: IFormField) {
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

export function getCertificateHandlebar(formField: IFormField) {
  return formField.mapping?.template?.[0]
}

function getFieldId(
  event: Event,
  section: ISerializedFormSection,
  group: ISerializedFormSectionGroup,
  field: SerializedFormField
) {
  return [event.toLowerCase(), section.id, group.id, field.name].join('.')
}

function getPreviewGroupLabel(
  group: ISerializedFormSectionGroup,
  previewGroupId: string
) {
  const previewGroup = group.previewGroups!.find(
    ({ id }) => id === previewGroupId
  )
  if (!previewGroup) {
    throw new Error(`No preview group found for ${previewGroupId}`)
  }
  return previewGroup.label
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
                field.previewGroup,
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

export function getDefaultConfigFieldIdentifiers(
  defaultConfigField: IDefaultConfigField
) {
  const { sectionIndex, groupIndex, fieldIndex } =
    defaultConfigField.identifiers
  return {
    event: defaultConfigField.fieldId.split('.')[0] as Event,
    sectionIndex,
    groupIndex,
    fieldIndex
  }
}

function getIdentifiersInDefaultForm(
  defaultConfigField: IDefaultConfigField,
  defaultForm: ISerializedForm
) {
  const { event, sectionId, groupId, fieldName } = getIdentifiersFromFieldId(
    defaultConfigField.fieldId
  )

  const sectionIndex = defaultForm.sections.findIndex(
    ({ id }) => id === sectionId
  )

  const groups = defaultForm.sections[sectionIndex].groups

  const groupIndex = groups.findIndex(({ id }) => id === groupId)

  const fields = groups[groupIndex].fields

  const fieldIndex = fields.findIndex(({ name }) => name === fieldName)

  return {
    event: event as Event,
    sectionIndex,
    groupIndex,
    fieldIndex
  }
}

function getPrecedingDefaultFieldId(
  defaultFieldIdentifiers: ReturnType<typeof getIdentifiersInDefaultForm>,
  defaultForm: ISerializedForm
) {
  const { event, sectionIndex, groupIndex, fieldIndex } =
    defaultFieldIdentifiers
  /* First field of the section */
  if (!fieldIndex && !groupIndex) {
    return FieldPosition.TOP
  }
  const section = defaultForm.sections[sectionIndex]
  /* First field of the group */
  if (!fieldIndex) {
    const group = section.groups[groupIndex - 1]
    const field = group.fields[group.fields.length - 1]
    return getFieldId(event, section, group, field)
  }
  const group = section.groups[groupIndex]
  const field = group.fields[fieldIndex - 1]
  return getFieldId(event, section, group, field)
}

export function hasDefaultFieldChanged(
  defaultConfigField: IDefaultConfigField,
  defaultForm: ISerializedForm
) {
  const defaultFieldIdentifiers = getIdentifiersInDefaultForm(
    defaultConfigField,
    defaultForm
  )

  const { sectionIndex, groupIndex, fieldIndex } = defaultFieldIdentifiers
  const defaultFormField =
    defaultForm.sections[sectionIndex].groups[groupIndex].fields[fieldIndex]
  const precedingDefaultFieldId = getPrecedingDefaultFieldId(
    defaultFieldIdentifiers,
    defaultForm
  )
  if (precedingDefaultFieldId !== defaultConfigField.precedingFieldId) {
    return true
  }
  return (
    defaultConfigField.enabled === FieldEnabled.DISABLED ||
    /* These can be undefined so need to be converted to boolean */
    !!defaultFormField.required !== !!defaultConfigField.required
  )
}

function determineNextFieldIdNumber(
  fieldsMap: IConfigFieldMap,
  event: Event,
  section: string,
  groupId: string
): number {
  const partialHandleBar = camelCase(CUSTOM_FIELD_LABEL)
  const customFieldNumber = keys(fieldsMap)
    .filter((item) => item.includes(partialHandleBar))
    .map((item) => {
      const elemNumber = item.replace(
        `${event}.${section}.${groupId}.${partialHandleBar}`,
        ''
      )
      return parseInt(elemNumber)
    })
  return customFieldNumber.length ? Math.max(...customFieldNumber) + 1 : 1
}

export function generateKeyFromObj(obj: any) {
  return btoa(JSON.stringify(obj))
}

function getLastConfigField(fieldsMap: IConfigFieldMap) {
  return Object.values(fieldsMap).find(
    ({ foregoingFieldId }) => foregoingFieldId === FieldPosition.BOTTOM
  )
}

export function prepareNewCustomFieldConfig(
  fieldsMap: IConfigFieldMap,
  event: Event,
  section: string,
  groupId: string,
  fieldType: CustomFieldType
): ICustomConfigField {
  const customFieldNumber = determineNextFieldIdNumber(
    fieldsMap,
    event,
    section,
    groupId
  )
  const defaultMessage = `${CUSTOM_FIELD_LABEL} ${customFieldNumber}`
  const customFieldIndex = `${event}.${section}.${groupId}.${camelCase(
    defaultMessage
  )}`
  const lastField = getLastConfigField(fieldsMap)

  const { fieldId } = !lastField
    ? { fieldId: FieldPosition.TOP }
    : isPreviewGroupConfigField(lastField)
    ? getLastFieldOfPreviewGroup(lastField)
    : lastField

  return {
    fieldId: customFieldIndex,
    fieldName: camelCase(defaultMessage),
    fieldType,
    precedingFieldId: fieldId,
    foregoingFieldId: FieldPosition.BOTTOM,
    required: false,
    custom: true,
    label: [
      {
        lang: getDefaultLanguage(),
        descriptor: {
          id: `form.customField.label.customField${customFieldNumber}`,
          defaultMessage
        }
      }
    ]
  }
}

export function generateModifiedQuestionConfigs(
  configFields: ISectionFieldMap,
  defaultRegisterForm: ISerializedForm
) {
  const questionConfigs: QuestionInput[] = []
  Object.values(configFields).forEach((sectionConfigFields) => {
    Object.values(sectionConfigFields).forEach((configField) => {
      if (isCustomConfigField(configField)) {
        const { foregoingFieldId, ...rest } = configField
        questionConfigs.push(rest)
      } else if (
        isDefaultConfigField(configField) &&
        hasDefaultFieldChanged(configField, defaultRegisterForm)
      ) {
        const { foregoingFieldId, identifiers, ...rest } = configField
        questionConfigs.push(rest)
      }
    })
  })
  return questionConfigs
}
