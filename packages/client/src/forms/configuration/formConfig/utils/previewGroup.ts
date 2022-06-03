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
import { IConfigField, IConnection } from '.'
import { IDefaultQuestionConfig } from '@client/forms/questionConfig'
import { MessageDescriptor } from 'react-intl'
import { IDefaultConfigField } from './defaultConfig'
import { ISerializedFormSectionGroup } from '@client/forms'

export type IPreviewGroupConfigField = {
  fieldId: string //event.sectionid.groupId.previewGroupId
  label: MessageDescriptor
  configFields: IDefaultConfigField[]
} & IConnection

export function previewGroupToQuestionConfig(
  configField: IPreviewGroupConfigField
): IDefaultQuestionConfig[] {
  return configField.configFields.map((field) => {
    const { foregoingFieldId, ...rest } = field
    return rest
  })
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

export function getPreviewGroupLabel(
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
