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
import { getIdentifiersFromFieldId } from '@client/forms/questionConfig'
import { getGroup, getSection } from '.'

// THIS FILE CONTAINS FUNCTIONS TO CONFIGURE THE DEFAULT CONFIGURATION

/* For the enabled field in FormFields */
export enum FieldEnabled {
  DISABLED = 'DISABLED'
}

export interface IDefaultField {
  index: number
  selectedSectionIndex: number
  selectedGroupIndex: number
  field: SerializedFormField
}

export function getDefaultField(
  form: ISerializedForm,
  fieldId: string
): IDefaultField | undefined {
  const questionIdentifiers = getIdentifiersFromFieldId(fieldId)
  const selectedSection = getSection(
    form.sections,
    questionIdentifiers.sectionId
  )
  const selectedGroup = getGroup(
    selectedSection.section.groups,
    questionIdentifiers.groupId
  )

  if (selectedGroup.group) {
    const selectedField = selectedGroup.group.fields.filter(
      (field) => field.name === questionIdentifiers.fieldName
    )[0]
    if (!selectedField) {
      return undefined
    }
    return {
      index: selectedGroup.group.fields.indexOf(selectedField),
      field: selectedField,
      selectedGroupIndex: selectedGroup.index,
      selectedSectionIndex: selectedSection.index
    }
  } else {
    return undefined
  }
}
