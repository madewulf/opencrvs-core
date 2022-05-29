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
import { CustomFieldType } from '@client/utils/gateway'
import { Message } from 'typescript-react-intl'

export interface IMessage {
  lang: string
  descriptor: Message
}

interface IBaseQuestionConfig {
  fieldId: string
  precedingFieldId: string
  custom: boolean
}

export interface IDefaultQuestionConfig extends IBaseQuestionConfig {
  required?: boolean
  enabled: string
}

export interface ICustomQuestionConfig extends IBaseQuestionConfig {
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
  return !questionConfig.custom
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
      return {
        fieldId,
        enabled: enabled ?? '',
        required,
        precedingFieldId,
        custom: false
      }
    }
  )
}
