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
import { CustomFieldType, Event } from '@client/utils/gateway'
import { Message } from 'typescript-react-intl'
import { registerForms } from '@client/forms/configuration/default'

export interface IMessage {
  lang: string
  descriptor: Message
}

interface IBaseQuestionConfig {
  fieldId: string
  precedingFieldId: string
}

export interface IDefaultQuestionConfig extends IBaseQuestionConfig {
  required?: boolean
  enabled: string
  identifiers: {
    sectionIndex: number
    groupIndex: number
    fieldIndex: number
  }
}

export interface ICustomQuestionConfig extends IBaseQuestionConfig {
  custom: boolean
  label: IMessage[]
  required: boolean
  placeholder?: IMessage[]
  description?: IMessage[]
  tooltip?: IMessage[]
  errorMessage?: IMessage[]
  maxLength?: number
  fieldName: string
  fieldType: CustomFieldType
}

export type IQuestionConfig = IDefaultQuestionConfig | ICustomQuestionConfig

export interface IQuestionPayload {
  fieldId: string
  label?: IMessage[]
  placeholder?: IMessage[]
  description?: IMessage[]
  tooltip?: IMessage[]
  errorMessage?: IMessage[]
  maxLength?: number
  fieldName?: string
  fieldType?: CustomFieldType
  precedingFieldId: string
  required?: boolean
  enabled?: string
  custom?: boolean
}

export function isDefaultQuestionConfig(
  questionConfig: IQuestionConfig
): questionConfig is IDefaultQuestionConfig {
  return !('custom' in questionConfig)
}

export function getIdentifiersFromFieldId(fieldId: string) {
  const splitIds = fieldId.split('.')
  return {
    event: splitIds[0] as Event,
    sectionId: splitIds[1],
    groupId: splitIds[2],
    fieldName: splitIds[3]
  }
}

export function getCustomizedDefaultField(question: IDefaultQuestionConfig) {
  const { event } = getIdentifiersFromFieldId(question.fieldId)

  const {
    identifiers: { sectionIndex, groupIndex, fieldIndex },
    ...rest
  } = question

  const defaultForm = registerForms[event]

  const serializedField =
    defaultForm.sections[sectionIndex].groups[groupIndex].fields[fieldIndex]

  return {
    ...serializedField,
    ...rest
  }
}

export function getIdentifiersInDefaultForm(fieldId: string) {
  const { event, sectionId, groupId, fieldName } =
    getIdentifiersFromFieldId(fieldId)

  const defaultForm = registerForms[event]

  const sectionIndex = defaultForm.sections.findIndex(
    ({ id }) => id === sectionId
  )

  const groups = defaultForm.sections[sectionIndex].groups

  const groupIndex = groups.findIndex(({ id }) => id === groupId)

  const fields = groups[groupIndex].fields

  const fieldIndex = fields.findIndex(({ name }) => name === fieldName)

  return {
    event,
    sectionIndex,
    groupIndex,
    fieldIndex
  }
}

/* TODO: The paylaod needs to be validated */
export function questionsTransformer(
  questionsPayload: IQuestionPayload[]
): IQuestionConfig[] {
  return questionsPayload.map(
    ({
      fieldId,
      label,
      placeholder,
      description,
      tooltip,
      errorMessage,
      maxLength,
      fieldName,
      fieldType,
      precedingFieldId,
      required,
      enabled,
      custom
    }) => {
      if (custom) {
        return {
          fieldId,
          label,
          placeholder,
          description,
          tooltip,
          errorMessage,
          maxLength,
          fieldName,
          fieldType,
          precedingFieldId,
          required: required ?? false,
          custom
        } as ICustomQuestionConfig
      }

      const defaultQuestionConfig: IDefaultQuestionConfig = {
        fieldId,
        enabled: enabled ?? '',
        precedingFieldId,
        identifiers: getIdentifiersInDefaultForm(fieldId)
      }
      if (required !== undefined) {
        defaultQuestionConfig.required = required
      }
      return defaultQuestionConfig
    }
  )
}
