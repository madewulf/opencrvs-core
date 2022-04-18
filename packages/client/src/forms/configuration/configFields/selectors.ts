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

import { IStoreState } from '@client/store'
import { Event } from '@client/forms'

export function selectConfigFields(
  store: IStoreState,
  event: Event,
  section: string
) {
  if (store.configFields.state === 'LOADING') {
    throw new Error('ConfigFields not loaded yet')
  }
  return store.configFields[event][section]
}

export function selectConfigField(
  store: IStoreState,
  event: Event,
  section: string,
  fieldId: string
) {
  return selectConfigFields(store, event, section)[fieldId]
}