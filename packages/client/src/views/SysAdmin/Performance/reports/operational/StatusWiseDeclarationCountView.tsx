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
import { constantsMessages } from '@client/i18n/messages'
import { messages as performanceMessages } from '@client/i18n/messages/views/performance'

import {
  Description,
  SubHeader,
  getJurisdictionLocationIdFromUserDetails,
  getPrimaryLocationIdOfOffice,
  isUnderJurisdictionOfUser
} from '@opencrvs/client/src/views/SysAdmin/Performance/utils'
import { LinkButton } from '@opencrvs/components/lib/buttons'
import { ProgressBar } from '@opencrvs/components/lib/forms'
import { GQLRegistrationCountResult } from '@opencrvs/gateway/src/graphql/schema'
import * as React from 'react'
import {
  injectIntl,
  MessageDescriptor,
  WrappedComponentProps
} from 'react-intl'
import styled from 'styled-components'
import { getOfflineData } from '@client/offline/selectors'
import { connect } from 'react-redux'
import { IStoreState } from '@client/store'
import { getJurisidictionType } from '@client/utils/locationUtils'
import { getUserDetails } from '@client/profile/profileSelectors'
import { SYS_ADMIN_ROLES } from '@client/utils/constants'
import { checkExternalValidationStatus } from '@client/views/SysAdmin/Team/utils'

type Props = WrappedComponentProps & IStateProps & BaseProps

export interface IStatusMapping {
  [status: string]: { labelDescriptor: MessageDescriptor; color: string }
}

interface BaseProps {
  data?: GQLRegistrationCountResult
  loading?: boolean
  statusMapping?: IStatusMapping
  onClickStatusDetails: (status?: keyof IStatusMapping) => void
  locationId: string
}

interface IStateProps {
  disableDeclarationLink: boolean
}

const ContentHolder = styled.div`
  padding: 0px 25px;
`

const StatusHeader = styled.div`
  margin: 30px 0px;
`

const StatusProgressBarWrapper = styled.div`
  margin-top: 20px;
`
const StatusListFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0px 10px;
  ${({ theme }) => theme.fonts.bold16};
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.disabled};
  border-bottom: none;
`

const LoaderBox = styled.span<{
  width?: number
}>`
  background: ${({ theme }) => theme.colors.background};
  display: inline-block;
  height: 24px;
  width: ${({ width }) => (width ? `${width}%` : '100%')};
`

class StatusWiseDeclarationCountViewComponent extends React.Component<
  Props,
  {}
> {
  getLoader() {
    return (
      <ContentHolder>
        <StatusHeader id="status-header-loader">
          <LoaderBox width={20} />
          <br />
          <br />
          <LoaderBox width={100} />
        </StatusHeader>
        <StatusProgressBarWrapper>
          <ProgressBar loading={true} />
        </StatusProgressBarWrapper>
        <StatusProgressBarWrapper>
          <ProgressBar loading={true} />
        </StatusProgressBarWrapper>
        <StatusProgressBarWrapper>
          <ProgressBar loading={true} />
        </StatusProgressBarWrapper>
        <StatusProgressBarWrapper>
          <ProgressBar loading={true} />
        </StatusProgressBarWrapper>
        <StatusProgressBarWrapper>
          <ProgressBar loading={true} />
        </StatusProgressBarWrapper>
        <StatusProgressBarWrapper>
          <ProgressBar loading={true} />
        </StatusProgressBarWrapper>
        <StatusListFooter>
          <p>&nbsp;</p>
        </StatusListFooter>
      </ContentHolder>
    )
  }

  getStatusCountView(data: GQLRegistrationCountResult) {
    const { intl, statusMapping, disableDeclarationLink } = this.props
    const { results, total } = data
    return (
      <ContentHolder>
        <StatusHeader id="status-header">
          <SubHeader>
            {intl.formatMessage(constantsMessages.declarationTitle)}
          </SubHeader>
          <Description>
            {intl.formatMessage(
              performanceMessages.declarationCountByStatusDescription
            )}{' '}
            {!disableDeclarationLink && (
              <LinkButton
                id="view-all-link"
                onClick={() => this.props.onClickStatusDetails()}
              >
                {intl.formatMessage(constantsMessages.viewAll)}
              </LinkButton>
            )}
          </Description>
        </StatusHeader>
        {results
          .filter((item) => item && checkExternalValidationStatus(item.status))
          .map((statusCount, index) => {
            return (
              statusCount && (
                <StatusProgressBarWrapper key={index}>
                  <ProgressBar
                    id={`${statusCount.status.toLowerCase()}-${index}`}
                    title={intl.formatMessage(
                      statusMapping![statusCount.status].labelDescriptor
                    )}
                    color={statusMapping![statusCount.status].color}
                    totalPoints={total}
                    disabled={disableDeclarationLink || false}
                    onClick={() =>
                      this.props.onClickStatusDetails(statusCount.status)
                    }
                    currentPoints={statusCount.count}
                  />
                </StatusProgressBarWrapper>
              )
            )
          })}
        <StatusListFooter>
          <p>{intl.formatMessage(constantsMessages.total)}</p>
          <p>{total}</p>
        </StatusListFooter>
      </ContentHolder>
    )
  }

  render() {
    const { data, loading } = this.props
    return (
      <>
        {loading && this.getLoader()}
        {data && this.getStatusCountView(data)}
      </>
    )
  }
}

export const StatusWiseDeclarationCountView = connect<
  IStateProps,
  {},
  BaseProps,
  IStoreState
>((state: IStoreState, ownProps: BaseProps) => {
  const offlineLocations = getOfflineData(state).locations
  const offlineOffices = getOfflineData(state).offices

  const isOfficeSelected = !!offlineOffices[ownProps.locationId]

  let disableDeclarationLink = !(
    isOfficeSelected ||
    window.config.DECLARATION_AUDIT_LOCATIONS.includes(
      getJurisidictionType(offlineLocations, ownProps.locationId) as string
    )
  )
  const userDetails = getUserDetails(state)
  if (
    userDetails &&
    userDetails.role &&
    !SYS_ADMIN_ROLES.includes(userDetails.role)
  ) {
    const jurisdictionLocation =
      getJurisdictionLocationIdFromUserDetails(userDetails)
    disableDeclarationLink = !isUnderJurisdictionOfUser(
      offlineLocations,
      isOfficeSelected
        ? getPrimaryLocationIdOfOffice(
            offlineLocations,
            offlineOffices[ownProps.locationId]
          )
        : ownProps.locationId,
      jurisdictionLocation
    )
  }
  return {
    disableDeclarationLink
  }
})(injectIntl(StatusWiseDeclarationCountViewComponent))
