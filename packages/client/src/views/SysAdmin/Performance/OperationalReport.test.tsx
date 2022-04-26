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
import { AppStore } from '@client/store'
import {
  createRouterProps,
  createTestComponent,
  createTestStore,
  loginAsFieldAgent
} from '@client/tests/util'
import { waitForElement } from '@client/tests/wait-for-element'
import { ReactWrapper } from 'enzyme'
import { History } from 'history'
import * as React from 'react'
import {
  OperationalReport,
  OPERATIONAL_REPORT_SECTION
} from './OperationalReport'

import { parse } from 'query-string'
import { PERFORMANCE_METRICS } from './metricsQuery'
import { GraphQLError } from 'graphql'
import { SEARCH_EVENTS } from '@client/views/OfficeHome/queries'
import { COUNT_USER_WISE_DECLARATIONS } from '@client/search/queries'

describe('OperationalReport tests', () => {
  let component: ReactWrapper<{}, {}>
  let store: AppStore
  let history: History<any>

  const LOCATION_DHAKA_DIVISION = {
    displayLabel: 'Dhaka Division',
    id: '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b',
    searchableText: 'Dhaka'
  }

  beforeEach(async () => {
    Date.now = jest.fn(() => 1487076708000)
    ;({ store, history } = await createTestStore())

    loginAsFieldAgent(store)
    const graphqlMock = [
      {
        request: {
          query: COUNT_USER_WISE_DECLARATIONS,
          variables: {
            userId: '778464c0-08f8-4fb7-8a37-b86d1efc462a',
            status: ['REJECTED'],
            locationIds: ['0d8474da-0361-4d32-979e-af91f012340a']
          }
        },
        result: {
          data: {
            searchEvents: {
              totalItems: 1
            }
          }
        }
      },
      {
        request: {
          query: PERFORMANCE_METRICS,
          variables: {
            locationId: LOCATION_DHAKA_DIVISION.id,
            timeEnd: new Date(1487076708000).toISOString(),
            timeStart: new Date(1455454308000).toISOString()
          }
        },
        result: {
          data: {
            getEventEstimationMetrics: {
              birthTargetDayMetrics: {
                actualRegistration: 4,
                estimatedRegistration: 0,
                estimatedPercentage: 0,
                malePercentage: 0,
                femalePercentage: 0,
                __typename: 'EstimationMetrics'
              },
              deathTargetDayMetrics: {
                actualRegistration: 0,
                estimatedRegistration: 0,
                estimatedPercentage: 0,
                malePercentage: 0,
                femalePercentage: 0,
                __typename: 'EstimationMetrics'
              },
              __typename: 'EventEstimationMetrics'
            },
            getDeclarationsStartedMetrics: {
              fieldAgentDeclarations: 0,
              hospitalDeclarations: 0,
              officeDeclarations: 6,
              __typename: 'DeclarationsStartedMetrics'
            }
          }
        }
      }
    ]
    const testComponent = await createTestComponent(
      <OperationalReport
        {...createRouterProps('/', undefined, {
          search: {
            locationId: LOCATION_DHAKA_DIVISION.id,
            sectionId: OPERATIONAL_REPORT_SECTION.OPERATIONAL,
            timeEnd: new Date(1487076708000).toISOString(),
            timeStart: new Date(1455454308000).toISOString()
          }
        })}
      />,
      { store, history, graphqlMocks: graphqlMock }
    )
    component = testComponent
  })

  it('renders without crashing', async () => {
    await waitForElement(component, '#header-location-name')
  })

  it('header shows location display label', async () => {
    const header = await waitForElement(component, '#header-location-name')
    expect(header.hostNodes().text()).toBe(LOCATION_DHAKA_DIVISION.displayLabel)
  })

  it('clicking on change button redirects to performance home keeping location in history state', async () => {
    const changeLink = await waitForElement(component, '#change-location-link')
    changeLink.hostNodes().simulate('click')
    expect(history.location.pathname).toBe('/performance')
    expect(history.location.state).toStrictEqual({
      selectedLocation: LOCATION_DHAKA_DIVISION
    })
  })

  it('performance select default value is Operational', async () => {
    const performanceSelect = await waitForElement(
      component,
      '#operational-select'
    )
    expect(
      performanceSelect.find('.react-select__single-value').hostNodes().text()
    ).toBe('Operational')
    expect(
      component.find('#registration-rates-reports-loader').hostNodes()
    ).toHaveLength(0)
  })

  it('performance select updates history when changed', async () => {
    const performanceSelect = await waitForElement(
      component,
      '#operational-select'
    )
    performanceSelect.at(0).prop('onChange')({
      label: 'Reports',
      value: 'REPORTS'
    })
    component.update()
    expect(parse(history.location.search)).toEqual({
      locationId: LOCATION_DHAKA_DIVISION.id,
      sectionId: OPERATIONAL_REPORT_SECTION.REPORTS,
      timeEnd: new Date(1487076708000).toISOString(),
      timeStart: new Date(1455454308000).toISOString()
    })
  })

  describe('status window test', () => {
    beforeEach(() => {
      component.find('#btn-status').hostNodes().simulate('click')
      component.update()
    })

    it('expands status window and hide status button', () => {
      expect(component.find('#status-window').hostNodes()).toHaveLength(1)
      expect(component.find('#btn-status').hostNodes()).toHaveLength(0)
    })

    it('closes status window and show status button', () => {
      component.find('#btn-sts-wnd-cross').hostNodes().simulate('click')
      component.update()

      expect(component.find('#status-window').hostNodes()).toHaveLength(0)
      expect(component.find('#btn-status').hostNodes()).toHaveLength(1)
    })
  })

  describe('date range picker tests', () => {
    beforeEach(async () => {
      const dateRangePickerElement = await waitForElement(
        component,
        '#date-range-picker-action'
      )
      dateRangePickerElement.hostNodes().simulate('click')
    })

    it('modal shows up', async () => {
      await waitForElement(component, '#picker-modal')
    })

    it('clicking on close button dismisses the modal', async () => {
      const cancelButtonElement = await waitForElement(component, '#close-btn')
      cancelButtonElement.hostNodes().simulate('click')

      expect(component.find('#picker-modal').hostNodes()).toHaveLength(0)
    })

    it('clicking on outside dismisses the modal', async () => {
      const cancelButtonElement = await waitForElement(
        component,
        '#cancelable-area'
      )
      cancelButtonElement.hostNodes().simulate('click')

      expect(component.find('#picker-modal').hostNodes()).toHaveLength(0)
    })

    it('clicking on any other preset range changes date ranges in url', async () => {
      const dateRangePickerElement = await waitForElement(
        component,
        '#date-range-picker-action'
      )
      expect(dateRangePickerElement.hostNodes().text()).toBe('Last 12 months')
      const previousQueryParams = history.location.search
      const last30DaysPresetButtonElement = await waitForElement(
        component,
        '#last30Days'
      )
      last30DaysPresetButtonElement.hostNodes().at(0).simulate('click')
      const confirmButtonElement = await waitForElement(
        component,
        '#date-range-confirm-action'
      )
      confirmButtonElement.hostNodes().simulate('click')
      expect(history.location.search).not.toBe(previousQueryParams)
    })
  })
})
describe('OperationalReport reports tests', () => {
  let component: ReactWrapper<{}, {}>
  let store: AppStore
  let history: History
  const LOCATION_DHAKA_DIVISION = {
    displayLabel: 'Dhaka Division',
    id: '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b',
    searchableText: 'Dhaka'
  }

  beforeAll(async () => {
    Date.now = jest.fn(() => 1487076708000)
    ;({ store, history } = await createTestStore())
  })

  beforeEach(async () => {
    const testComponent = await createTestComponent(
      <OperationalReport
        {...createRouterProps('/', undefined, {
          search: {
            locationId: LOCATION_DHAKA_DIVISION.id,
            sectionId: OPERATIONAL_REPORT_SECTION.REPORTS,
            timeEnd: new Date(1487076708000).toISOString(),
            timeStart: new Date(1455454308000).toISOString()
          }
        })}
      />,
      { store, history }
    )
    component = testComponent
  })

  it('renders report lists', async () => {
    expect(component.find('#report-lists').hostNodes()).toHaveLength(1)
  })
})

describe('Test error toast notification', () => {
  let component: ReactWrapper<{}, {}>
  let store: AppStore
  let history: History

  const LOCATION_DHAKA_DIVISION = {
    displayLabel: 'Dhaka Division',
    id: '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b',
    searchableText: 'Dhaka'
  }

  beforeAll(async () => {
    Date.now = jest.fn(() => 1487076708000)
    ;({ store, history } = await createTestStore())
  })

  beforeEach(async () => {
    const graphqlMock = [
      {
        request: {
          query: PERFORMANCE_METRICS,
          variables: {
            locationId: LOCATION_DHAKA_DIVISION.id,
            timeEnd: new Date(1487076708000).toISOString(),
            timeStart: new Date(1455454308000).toISOString()
          }
        },
        result: {
          errors: [new GraphQLError('ERROR!')]
        }
      }
    ]
    const testComponent = await createTestComponent(
      <OperationalReport
        {...createRouterProps('/', undefined, {
          search: {
            locationId: LOCATION_DHAKA_DIVISION.id,
            sectionId: OPERATIONAL_REPORT_SECTION.OPERATIONAL,
            timeEnd: new Date(1487076708000).toISOString(),
            timeStart: new Date(1455454308000).toISOString()
          }
        })}
      />,
      { store, history, graphqlMocks: graphqlMock }
    )
    component = testComponent
  })

  it('renders the error toast notification and component loader', async () => {
    await waitForElement(component, '#error-toast')
    expect(component.find('#error-toast').hostNodes()).toHaveLength(1)
    expect(
      component.find('#registration-rates-reports-loader').hostNodes()
    ).toHaveLength(1)
    expect(
      component.find('#declarations-started-reports-loader').hostNodes()
    ).toHaveLength(1)
  })
})
