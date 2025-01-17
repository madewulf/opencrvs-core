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
import { Spinner } from '@opencrvs/components/lib/interface'
import { NoWifi } from '@opencrvs/components/lib/icons'
import { injectIntl, WrappedComponentProps as IntlShapeProps } from 'react-intl'
import styled from 'styled-components'
import { errorMessages } from '@client/i18n/messages'

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.negative};
  ${({ theme }) => theme.fonts.reg16};
  text-align: center;
  margin-top: 100px;
`

const ConnectivityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const NoConnectivity = styled(NoWifi)`
  width: 24px;
  margin: auto;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoadingContainer = styled.div`
  width: 100%;
  padding-left: 8px;
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.lg}px) {
    display: flex;
    padding-left: 0px;
    margin: auto;
    align-items: center;
    justify-content: center;
  }
`
const Text = styled.div`
  ${({ theme }) => theme.fonts.reg16};
  text-align: center;
  margin: auto;
`

const MobileViewContainer = styled.div<{ noDeclaration?: boolean }>`
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.lg}px) {
    position: fixed;
    left: 0;
    right: 0;
    ${({ noDeclaration }) => (noDeclaration ? `top:55%;` : `top:50%;`)}
  }
`

type IBaseLoadingProps = {
  loading: boolean
  hasError?: boolean
  noDeclaration?: boolean
}

type IProps = IBaseLoadingProps & IntlShapeProps & IOnlineStatusProps

export class LoadingIndicatorComp extends React.Component<IProps> {
  render() {
    const { loading, noDeclaration, hasError, intl } = this.props

    return (
      <Wrapper>
        {this.props.isOnline && loading && (
          <LoadingContainer>
            <Spinner id="Spinner" size={24} baseColor="#4C68C1" />
          </LoadingContainer>
        )}
        <MobileViewContainer noDeclaration={noDeclaration}>
          {this.props.isOnline && hasError && (
            <ErrorText id="search-result-error-text-count">
              {intl.formatMessage(errorMessages.queryError)}
            </ErrorText>
          )}
          {!this.props.isOnline && (
            <ConnectivityContainer>
              <NoConnectivity />
              <Text id="wait-connection-text">
                {intl.formatMessage(errorMessages.waitingForConnection)}
              </Text>
            </ConnectivityContainer>
          )}
        </MobileViewContainer>
      </Wrapper>
    )
  }
}

export function withOnlineStatus<T>(
  WrappedComponent: React.ComponentType<T & IOnlineStatusProps>
) {
  const ONLINE_CHECK_INTERVAL = 500

  return function WithOnlineStatus(props: T) {
    const [isOnline, setOnline] = React.useState(navigator.onLine)

    React.useEffect(() => {
      const intervalID = setInterval(
        () => setOnline(navigator.onLine),
        ONLINE_CHECK_INTERVAL
      )

      return () => clearInterval(intervalID)
    }, [])

    return <WrappedComponent isOnline={isOnline} {...props} />
  }
}

export type IOnlineStatusProps = {
  isOnline: boolean
}

export const LoadingIndicator = injectIntl(
  withOnlineStatus(LoadingIndicatorComp)
)
