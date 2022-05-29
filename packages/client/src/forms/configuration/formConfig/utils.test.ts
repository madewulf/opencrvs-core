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
  getContentKeys,
  getCertificateHandlebar,
  isDefaultField,
  IDefaultConfigField,
  ICustomConfigField
} from './utils'
import { IFormField } from '@client/forms'
import { CustomFieldType } from '@client/utils/gateway'

const mockFormField: IFormField = {
  name: 'dummyField',
  type: 'TEXT',
  label: {
    id: 'test.dummy'
  },
  mapping: {
    template: ['dummyHandlebar', () => {}]
  },
  validate: [() => undefined]
}

describe('getContentKeys', () => {
  it('should return the keys if available', () => {
    expect(getContentKeys(mockFormField)).toEqual(['test.dummy'])
  })
})

describe('getCertificateHandlebar', () => {
  it('should return the certificate handlebar if available', () => {
    expect(getCertificateHandlebar(mockFormField)).toBe('dummyHandlebar')
  })
})

describe('isDefaultField', () => {
  const defaultConfigField: IDefaultConfigField = {
    fieldId: 'dummy.defaultFieldId',
    enabled: '',
    custom: false,
    identifiers: {
      fieldIndex: 0,
      groupIndex: 0,
      sectionIndex: 0
    },
    preceedingFieldId: 'dummy.precedingFieldId',
    foregoingFieldId: 'dummy.foregoingFieldId'
  }

  const customConfigField: ICustomConfigField = {
    fieldId: 'dummy.customField',
    fieldType: CustomFieldType.Tel,
    required: false,
    fieldName: 'customField',
    label: [
      {
        lang: 'en',
        descriptor: { id: 'dummy.customField', defaultMessage: 'Custom Field' }
      }
    ],
    custom: true,
    preceedingFieldId: 'dummy.precedingFieldId',
    foregoingFieldId: 'dummy.foregoingFieldId'
  }
  it('should return true for defaultConfigField', () => {
    expect(isDefaultField(defaultConfigField)).toBe(true)
  })

  it('should return false for customConfigField', () => {
    expect(isDefaultField(customConfigField)).toBe(false)
  })
})
