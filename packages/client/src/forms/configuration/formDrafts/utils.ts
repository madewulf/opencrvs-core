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
import { find } from 'lodash'
import { Event } from '@client/forms'

export enum DraftStatus {
  DRAFT = 'DRAFT',
  PREVIEW = 'IN_PREVIEW',
  PUBLISHED = 'PUBLISHED'
}

export const DEFAULT_FORM_DRAFT = {
  [Event.BIRTH]: {
    version: 0,
    status: DraftStatus.DRAFT,
    event: Event.BIRTH,
    history: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  [Event.DEATH]: {
    version: 0,
    status: DraftStatus.DRAFT,
    event: Event.DEATH,
    history: [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
}

export interface IDraftHistory {
  version: number
  status: DraftStatus
  comment?: string
  updatedAt: number
}

export interface IFormDraft {
  event: Event
  status: DraftStatus
  comment?: string
  version: number
  history: IDraftHistory[]
  updatedAt: number
  createdAt: number
}

export function getEventDraft(formDrafts: IFormDraft[], event: Event) {
  return find(formDrafts, { event })
}
