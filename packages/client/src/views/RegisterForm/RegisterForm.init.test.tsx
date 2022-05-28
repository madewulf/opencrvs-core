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
import * as React from 'react'
import {
  createTestComponent,
  getRegisterFormFromStore,
  createTestStore
} from '@client/tests/util'
import { RegisterForm } from '@client/views/RegisterForm/RegisterForm'
import {
  createDeclaration,
  IUserData,
  getCurrentUserID,
  getDeclarationsOfCurrentUser,
  writeDeclarationByUser,
  deleteDeclarationByUser,
  IDeclaration
} from '@client/declarations'
import { DRAFT_BIRTH_PARENT_FORM_PAGE } from '@opencrvs/client/src/navigation/routes'

import { Event } from '@client/utils/gateway'
import { storage } from '@client/storage'
import { IUserDetails } from '@client/utils/userUtils'
describe('when user logs in', () => {
  // Some mock data
  const draft1 = createDeclaration(Event.Birth)
  const draft2 = createDeclaration(Event.Death)
  const draft3 = createDeclaration(Event.Birth)

  const currentUserData: IUserData = {
    userID: 'shakib75',
    declarations: [draft1, draft2]
  }

  const anotherUserData: IUserData = {
    userID: 'mortaza',
    declarations: [draft3]
  }

  const currentUserDetails: IUserDetails = {
    userMgntUserID: 'shakib75',
    localRegistrar: { name: [] }
  }

  const indexedDB = {
    USER_DATA: JSON.stringify([currentUserData, anotherUserData]),
    USER_DETAILS: JSON.stringify(currentUserDetails)
  }

  beforeEach(() => {
    // Mocking storage reading
    // @ts-ignore
    storage.getItem = jest.fn((key: string) => {
      switch (key) {
        case 'USER_DATA':
        case 'USER_DETAILS':
          return indexedDB[key]
        default:
          return undefined
      }
    })

    // Mocking storage writing
    // @ts-ignore
    storage.setItem = jest.fn((key: string, value: string) => {
      switch (key) {
        case 'USER_DATA':
        case 'USER_DETAILS':
          indexedDB[key] = value
          break
        default:
          break
      }
    })
  })

  it('should read userID correctly', async () => {
    const uID = await getCurrentUserID() // reads from USER_DETAILS and returns the userMgntUserID, if exists
    expect(uID).toEqual('shakib75')
  })

  it('should read only the drafts of the currently logged-in user', async () => {
    const details = await getDeclarationsOfCurrentUser()
    const currentUserDrafts = (JSON.parse(details) as IUserData).declarations
    expect(currentUserDrafts.length).toBe(2)
    expect(currentUserDrafts[0]).toEqual(draft1)
    expect(currentUserDrafts[1]).toEqual(draft2)
    expect(
      currentUserDrafts.find((draft) => draft.id === draft3.id)
    ).toBeFalsy()
  })

  describe('Declaration in index db', () => {
    let draft: IDeclaration

    beforeAll(async () => {
      draft = createDeclaration(Event.Death)
      jest.mock('lodash/debounce', () => jest.fn((fn) => fn))
      const { store } = await createTestStore()
      await writeDeclarationByUser(
        store.getState,
        currentUserData.userID,
        draft
      )
    })

    it("should save the draft inside the current user's array of drafts", async () => {
      // Now, let's check if the new draft is added
      const details = await getDeclarationsOfCurrentUser()
      const currentUserDrafts = (JSON.parse(details) as IUserData).declarations
      expect(currentUserDrafts.length).toBe(3)
      expect(currentUserDrafts[0]).toBeTruthy()
    })

    it("should delete the draft from the current user's array of declarations", async () => {
      await deleteDeclarationByUser(currentUserData.userID, draft)

      // Now, let's check if the new draft is added
      const details = await getDeclarationsOfCurrentUser()
      const currentUserDrafts = (JSON.parse(details) as IUserData).declarations
      expect(currentUserDrafts.length).toBe(2)
      expect(
        currentUserDrafts.find((cDraft) => cDraft.id === draft.id)
      ).toBeFalsy()
    })
  })
})

describe('when there is no user-data saved', () => {
  it('should return an empty array', async () => {
    // Mocking storage reading
    // @ts-ignore
    storage.getItem = jest.fn((key: string): string => {
      switch (key) {
        case 'USER_DATA':
          return '[]'
        case 'USER_DETAILS':
          return '{ "userMgntUserID": "tamimIq" }'
        default:
          return ''
      }
    })
    const str = await getDeclarationsOfCurrentUser()
    const drafts = (JSON.parse(str) as IUserData).declarations
    expect(drafts.length).toBe(0)
  })
})

describe('when user is in the register form before initial draft load', () => {
  it('throws error when draft not found after initial drafts load', async () => {
    const { store, history } = await createTestStore()

    const mock: any = jest.fn()
    const draft = createDeclaration(Event.Birth)
    const form = await getRegisterFormFromStore(store, Event.Birth)

    try {
      await createTestComponent(
        // @ts-ignore
        <RegisterForm
          location={mock}
          history={history}
          staticContext={mock}
          registerForm={form}
          declaration={draft}
          pageRoute={DRAFT_BIRTH_PARENT_FORM_PAGE}
          match={{
            params: { declarationId: '', pageId: '', groupId: '' },
            isExact: true,
            path: '',
            url: ''
          }}
        />,
        { store, history }
      )
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
