import { getLanguage } from '@opencrvs/register/src/i18n/selectors'
import { IStoreState } from '@opencrvs/register/src/store'

import * as React from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router'
import {
  ISearchInputProps,
  GridTable,
  Loader,
  Spinner
} from '@opencrvs/components/lib/interface'
import { IUserDetails, getUserLocation } from '../../utils/userUtils'
import { getUserDetails } from 'src/profile/profileSelectors'
import { Header } from 'src/components/interface/Header/Header'
import {
  goToEvents as goToEventsAction,
  goToFieldAgentHomeTab as goToFieldAgentHomeTabAction,
  goToTab as goToTabAction,
  goToApplicationDetails
} from 'src/navigation'
import {
  FIELD_AGENT_HOME_TAB_IN_PROGRESS,
  FIELD_AGENT_HOME_TAB_REQUIRE_UPDATES,
  FIELD_AGENT_HOME_TAB_SENT_FOR_REVIEW,
  FIELD_AGENT_ROLE,
  LANG_EN,
  EMPTY_STRING,
  APPLICATION_DATE_FORMAT,
  UNION_LOCATION_CODE
} from 'src/utils/constants'
import { InProgress } from './InProgress'
import styled, { withTheme } from 'styled-components'
import {
  Button,
  ICON_ALIGNMENT,
  FloatingActionButton
} from '@opencrvs/components/lib/buttons'
import {
  StatusProgress,
  StatusOrange,
  StatusRejected,
  PlusTransparentWhite,
  ApplicationsOrangeAmber
} from '@opencrvs/components/lib/icons'
import { REGISTRAR_HOME } from 'src/navigation/routes'
import { IApplication, SUBMISSION_STATUS } from 'src/applications'
import { SentForReview } from './SentForReview'
import { Query } from 'react-apollo'
import {
  SEARCH_APPLICATIONS_USER_WISE,
  COUNT_USER_WISE_APPLICATIONS
} from 'src/search/queries'
import { EVENT_STATUS } from '../RegistrarHome/RegistrarHome'
import * as Sentry from '@sentry/browser'
import { ITheme } from '@opencrvs/components/lib/theme'
import { BodyContent } from '@opencrvs/components/lib/layout'
import {
  GQLQuery,
  GQLEventSearchSet,
  GQLBirthEventSearchSet,
  GQLHumanName,
  GQLDeathEventSearchSet
} from '@opencrvs/gateway/src/graphql/schema'
import { createNamesMap } from 'src/utils/data-formatting'
import * as moment from 'moment'

const Topbar = styled.div`
  padding: 0 ${({ theme }) => theme.grid.margin}px;
  height: 48px;
  background: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.shadows.mistyShadow};
  display: flex;
  overflow-x: auto;
  justify-content: flex-start;
  align-items: center;
`
const IconTab = styled(Button).attrs<{ active: boolean }>({})`
  color: ${({ theme }) => theme.colors.copy};
  ${({ theme }) => theme.fonts.subtitleStyle};
  padding-left: 0;
  padding-right: 0;
  border-radius: 0;
  flex-shrink: 0;
  outline: none;
  ${({ active }) => (active ? 'border-bottom: 3px solid #5E93ED' : '')};
  & > div {
    padding: 0 16px;
  }
  :first-child > div {
    position: relative;
    padding-left: 0;
  }
  & div > div {
    margin-right: 8px;
  }
  &:focus {
    outline: 0;
  }
`
const FABContainer = styled.div`
  position: absolute;
  left: 85.33%;
  right: 5.33%;
  top: 85%;
  bottom: 9.17%;
`
const StyledSpinner = styled(Spinner)`
  margin: 20% auto;
`
const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors};
  ${({ theme }) => theme.fonts.bodyStyle};
  text-align: center;
  margin-top: 100px;
`

const ZeroUpdatesContainer = styled.div`
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ZeroUpdatesText = styled.span`
  padding-top: 10px;
  color: ${({ theme }) => theme.colors.blackStormy};
  ${({ theme }) => theme.fonts.h4Style};
`

const AllUpdatesText = styled.span`
  color: ${({ theme }) => theme.colors.blackStormy};
  ${({ theme }) => theme.fonts.bigBodyStyle};
`

const messages = defineMessages({
  inProgress: {
    id: 'register.fieldAgentHome.inProgress',
    defaultMessage: 'In progress ({total})',
    description: 'The title of in progress tab'
  },
  sentForReview: {
    id: 'register.fieldAgentHome.sentForReview',
    defaultMessage: 'Sent for review ({total})',
    description: 'The title of sent for review tab'
  },
  requireUpdates: {
    id: 'register.fieldAgentHome.requireUpdates',
    defaultMessage: 'Require updates ({total})',
    description: 'The title of require updates tab'
  },
  rejectedDays: {
    id: 'register.fieldAgentHome.rejectedDays',
    defaultMessage: 'Rejected {text}',
    description: 'The title of rejected days of application'
  },
  listItemName: {
    id: 'register.registrarHome.listItemName',
    defaultMessage: 'Name',
    description: 'Label for name in work queue list item'
  },
  listItemType: {
    id: 'register.registrarHome.resultsType',
    defaultMessage: 'Type',
    description: 'Label for type of event in work queue list item'
  },
  listItemUpdateDate: {
    id: 'register.registrarHome.results.updateDate',
    defaultMessage: 'Sent on',
    description: 'Label for rejection date in work queue list item'
  },
  zeroUpdatesText: {
    id: 'register.fieldAgentHome.zeroUpdatesText',
    defaultMessage: 'No applications require updates',
    description: 'The text when no rejected applications'
  },
  allUpdatesText: {
    id: 'register.fieldAgentHome.allUpdatesText',
    defaultMessage: 'Great job! You have updated all applications',
    description: 'The text when all rejected applications updated'
  },
  requireUpdatesLoading: {
    id: 'register.fieldAgentHome.requireUpdatesLoading',
    defaultMessage: 'Checking your applications',
    description: 'The text when all rejected applications are loading'
  },
  queryError: {
    id: 'register.fieldAgentHome.queryError',
    defaultMessage: 'An error occured while loading applications',
    description: 'The text when error ocurred loading rejected applications'
  }
})
interface IBaseFieldAgentHomeProps {
  theme: ITheme
  language: string
  userDetails: IUserDetails
  tabId: string
  draftApplications: IApplication[]
  goToTab: typeof goToTabAction
  goToEvents: typeof goToEventsAction
  draftCount: string
  goToFieldAgentHomeTab: typeof goToFieldAgentHomeTabAction
  goToApplicationDetails: typeof goToApplicationDetails
  applicationsReadyToSend: IApplication[]
}

interface IMatchParams {
  tabId: string
}

type FieldAgentHomeProps = IBaseFieldAgentHomeProps &
  InjectedIntlProps &
  ISearchInputProps &
  RouteComponentProps<IMatchParams>

interface IFieldAgentHomeState {
  progressCurrentPage: number
  reviewCurrentPage: number
  updatesCurrentPage: number
}

const TAB_ID = {
  inProgress: FIELD_AGENT_HOME_TAB_IN_PROGRESS,
  sentForReview: FIELD_AGENT_HOME_TAB_SENT_FOR_REVIEW,
  requireUpdates: FIELD_AGENT_HOME_TAB_REQUIRE_UPDATES
}

class FieldAgentHomeView extends React.Component<
  FieldAgentHomeProps,
  IFieldAgentHomeState
> {
  pageSize = 10
  constructor(props: FieldAgentHomeProps) {
    super(props)
    this.state = {
      progressCurrentPage: 1,
      reviewCurrentPage: 1,
      updatesCurrentPage: 1
    }
  }
  transformRejectedContent = (data: GQLQuery) => {
    if (!data.searchEvents || !data.searchEvents.results) {
      return []
    }

    return data.searchEvents.results.map((reg: GQLEventSearchSet) => {
      let names
      if (reg.registration && reg.type === 'Birth') {
        const birthReg = reg as GQLBirthEventSearchSet
        names = birthReg && (birthReg.childName as GQLHumanName[])
      } else {
        const deathReg = reg as GQLDeathEventSearchSet
        names = deathReg && (deathReg.deceasedName as GQLHumanName[])
      }
      const daysOfRejection =
        reg.registration &&
        reg.registration.dateOfApplication &&
        reg.registration.dateOfApplication &&
        moment(
          reg.registration.dateOfApplication,
          APPLICATION_DATE_FORMAT
        ).fromNow()

      return {
        id: reg.id,
        event: reg.type as string,
        name:
          (createNamesMap(names)[this.props.intl.locale] as string) ||
          (createNamesMap(names)[LANG_EN] as string),
        days_of_rejection: this.props.intl.formatMessage(
          messages.rejectedDays,
          {
            text: daysOfRejection
          }
        )
      }
    })
  }

  render() {
    const {
      draftApplications,
      userDetails,
      match,
      intl,
      applicationsReadyToSend,
      theme
    } = this.props
    const tabId = match.params.tabId || TAB_ID.inProgress
    const isFieldAgent =
      userDetails && userDetails.name && userDetails.role === FIELD_AGENT_ROLE
    const fieldAgentLocation =
      userDetails && getUserLocation(userDetails, UNION_LOCATION_CODE)
    let parentQueryLoading = false
    return (
      <>
        {isFieldAgent && (
          <>
            <Query
              query={COUNT_USER_WISE_APPLICATIONS}
              variables={{
                status: EVENT_STATUS.REJECTED,
                locationIds: [fieldAgentLocation]
              }}
            >
              {({ loading, error, data }) => {
                if (loading) {
                  parentQueryLoading = true
                  return (
                    <StyledSpinner
                      id="field-agent-home-spinner"
                      baseColor={theme.colors.background}
                    />
                  )
                }
                if (error) {
                  Sentry.captureException(error)
                  return (
                    <ErrorText id="field-agent-home_error">
                      {intl.formatMessage(messages.queryError)}
                    </ErrorText>
                  )
                }
                return (
                  <>
                    <Header />
                    <Topbar id="top-bar">
                      <IconTab
                        id={`tab_${TAB_ID.inProgress}`}
                        key={TAB_ID.inProgress}
                        active={tabId === TAB_ID.inProgress}
                        align={ICON_ALIGNMENT.LEFT}
                        icon={() => <StatusProgress />}
                        onClick={() =>
                          this.props.goToFieldAgentHomeTab(TAB_ID.inProgress)
                        }
                      >
                        {intl.formatMessage(messages.inProgress, {
                          total: draftApplications.length
                        })}
                      </IconTab>
                      <IconTab
                        id={`tab_${TAB_ID.sentForReview}`}
                        key={TAB_ID.sentForReview}
                        active={tabId === TAB_ID.sentForReview}
                        align={ICON_ALIGNMENT.LEFT}
                        icon={() => <StatusOrange />}
                        onClick={() =>
                          this.props.goToFieldAgentHomeTab(TAB_ID.sentForReview)
                        }
                      >
                        {intl.formatMessage(messages.sentForReview, {
                          total: applicationsReadyToSend.length
                        })}
                      </IconTab>
                      <IconTab
                        id={`tab_${TAB_ID.requireUpdates}`}
                        key={TAB_ID.requireUpdates}
                        active={tabId === TAB_ID.requireUpdates}
                        align={ICON_ALIGNMENT.LEFT}
                        icon={() => <StatusRejected />}
                        onClick={() =>
                          this.props.goToFieldAgentHomeTab(
                            TAB_ID.requireUpdates
                          )
                        }
                      >
                        {intl.formatMessage(messages.requireUpdates, {
                          total: data.searchEvents.totalItems
                        })}
                      </IconTab>
                    </Topbar>
                  </>
                )
              }}
            </Query>

            {tabId === TAB_ID.inProgress && (
              <InProgress draftApplications={draftApplications} />
            )}

            {tabId === TAB_ID.sentForReview && (
              <SentForReview
                applicationsReadyToSend={applicationsReadyToSend}
              />
            )}

            {tabId === TAB_ID.requireUpdates && (
              <Query
                query={SEARCH_APPLICATIONS_USER_WISE}
                variables={{
                  status: EVENT_STATUS.REJECTED,
                  locationIds: [fieldAgentLocation]
                }}
              >
                {({ loading, error, data }) => {
                  if (loading) {
                    return (
                      <>
                        {!parentQueryLoading && (
                          <Loader
                            id="require_updates_loader"
                            marginPercent={35}
                            spinnerDiameter={60}
                            loadingText={intl.formatMessage(
                              messages.requireUpdatesLoading
                            )}
                          />
                        )}
                      </>
                    )
                  }
                  if (error) {
                    Sentry.captureException(error)
                    return (
                      <ErrorText id="require_updates_loading_error">
                        {intl.formatMessage(messages.queryError)}
                      </ErrorText>
                    )
                  }
                  return (
                    <>
                      {data && data.searchEvents.totalItems > 0 && (
                        <BodyContent>
                          <GridTable
                            content={this.transformRejectedContent(data)}
                            columns={[
                              {
                                label: this.props.intl.formatMessage(
                                  messages.listItemType
                                ),
                                width: 30,
                                key: 'event'
                              },
                              {
                                label: this.props.intl.formatMessage(
                                  messages.listItemName
                                ),
                                width: 30,
                                key: 'name'
                              },
                              {
                                label: this.props.intl.formatMessage(
                                  messages.listItemUpdateDate
                                ),
                                width: 40,
                                key: 'days_of_rejection'
                              }
                            ]}
                            noResultText={EMPTY_STRING}
                          />
                        </BodyContent>
                      )}
                      {data && data.searchEvents.totalItems === 0 && (
                        <ZeroUpdatesContainer>
                          <ApplicationsOrangeAmber />
                          <ZeroUpdatesText>
                            {intl.formatMessage(messages.zeroUpdatesText)}
                          </ZeroUpdatesText>
                          <AllUpdatesText>
                            {intl.formatMessage(messages.allUpdatesText)}
                          </AllUpdatesText>
                        </ZeroUpdatesContainer>
                      )}
                    </>
                  )
                }}
              </Query>
            )}
            <FABContainer>
              <FloatingActionButton
                id="new_event_declaration"
                onClick={this.props.goToEvents}
                icon={() => <PlusTransparentWhite />}
              />
            </FABContainer>
          </>
        )}
        {userDetails && userDetails.role && !isFieldAgent && (
          <Redirect to={REGISTRAR_HOME} />
        )}
      </>
    )
  }
}

const mapStateToProps = (
  state: IStoreState,
  props: RouteComponentProps<{ tabId: string }>
) => {
  const { match } = props

  return {
    language: getLanguage(state),
    userDetails: getUserDetails(state),
    tabId: (match && match.params && match.params.tabId) || 'progress',
    draftApplications:
      (state.applicationsState.applications &&
        state.applicationsState.applications.filter(
          (application: IApplication) =>
            application.submissionStatus ===
            SUBMISSION_STATUS[SUBMISSION_STATUS.DRAFT]
        )) ||
      [],
    applicationsReadyToSend:
      (state.applicationsState.applications &&
        state.applicationsState.applications.filter(
          (application: IApplication) =>
            application.submissionStatus !==
            SUBMISSION_STATUS[SUBMISSION_STATUS.DRAFT]
        )) ||
      []
  }
}

export const FieldAgentHome = connect(
  mapStateToProps,
  {
    goToTab: goToTabAction,
    goToEvents: goToEventsAction,
    goToFieldAgentHomeTab: goToFieldAgentHomeTabAction,
    goToApplicationDetails
  }
)(injectIntl(withTheme(FieldAgentHomeView)))
