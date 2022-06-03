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
  IDefaultQuestionConfig,
  IIdentifiers
} from '@client/forms/questionConfig'
import {
  IConnection,
  IConfigField,
  getFieldId,
  getConfigFieldIdentifiers
} from '.'
import { isCustomConfigField } from './customConfig'
import { isPreviewGroupConfigField } from './previewGroup'
import { SerializedFormField, ISerializedForm } from '@client/forms'
import { FieldPosition, FieldEnabled } from '@client/forms/configuration'
import { Event } from '@client/utils/gateway'

export type IDefaultConfigField = IDefaultQuestionConfig & IConnection

export function isDefaultConfigField(
  configField: IConfigField
): configField is IDefaultConfigField {
  return (
    !isCustomConfigField(configField) && !isPreviewGroupConfigField(configField)
  )
}

export function defaultFieldToQuestionConfig(
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

export function getPrecedingDefaultFieldId(
  {
    event,
    sectionIndex,
    groupIndex,
    fieldIndex
  }: IIdentifiers & { event: Event },
  defaultForm: ISerializedForm
) {
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
  questionConfig: IDefaultQuestionConfig,
  defaultForm: ISerializedForm
) {
  const { sectionIndex, groupIndex, fieldIndex } = questionConfig.identifiers
  const { event } = getConfigFieldIdentifiers(questionConfig.fieldId)
  const defaultFormField =
    defaultForm.sections[sectionIndex].groups[groupIndex].fields[fieldIndex]
  const precedingDefaultFieldId = getPrecedingDefaultFieldId(
    { ...questionConfig.identifiers, event },
    defaultForm
  )
  if (precedingDefaultFieldId !== questionConfig.precedingFieldId) {
    return true
  }
  return (
    questionConfig.enabled === FieldEnabled.DISABLED ||
    /* These can be undefined so need to be converted to boolean */
    !!defaultFormField.required !== !!questionConfig.required
  )
}
