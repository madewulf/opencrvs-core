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
import { ReactWrapper } from 'enzyme'
import { History } from 'history'
import {
  createTestComponent,
  createTestStore,
  flushPromises
} from '@client/tests/util'
import { AppStore } from '@client/store'
import { RegistrationRates } from '@client/views/Performance/RegistrationRates'
import { EVENT_REGISTRATION_RATES } from '@client/navigation/routes'
import {
  HAS_CHILD_LOCATION,
  FETCH_MONTH_WISE_EVENT_ESTIMATIONS
} from '@client/views/Performance/queries'
import { waitForElement } from '@client/tests/wait-for-element'
import queryString from 'query-string'

const LOCATION_DHAKA_DIVISION = {
  displayLabel: 'Dhaka Division',
  id: '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b',
  searchableText: 'Dhaka'
}
const timeStart = new Date(2019, 11, 6)
const timeEnd = new Date(2019, 11, 13)

const graphqlMocks = [
  {
    request: {
      query: HAS_CHILD_LOCATION,
      variables: { parentId: '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b' }
    },
    result: {
      data: {
        hasChildLocation: {
          id: 'd70fbec1-2b26-474b-adbc-bb83783bdf29',
          type: 'ADMIN_STRUCTURE',
          identifier: [
            {
              system: 'http://opencrvs.org/specs/id/geo-id',
              value: '4194'
            },
            {
              system: 'http://opencrvs.org/specs/id/bbs-code',
              value: '11'
            },
            {
              system: 'http://opencrvs.org/specs/id/jurisdiction-type',
              value: 'UNION'
            },
            {
              system: 'http://opencrvs.org/specs/id/a2i-internal-reference',
              value: 'division=9&district=30&upazila=233&union=4194'
            }
          ]
        }
      }
    }
  },
  {
    request: {
      query: FETCH_MONTH_WISE_EVENT_ESTIMATIONS,
      variables: {
        event: 'BIRTH',
        locationId: '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b',
        timeStart: timeStart.toISOString(),
        timeEnd: timeEnd.toISOString()
      }
    },
    result: {
      data: {
        fetchMonthWiseEventMetrics: {
          details: [
            {
              actualTotalRegistration: 20,
              actual45DayRegistration: 9,
              estimatedRegistration: 45,
              estimated45DayPercentage: 4.5,
              month: 'April',
              year: '2020',
              startOfMonth: '2020-03-30T18:00:00.000Z'
            },
            {
              actualTotalRegistration: 10,
              actual45DayRegistration: 0,
              estimatedRegistration: 45,
              estimated45DayPercentage: 0,
              month: 'March',
              year: '2020',
              startOfMonth: '2020-02-29T18:00:00.000Z'
            }
          ],
          total: {
            actualTotalRegistration: 30,
            actual45DayRegistration: 9,
            estimatedRegistration: 45,
            estimated45DayPercentage: 2.25
          }
        }
      }
    }
  }
]
describe('Registraion Rates tests', () => {
  let component: ReactWrapper<{}, {}>
  let store: AppStore
  let history: History<any>

  beforeAll(async () => {
    Date.now = jest.fn(() => 1487076708000)
    const { store: testStore, history: testHistory } = await createTestStore()
    store = testStore
    history = testHistory
  })

  beforeEach(async () => {
    component = (await createTestComponent(
      <RegistrationRates
        match={{
          params: { eventType: 'birth' },
          isExact: true,
          path: EVENT_REGISTRATION_RATES,
          url: ''
        }}
        // @ts-ignore
        location={{
          search: queryString.stringify({
            locationId: LOCATION_DHAKA_DIVISION.id,
            timeEnd: new Date(1487076708000).toISOString(),
            timeStart: new Date(1455454308000).toISOString()
          })
        }}
      />,
      store,
      graphqlMocks
    )).component

    // wait for mocked data to load mockedProvider
    await new Promise(resolve => {
      setTimeout(resolve, 100)
    })

    component.update()
  })

  it('renders the component', async () => {
    const header = await waitForElement(component, '#reg-rates-header')
  })

  it('because of more than one child locations from the query, by location option arrives in dropdown', async () => {
    const select = await waitForElement(component, '#base-select')
    select
      .find('.react-select__control')
      .simulate('keyDown', { key: 'ArrowDown', keyCode: 40 })
    component.update()
    expect(component.find('.react-select__menu-list').children().length).toBe(2)
    expect(
      component
        .find('.react-select__menu-list')
        .childAt(1)
        .text()
    ).toBe('By location')
  })

  it('clicking on back takes back to operational dashboard with selected location', async () => {
    const backAction = await waitForElement(component, '#reg-rates-action-back')
    backAction.hostNodes().simulate('click')
    await flushPromises()
    expect(history.location.pathname).toBe('/performance/operations')
    expect(queryString.parse(history.location.search)).toEqual({
      sectionId: 'OPERATIONAL',
      locationId: LOCATION_DHAKA_DIVISION.id,
      timeEnd: new Date(1487076708000).toISOString(),
      timeStart: new Date(1455454308000).toISOString()
    })
  })

  it('clicking on any other preset range changes date ranges in url', async () => {
    const dateRangePickerElement = await waitForElement(
      component,
      '#date-range-picker-action'
    )
    expect(dateRangePickerElement.hostNodes().text()).toBe('Last 12 months')
    const previousQueryParams = history.location.search
    dateRangePickerElement.hostNodes().simulate('click')
    const last30DaysPresetButtonElement = await waitForElement(
      component,
      '#last30Days'
    )
    last30DaysPresetButtonElement.hostNodes().simulate('click')
    const confirmButtonElement = await waitForElement(
      component,
      '#date-range-confirm-action'
    )
    confirmButtonElement.hostNodes().simulate('click')
    expect(history.location.search).not.toBe(previousQueryParams)
  })
})