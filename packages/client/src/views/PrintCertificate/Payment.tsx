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
import { PrimaryButton, TertiaryButton } from '@opencrvs/components/lib/buttons'
import { Print } from '@opencrvs/components/lib/icons'
import { ActionPageLight } from '@opencrvs/components/lib/interface'
import { Content } from '@opencrvs/components/lib/interface/Content'
import { FormattedNumberCurrency } from '@opencrvs/components/lib/symbol'
import { IPrintableDeclaration, modifyDeclaration } from '@client/declarations'
import { Event } from '@client/utils/gateway'
import { buttonMessages } from '@client/i18n/messages'
import { messages } from '@client/i18n/messages/views/certificate'
import {
  goBack as goBackAction,
  goToReviewCertificate as goToReviewCertificateAction
} from '@client/navigation'
import { getUserDetails } from '@client/profile/profileSelectors'
import { IStoreState } from '@client/store'
import { ITheme } from '@client/styledComponents'
import { IUserDetails } from '@client/utils/userUtils'
import { printMoneyReceipt } from '@client/views/PrintCertificate/PDFUtils'
import * as React from 'react'
import { WrappedComponentProps as IntlShapeProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import styled, { withTheme } from 'styled-components'
import {
  calculatePrice,
  getEventDate,
  getRegisteredDate,
  getServiceMessage
} from './utils'
import { IOfflineData } from '@client/offline/reducer'
import { getOfflineData } from '@client/offline/selectors'

const Action = styled.div`
  margin-top: 32px;
`

const StyledLabel = styled.label`
  ${({ theme }) => theme.fonts.bold18};
  margin-right: 2px;
`
const StyledValue = styled.span`
  ${({ theme }) => theme.fonts.reg18};
`

function LabelValue({
  id,
  label,
  value
}: {
  id: string
  label: string
  value: React.ReactNode | string
}) {
  return (
    <div id={id}>
      <StyledLabel>{label}</StyledLabel>
      <StyledValue>{value}</StyledValue>
    </div>
  )
}
interface IProps {
  event: Event
  registrationId: string
  language: string
  declaration: IPrintableDeclaration
  theme: ITheme
  modifyDeclaration: typeof modifyDeclaration
  goToReviewCertificate: typeof goToReviewCertificateAction
  goBack: typeof goBackAction
  userDetails: IUserDetails | null
  offlineCountryConfig: IOfflineData
}

type IFullProps = IProps & IntlShapeProps

class PaymentComponent extends React.Component<IFullProps> {
  continue = (paymentAmount: string) => {
    const { declaration } = this.props
    const certificates =
      declaration && declaration.data.registration.certificates

    const certificate = (certificates && certificates[0]) || {}

    this.props.modifyDeclaration({
      ...declaration,
      data: {
        ...declaration.data,
        registration: {
          ...declaration.data.registration,
          certificates: [
            {
              ...certificate,
              payments: {
                type: 'MANUAL' as const,
                total: Number(paymentAmount),
                amount: Number(paymentAmount),
                outcome: 'COMPLETED' as const,
                date: Date.now()
              }
            }
          ]
        }
      }
    })

    this.props.goToReviewCertificate(
      this.props.registrationId,
      this.props.event
    )
  }

  render = () => {
    const { intl, declaration, event, goBack, offlineCountryConfig } =
      this.props

    const registeredDate = getRegisteredDate(declaration.data)

    const eventDate = getEventDate(declaration.data, event)

    const paymentAmount = calculatePrice(
      event,
      eventDate,
      registeredDate,
      offlineCountryConfig
    )

    const serviceMessage = getServiceMessage(
      intl,
      event,
      eventDate,
      registeredDate,
      offlineCountryConfig
    )

    const RecieptPrint = (
      <TertiaryButton
        id="print-receipt"
        icon={() => <Print />}
        align={0}
        disabled={true}
        onClick={() =>
          printMoneyReceipt(
            this.props.intl,
            this.props.declaration,
            this.props.userDetails,
            this.props.offlineCountryConfig
          )
        }
      >
        {intl.formatMessage(messages.printReceipt)}
      </TertiaryButton>
    )

    return (
      <>
        <ActionPageLight
          title={'Print certificate'}
          goBack={goBack}
          hideBackground
        >
          <Content
            title={intl.formatMessage(messages.payment)}
            topActionButtons={[RecieptPrint]}
          >
            <LabelValue
              id="service"
              label={intl.formatMessage(messages.receiptService)}
              value={serviceMessage}
            />
            <LabelValue
              id="amountDue"
              label={intl.formatMessage(messages.amountDue)}
              value={
                <FormattedNumberCurrency
                  value={paymentAmount}
                  currency={offlineCountryConfig.config.CURRENCY.isoCode}
                  languagesAndCountry={
                    offlineCountryConfig.config.CURRENCY.languagesAndCountry[0]
                  }
                />
              }
            />
            <Action>
              <PrimaryButton
                id="Continue"
                onClick={() => this.continue(paymentAmount.toString())}
              >
                {intl.formatMessage(buttonMessages.continueButton)}
              </PrimaryButton>
            </Action>
          </Content>
        </ActionPageLight>
      </>
    )
  }
}

const getEvent = (eventType: string | undefined) => {
  switch (eventType && eventType.toLowerCase()) {
    case 'birth':
    default:
      return Event.Birth
    case 'death':
      return Event.Death
  }
}

function mapStatetoProps(
  state: IStoreState,
  props: RouteComponentProps<{ registrationId: string; eventType: string }>
) {
  const { registrationId, eventType } = props.match.params
  const event = getEvent(eventType)
  const declaration = state.declarationsState.declarations.find(
    (app) => app.id === registrationId && app.event === event
  ) as IPrintableDeclaration | undefined

  if (!declaration) {
    throw new Error(`Declaration "${registrationId}" missing!`)
  }

  return {
    event: declaration.event,
    registrationId,
    language: state.i18n.language,
    declaration,
    userDetails: getUserDetails(state),
    offlineCountryConfig: getOfflineData(state)
  }
}

export const Payment = connect(mapStatetoProps, {
  goBack: goBackAction,
  modifyDeclaration,
  goToReviewCertificate: goToReviewCertificateAction
})(injectIntl(withTheme(PaymentComponent)))
