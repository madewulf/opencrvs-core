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
import * as Hapi from '@hapi/hapi'
import { fetchEventsGroupByMonthDates } from '@metrics/features/metrics/metricsGenerator'
import {
  getMonthRangeFilterListFromTimeRage,
  IMonthRangeFilter,
  fetchEstimateForTargetDaysByLocationId,
  getPercentage
} from '@metrics/features/metrics/utils'
import {
  TIME_FROM,
  TIME_TO,
  LOCATION_ID,
  EVENT
} from '@metrics/features/metrics/constants'
import { IAuthHeader } from '@metrics/features/registration/'

interface IMonthWiseEstimation {
  actualTotalRegistration: number
  actualTargetDayRegistration: number
  actualWithin1YearRegistration: number
  actualWithin5YearsRegistration: number
  estimatedRegistration: number
  estimatedTargetDayPercentage: number
  month: string
  year: string
  startOfMonth: string
  endOfMonth: string
}

export async function monthWiseEventEstimationsHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) {
  const timeStart = request.query[TIME_FROM]
  const timeEnd = request.query[TIME_TO]
  const locationId = 'Location/' + request.query[LOCATION_ID]
  const event = request.query[EVENT]
  const authHeader: IAuthHeader = {
    Authorization: request.headers.authorization,
    'x-correlation-id': request.headers['x-correlation-id']
  }
  const monthFilters: IMonthRangeFilter[] = getMonthRangeFilterListFromTimeRage(
    timeStart,
    timeEnd
  )
  const registrationsGroupByMonthDates = await fetchEventsGroupByMonthDates(
    timeStart,
    timeEnd,
    locationId,
    event
  )
  const estimations: IMonthWiseEstimation[] = []
  for (const monthFilter of monthFilters) {
    const estimatedTargetDayMetrics =
      await fetchEstimateForTargetDaysByLocationId(
        locationId,
        event,
        authHeader,
        monthFilter.startOfMonthTime,
        monthFilter.endOfMonthTime
      )

    const totalRegistrationWithinMonth = registrationsGroupByMonthDates
      .filter(
        (p) => p.dateLabel === `${monthFilter.year}-${monthFilter.monthIndex}`
      )
      .reduce((t, p) => t + p.total, 0)

    const totalWithinTargetInMonth = registrationsGroupByMonthDates
      .filter(
        (p) =>
          p.dateLabel === `${monthFilter.year}-${monthFilter.monthIndex}` &&
          p.timeLabel === 'withinTarget'
      )
      .reduce((t, p) => t + p.total, 0)

    const totalWithin1YearInMonth = registrationsGroupByMonthDates
      .filter(
        (p) =>
          (p.dateLabel === `${monthFilter.year}-${monthFilter.monthIndex}` &&
            p.timeLabel === 'withinTarget') ||
          p.timeLabel === 'withinLate' ||
          p.timeLabel === 'within1Year'
      )
      .reduce((t, p) => t + p.total, 0)
    const totalWithin5YearsInMonth = registrationsGroupByMonthDates
      .filter(
        (p) =>
          p.dateLabel === `${monthFilter.year}-${monthFilter.monthIndex}` &&
          p.timeLabel !== 'after5Years'
      )
      .reduce((t, p) => t + p.total, 0)

    estimations.push({
      startOfMonth: monthFilter.startOfMonthTime,
      endOfMonth: monthFilter.endOfMonthTime,
      actualTotalRegistration: totalRegistrationWithinMonth,
      actualTargetDayRegistration: totalWithinTargetInMonth,
      actualWithin1YearRegistration: totalWithin1YearInMonth,
      actualWithin5YearsRegistration: totalWithin5YearsInMonth,
      estimatedRegistration: estimatedTargetDayMetrics.totalEstimation,
      estimatedTargetDayPercentage: getPercentage(
        totalWithinTargetInMonth,
        estimatedTargetDayMetrics.totalEstimation
      ),
      month: monthFilter.month,
      year: monthFilter.year
    })
  }
  return estimations
}
