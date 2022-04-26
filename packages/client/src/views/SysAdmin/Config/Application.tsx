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
import { IOfflineData } from '@client/offline/reducer'
import { getOfflineData } from '@client/offline/selectors'
import { IStoreState } from '@client/store'
import * as React from 'react'
import {
  injectIntl,
  IntlShape,
  WrappedComponentProps as IntlShapeProps
} from 'react-intl'
import { connect } from 'react-redux'
import { getUserDetails } from '@client/profile/profileSelectors'
import { IUserDetails } from '@client/utils/userUtils'
import { SysAdminContentWrapper } from '@client/views/SysAdmin/SysAdminContentWrapper'
import {
  ListView,
  FloatingNotification,
  NOTIFICATION_TYPE
} from '@opencrvs/components/lib/interface'
import { Content } from '@opencrvs/components/lib/interface/Content'
import { messages } from '@client/i18n/messages/views/config'
import { buttonMessages } from '@client/i18n/messages'
import { DynamicModal } from '@client/views/SysAdmin/Config/DynamicModal'
import { EMPTY_STRING } from '@client/utils/constants'
import styled from 'styled-components'
import { lookup } from 'country-data'
import { FormattedNumberCurrency } from '@opencrvs/components/lib/symbol'
import { FormTabs } from '@opencrvs/components/lib/forms'

const ListGroupTitle = styled.div`
  color: ${({ theme }) => theme.colors.grey400};
  width: 240px;
  height: 22px;
  ${({ theme }) => theme.fonts.bold14};
`

type Props = IntlShapeProps & {
  userDetails: IUserDetails | null
  offlineCountryConfiguration: IOfflineData
}
interface State {
  activeTabId: string
  changeModalName: string
  showNotification: boolean
  notificationStatus: NOTIFICATION_TYPE
  notificationMessages: string
}

export enum TabId {
  GENERAL = 'general',
  BIRTH = 'birth',
  DEATH = 'death'
}

export enum GeneralActionId {
  APPLICATION_NAME = 'changeAppName',
  GOVT_LOGO = 'changeGovtLogo',
  NID_PATTERN = 'changeNidPattern',
  CURRENCY = 'changeCurrency',
  PHONE_NUMBER = 'changePhnNum'
}

export enum BirthActionId {
  BIRTH_REGISTRATION_TARGET = 'changeBirthRegTarget',
  BIRTH_LATE_REGISTRATION_TARGET = 'changeBirthLateRegTarget',
  BIRTH_ON_TIME_FEE = 'changeBirthOnTimeFee',
  BIRTH_LATE_FEE = 'changeBirthLateFee',
  BIRTH_DELAYED_FEE = 'changeBirthDelayedFee'
}

export enum DeathActionId {
  DEATH_REGISTRATION_TARGET = 'changeDeathRegTarget',
  DEATH_ON_TIME_FEE = 'changeDeathOnTimeFee',
  DEATH_DELAYED_FEE = 'changeDeathDelayedFee'
}

function GeneralTabContent({
  offlineCountryConfiguration,
  intl,
  callBack
}: {
  offlineCountryConfiguration: IOfflineData
  intl: IntlShape
  callBack: (modalName: string) => void
}) {
  const countryCurrencyName = lookup.currencies({
    code: offlineCountryConfiguration.config.CURRENCY.isoCode
  })
  return (
    <ListView
      items={[
        {
          label: intl.formatMessage(messages.applicationNameLabel),
          value: offlineCountryConfiguration.config.APPLICATION_NAME,
          action: {
            id: GeneralActionId.APPLICATION_NAME,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(GeneralActionId.APPLICATION_NAME)
            }
          }
        },
        {
          label: intl.formatMessage(messages.govermentLogoLabel),
          value: (
            <img
              src={offlineCountryConfiguration.config.COUNTRY_LOGO.file}
              width={
                offlineCountryConfiguration.config.COUNTRY_LOGO_RENDER_HEIGHT
              }
              height={
                offlineCountryConfiguration.config.COUNTRY_LOGO_RENDER_WIDTH
              }
            />
          ),
          action: {
            id: GeneralActionId.GOVT_LOGO,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(GeneralActionId.GOVT_LOGO)
            }
          }
        },
        {
          label: intl.formatMessage(messages.currencyLabel),
          value: countryCurrencyName[0].name,
          action: {
            id: GeneralActionId.CURRENCY,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(GeneralActionId.CURRENCY)
            }
          }
        },
        {
          id: 'phoneNumberPattern_value_container',
          label: intl.formatMessage(messages.phoneNumberLabel),
          value:
            offlineCountryConfiguration.config.PHONE_NUMBER_PATTERN.toString(),
          action: {
            id: GeneralActionId.PHONE_NUMBER,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(GeneralActionId.PHONE_NUMBER)
            }
          }
        },
        {
          id: 'nidPattern_value_container',
          label: intl.formatMessage(messages.nidPatternTitle),
          value:
            offlineCountryConfiguration.config.NID_NUMBER_PATTERN.toString(),
          action: {
            id: GeneralActionId.NID_PATTERN,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(GeneralActionId.NID_PATTERN)
            }
          }
        }
      ]}
    />
  )
}

function BirthTabContent({
  offlineCountryConfiguration,
  intl,
  callBack
}: {
  offlineCountryConfiguration: IOfflineData
  intl: IntlShape
  callBack: (modalName: string) => void
}) {
  return (
    <ListView
      items={[
        {
          label: EMPTY_STRING,
          value: (
            <ListGroupTitle>
              {intl.formatMessage(messages.registrationTimePeriodsGroupTitle)}
            </ListGroupTitle>
          )
        },
        {
          label: intl.formatMessage(messages.legallySpecifiedLabel),
          value: intl.formatMessage(messages.legallySpecifiedValue, {
            onTime: offlineCountryConfiguration.config.BIRTH.REGISTRATION_TARGET
          }),
          action: {
            id: BirthActionId.BIRTH_REGISTRATION_TARGET,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(BirthActionId.BIRTH_REGISTRATION_TARGET)
            }
          }
        },
        {
          label: intl.formatMessage(messages.lateRegistrationLabel),
          value: intl.formatMessage(messages.lateRegistrationValue, {
            onTime:
              offlineCountryConfiguration.config.BIRTH.REGISTRATION_TARGET,
            lateTime:
              offlineCountryConfiguration.config.BIRTH.LATE_REGISTRATION_TARGET
          }),
          action: {
            label: intl.formatMessage(buttonMessages.change),
            disabled: true
          }
        },
        {
          label: intl.formatMessage(messages.delayedRegistrationLabel),
          value: intl.formatMessage(messages.delayedRegistrationValue, {
            lateTime:
              offlineCountryConfiguration.config.BIRTH.LATE_REGISTRATION_TARGET
          }),
          action: {
            id: BirthActionId.BIRTH_LATE_REGISTRATION_TARGET,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(BirthActionId.BIRTH_LATE_REGISTRATION_TARGET)
            }
          }
        },
        {
          label: EMPTY_STRING,
          value: (
            <ListGroupTitle>
              {intl.formatMessage(messages.registrationFeesGroupTitle)}
            </ListGroupTitle>
          )
        },
        {
          label: intl.formatMessage(messages.withinLegallySpecifiedTimeLabel),
          value: (
            <FormattedNumberCurrency
              value={offlineCountryConfiguration.config.BIRTH.FEE.ON_TIME}
              currency={offlineCountryConfiguration.config.CURRENCY.isoCode}
              languagesAndCountry={
                offlineCountryConfiguration.config.CURRENCY
                  .languagesAndCountry[0]
              }
            />
          ),
          action: {
            id: BirthActionId.BIRTH_ON_TIME_FEE,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(BirthActionId.BIRTH_ON_TIME_FEE)
            }
          }
        },
        {
          label: intl.formatMessage(messages.lateRegistrationLabel),
          value: (
            <FormattedNumberCurrency
              value={offlineCountryConfiguration.config.BIRTH.FEE.LATE}
              currency={offlineCountryConfiguration.config.CURRENCY.isoCode}
              languagesAndCountry={
                offlineCountryConfiguration.config.CURRENCY
                  .languagesAndCountry[0]
              }
            />
          ),
          action: {
            id: BirthActionId.BIRTH_LATE_FEE,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(BirthActionId.BIRTH_LATE_FEE)
            }
          }
        },
        {
          label: intl.formatMessage(messages.delayedRegistrationLabel),
          value: (
            <FormattedNumberCurrency
              value={offlineCountryConfiguration.config.BIRTH.FEE.DELAYED}
              currency={offlineCountryConfiguration.config.CURRENCY.isoCode}
              languagesAndCountry={
                offlineCountryConfiguration.config.CURRENCY
                  .languagesAndCountry[0]
              }
            />
          ),
          action: {
            id: BirthActionId.BIRTH_DELAYED_FEE,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(BirthActionId.BIRTH_DELAYED_FEE)
            }
          }
        }
      ]}
    />
  )
}

function DeathTabContent({
  offlineCountryConfiguration,
  intl,
  callBack
}: {
  offlineCountryConfiguration: IOfflineData
  intl: IntlShape
  callBack: (modalName: string) => void
}) {
  return (
    <ListView
      items={[
        {
          label: EMPTY_STRING,
          value: (
            <ListGroupTitle>
              {intl.formatMessage(messages.registrationTimePeriodsGroupTitle)}
            </ListGroupTitle>
          )
        },
        {
          label: intl.formatMessage(messages.legallySpecifiedLabel),
          value: intl.formatMessage(messages.legallySpecifiedValue, {
            onTime: offlineCountryConfiguration.config.DEATH.REGISTRATION_TARGET
          }),
          action: {
            id: DeathActionId.DEATH_REGISTRATION_TARGET,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(DeathActionId.DEATH_REGISTRATION_TARGET)
            }
          }
        },
        {
          label: intl.formatMessage(messages.delayedRegistrationLabel),
          value: intl.formatMessage(messages.delayedRegistrationValue, {
            lateTime:
              offlineCountryConfiguration.config.DEATH.REGISTRATION_TARGET
          }),
          action: {
            label: intl.formatMessage(buttonMessages.change),
            disabled: true
          }
        },
        {
          label: EMPTY_STRING,
          value: (
            <ListGroupTitle>
              {intl.formatMessage(messages.registrationFeesGroupTitle)}
            </ListGroupTitle>
          )
        },
        {
          label: intl.formatMessage(messages.lateRegistrationLabel),
          value: (
            <FormattedNumberCurrency
              value={offlineCountryConfiguration.config.DEATH.FEE.ON_TIME}
              currency={offlineCountryConfiguration.config.CURRENCY.isoCode}
              languagesAndCountry={
                offlineCountryConfiguration.config.CURRENCY
                  .languagesAndCountry[0]
              }
            />
          ),
          action: {
            id: DeathActionId.DEATH_ON_TIME_FEE,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(DeathActionId.DEATH_ON_TIME_FEE)
            }
          }
        },
        {
          label: intl.formatMessage(messages.delayedRegistrationLabel),
          value: (
            <FormattedNumberCurrency
              value={offlineCountryConfiguration.config.DEATH.FEE.DELAYED}
              currency={offlineCountryConfiguration.config.CURRENCY.isoCode}
              languagesAndCountry={
                offlineCountryConfiguration.config.CURRENCY
                  .languagesAndCountry[0]
              }
            />
          ),
          action: {
            id: DeathActionId.DEATH_DELAYED_FEE,
            label: intl.formatMessage(buttonMessages.change),
            handler: () => {
              callBack(DeathActionId.DEATH_DELAYED_FEE)
            }
          }
        }
      ]}
    />
  )
}

class ApplicationConfigComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      activeTabId: TabId.GENERAL,
      changeModalName: EMPTY_STRING,
      showNotification: false,
      notificationStatus: NOTIFICATION_TYPE.IN_PROGRESS,
      notificationMessages: EMPTY_STRING
    }
  }

  changeValue = (notificationStatus: NOTIFICATION_TYPE, messages: string) => {
    if (notificationStatus !== NOTIFICATION_TYPE.ERROR) {
      this.toggleConfigModal()
      this.setState({
        showNotification: true,
        notificationStatus: notificationStatus,
        notificationMessages: messages
      })
    }
  }

  changeTab(id: string) {
    this.setState({ activeTabId: id })
  }

  toggleConfigModal = () => {
    if (this.state.changeModalName) {
      this.setState({ changeModalName: '' })
    }
    return !!!this.state.changeModalName ? false : true
  }

  getTabs = (intl: IntlShape) => {
    const tabs = {
      sections: [
        {
          id: 'general',
          title: intl.formatMessage(messages.generalTabTitle)
        },
        {
          id: 'birth',
          title: intl.formatMessage(messages.birthTabTitle)
        },
        {
          id: 'death',
          title: intl.formatMessage(messages.deathTabTitle)
        }
      ],
      activeTabId: this.state.activeTabId,
      onTabClick: (id: string) => this.changeTab(id)
    }
    return <FormTabs {...tabs} />
  }

  render() {
    const { intl, offlineCountryConfiguration } = this.props

    return (
      <SysAdminContentWrapper isCertificatesConfigPage={true}>
        <Content
          title={intl.formatMessage(messages.applicationSettings)}
          titleColor={'copy'}
          tabBarContent={this.getTabs(intl)}
        >
          {this.state.activeTabId && this.state.activeTabId === TabId.GENERAL && (
            <GeneralTabContent
              offlineCountryConfiguration={offlineCountryConfiguration}
              intl={intl}
              callBack={(modalName: string) =>
                this.setState({
                  changeModalName: modalName
                })
              }
            />
          )}
          {this.state.activeTabId && this.state.activeTabId === TabId.BIRTH && (
            <BirthTabContent
              offlineCountryConfiguration={offlineCountryConfiguration}
              intl={intl}
              callBack={(modalName: string) =>
                this.setState({
                  changeModalName: modalName
                })
              }
            />
          )}
          {this.state.activeTabId && this.state.activeTabId === TabId.DEATH && (
            <DeathTabContent
              offlineCountryConfiguration={offlineCountryConfiguration}
              intl={intl}
              callBack={(modalName: string) =>
                this.setState({
                  changeModalName: modalName
                })
              }
            />
          )}
        </Content>
        {this.state.changeModalName && (
          <DynamicModal
            toggleConfigModal={this.toggleConfigModal}
            changeModalName={this.state.changeModalName}
            showNotification={this.state.showNotification}
            valueChanged={this.changeValue}
          />
        )}
        <FloatingNotification
          id="print-cert-notification"
          type={this.state.notificationStatus}
          show={this.state.showNotification}
          callback={() => {
            this.setState({ showNotification: false })
          }}
        >
          {this.state.notificationMessages}
        </FloatingNotification>
      </SysAdminContentWrapper>
    )
  }
}

function mapStateToProps(state: IStoreState) {
  return {
    userDetails: getUserDetails(state),
    offlineCountryConfiguration: getOfflineData(state)
  }
}

export const ApplicationConfig = connect(mapStateToProps)(
  injectIntl(ApplicationConfigComponent)
)
