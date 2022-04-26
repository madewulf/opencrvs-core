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
import styled from '@client/styledComponents'
import {
  GQLLocation,
  GQLIdentifier,
  GQLEventMetrics
} from '@opencrvs/gateway/src/graphql/schema'
import { IUserDetails } from '@client/utils/userUtils'
import { ILocation } from '@client/offline/reducer'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import React from 'react'
import { getPercentage } from '@client/utils/data-formatting'
import { FormattedNumber } from 'react-intl'

export const Header = styled.h1`
  color: ${({ theme }) => theme.colors.copy};
  ${({ theme }) => theme.fonts.h2};
`

export function getMonthDateRange(year: number, month: number) {
  return {
    start: startOfMonth(new Date(year, month - 1)),
    end: endOfMonth(new Date(year, month - 1))
  }
}
export const ReportHeader = styled.div`
  margin: 32px 0 24px 0;
`

export const SubHeader = styled.div`
  color: ${({ theme }) => theme.colors.copy};
  ${({ theme }) => theme.fonts.h4};
`

export const Description = styled.div`
  margin: 8px 0px;
  color: ${({ theme }) => theme.colors.supportingCopy};
  ${({ theme }) => theme.fonts.reg16};
`

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  margin: 0 -24px 0 -24px;
  padding: 12px 24px 11px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey300};
`

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > :first-child {
    margin: 0 8px 8px 0;
  }

  & > :nth-child(2) {
    margin: 0 8px 8px 0;
  }

  & > :nth-child(3) {
    margin: 0 8px 8px 0;
  }

  & > :last-child {
    margin: 0;
  }
`
export const PerformanceTitle = styled.div`
  ${({ theme }) => theme.fonts.bold16}
`

export const PerformanceValue = styled.div`
  color: ${({ theme }) => theme.colors.copy};
  ${({ theme }) => theme.fonts.reg16};
`

export const Breakdown = styled.div`
  margin-top: 0.5rem;
`
export const BreakdownRow = styled.div``
export const BreakdownLabel = styled.span`
  color: ${({ theme }) => theme.colors.copy};
  ${({ theme }) => theme.fonts.bold12};
`
export const BreakdownValue = styled.span`
  color: ${({ theme }) => theme.colors.copy};
  ${({ theme }) => theme.fonts.reg12};
`
export function PercentageDisplay(props: { total: number; ofNumber: number }) {
  return <span>{getPercentage(props.ofNumber, props.total)}%</span>
}

export function TotalDisplayWithPercentage(props: {
  total: number
  ofNumber: number
}) {
  return (
    <span>
      <FormattedNumber value={props.total}></FormattedNumber>
      &nbsp;(
      <PercentageDisplay {...props} />)
    </span>
  )
}

export function calculateTotal(metrics: GQLEventMetrics[]) {
  return metrics
    .map((metric) => metric.total)
    .reduce((m, metric) => m + metric, 0)
}

export function getJurisidictionType(location: GQLLocation): string | null {
  let jurisdictionType = null

  const jurisdictionTypeIdentifier =
    location.identifier &&
    (location.identifier as GQLIdentifier[]).find(
      ({ system }: GQLIdentifier) =>
        system && system === 'http://opencrvs.org/specs/id/jurisdiction-type'
    )

  if (jurisdictionTypeIdentifier) {
    jurisdictionType = jurisdictionTypeIdentifier.value as string
  }

  return jurisdictionType
}

export function isUnderJurisdictionOfUser(
  locations: { [key: string]: ILocation },
  locationId: string,
  jurisdictionLocation: string | undefined
) {
  if (!jurisdictionLocation) return false

  while (locationId !== jurisdictionLocation && locationId !== '0') {
    locationId = locations[locationId].partOf.split('/')[1]
  }

  return locationId !== '0'
}

export function getPrimaryLocationIdOfOffice(
  locations: { [key: string]: ILocation },
  office: ILocation
) {
  const location = locations[office.partOf.split('/')[1]]

  if (!location) {
    throw new Error(`Office location of ${office.id} not found`)
  }

  return location.id
}

export function getJurisdictionLocationIdFromUserDetails(
  userDetails: IUserDetails
) {
  const location =
    userDetails.catchmentArea &&
    userDetails.catchmentArea.find((location) => {
      const jurisdictionTypeIdentifier =
        location.identifier &&
        location.identifier.find(
          (identifier) =>
            identifier.system ===
            'http://opencrvs.org/specs/id/jurisdiction-type'
        )
      return (
        // Needs to be an administrative location with jurisdiction
        jurisdictionTypeIdentifier && jurisdictionTypeIdentifier.value
      )
    })

  return location && location.id
}
