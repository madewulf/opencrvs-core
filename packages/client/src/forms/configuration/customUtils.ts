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

import { ISerializedForm, SerializedFormField } from '@client/forms/index'
import {
  IQuestionConfig,
  IMessage,
  ICustomQuestionConfig
} from '@client/forms/questionConfig'
import { find } from 'lodash'
import { MessageDescriptor } from 'react-intl'
import { IDefaultField } from '@client/forms/configuration/defaultUtils'
import {
  getGroup,
  getIdentifiersFromFieldId,
  getSection,
  IGroup,
  ISection
} from '@client/forms/configuration'
import { getDefaultLanguage } from '@client/i18n/utils'

// THIS FILE CONTAINS FUNCTIONS TO CONFIGURE CUSTOM FORM CONFIGURATIONS

interface ICustomQuestionConfiguration {
  question: IQuestionConfig
  field: SerializedFormField
}
export interface ISortedCustomGroup {
  preceedingDefaultField?: IDefaultField
  positionTop?: boolean
  questions: ICustomQuestionConfiguration[]
  sectionIndex: number
  groupIndex: number
}

export function createCustomGroup(
  form: ISerializedForm,
  customQuestionConfigurations: ISortedCustomGroup[],
  question: ICustomQuestionConfig,
  preceedingDefaultField: IDefaultField | null,
  positionTop?: boolean
) {
  const customQuestionIdentifiers = getIdentifiersFromFieldId(question.fieldId)
  const section: ISection = getSection(
    form.sections,
    customQuestionIdentifiers.sectionId
  )
  const group: IGroup = getGroup(
    section.section.groups,
    customQuestionIdentifiers.groupId
  )
  const newCustomGroup: ISortedCustomGroup = {
    sectionIndex: section.index,
    groupIndex: group.index,
    questions: [{ question, field: createCustomField(question) }]
  }
  if (preceedingDefaultField) {
    newCustomGroup.preceedingDefaultField = preceedingDefaultField
  }
  if (positionTop) {
    newCustomGroup.positionTop = positionTop
  }
  customQuestionConfigurations.push(newCustomGroup)
}

function getDefaultLanguageMessage(messages: IMessage[] | undefined) {
  const language = getDefaultLanguage()
  const defaultMessage = find(messages, {
    lang: language
  })
  return defaultMessage?.descriptor
}

export function createCustomField({
  fieldName,
  fieldId,
  custom,
  fieldType,
  label,
  description,
  tooltip,
  placeholder,
  required,
  maxLength
}: ICustomQuestionConfig): SerializedFormField {
  const baseField: SerializedFormField = {
    name: fieldName,
    customQuesstionMappingId: fieldId,
    custom,
    required,
    type: fieldType,
    label: getDefaultLanguageMessage(label) as MessageDescriptor,
    initialValue: '',
    validate: [],
    description: getDefaultLanguageMessage(description),
    tooltip: getDefaultLanguageMessage(tooltip),
    mapping: {
      mutation: {
        operation: 'customFieldToQuestionnaireTransformer'
      },
      query: {
        operation: 'questionnaireToCustomFieldTransformer'
      }
      /* TODO: Add template mapping so that handlebars work */
    }
  }
  if (
    baseField.type === 'TEXT' ||
    baseField.type === 'NUMBER' ||
    baseField.type === 'TEXTAREA'
  ) {
    baseField.placeholder = getDefaultLanguageMessage(
      placeholder
    ) as MessageDescriptor
  }
  if (baseField.type === 'TEL') {
    baseField.validate = [
      {
        operation: 'phoneNumberFormat'
      }
    ]
  }
  if (baseField.type === 'TEXT' || baseField.type === 'TEXTAREA') {
    baseField.maxLength = maxLength
  }
  return baseField
}

export function getCustomFields(
  customQuestionConfig: ICustomQuestionConfiguration[]
) {
  const fields: SerializedFormField[] = []
  customQuestionConfig.forEach((config) => {
    fields.push(config.field)
  })
  return fields
}
