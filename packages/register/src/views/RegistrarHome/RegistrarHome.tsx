import {
  Button,
  IButtonProps,
  ICON_ALIGNMENT,
  FloatingActionButton
} from '@opencrvs/components/lib/buttons'
import {
  StatusOrange,
  StatusProgress,
  StatusGreen,
  StatusRejected,
  Duplicate,
  PlusTransparentWhite
} from '@opencrvs/components/lib/icons'
import {
  ISearchInputProps,
  Spinner,
  TopBar
} from '@opencrvs/components/lib/interface'
import {
  ColumnContentAlignment,
  GridTable
} from '@opencrvs/components/lib/interface/GridTable'
import { IAction } from '@opencrvs/components/lib/interface/ListItem'
import { BodyContent } from '@opencrvs/components/lib/layout'
import styled, { ITheme, withTheme } from '@register/styledComponents'
import { GQLQuery } from '@opencrvs/gateway/src/graphql/schema.d'
import moment from 'moment'
import * as React from 'react'
import * as Sentry from '@sentry/browser'
import { Query } from 'react-apollo'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { Header } from '@register/components/interface/Header/Header'
import { IViewHeadingProps } from '@register/components/ViewHeading'
import { IApplication, SUBMISSION_STATUS } from '@register/applications'
import {
  goToPrintCertificate as goToPrintCertificateAction,
  goToReviewDuplicate as goToReviewDuplicateAction,
  goToPage as goToPageAction,
  goToRegistrarHomeTab as goToRegistrarHomeTabAction,
  goToEvents as goToEventsAction
} from '@register/navigation'
import {
  DRAFT_BIRTH_PARENT_FORM_PAGE,
  DRAFT_DEATH_FORM_PAGE,
  REVIEW_EVENT_PARENT_FORM_PAGE
} from '@register/navigation/routes'
import { getScope, getUserDetails } from '@register/profile/profileSelectors'
import { IStoreState } from '@register/store'
import { Scope } from '@register/utils/authUtils'
import { sentenceCase } from '@register/utils/data-formatting'
import { getUserLocation, IUserDetails } from '@register/utils/userUtils'
import {
  COUNT_REGISTRATION_QUERY,
  SEARCH_EVENTS
} from '@register/views/RegistrarHome/queries'
import NotificationToast from '@register/views/RegistrarHome/NotificationToast'
import { transformData } from '@register/search/transformer'
import { RowHistoryView } from '@register/views/RegistrarHome/RowHistoryView'
import {
  buttonMessages,
  errorMessages,
  constantsMessages
} from '@register/i18n/messages'
import { messages } from '@register/i18n/messages/views/registrarHome'

export interface IProps extends IButtonProps {
  active?: boolean
  disabled?: boolean
  id: string
}

export const IconTab = styled(Button).attrs<IProps>({})`
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
const StyledSpinner = styled(Spinner)`
  margin: 20% auto;
`
const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  ${({ theme }) => theme.fonts.bodyStyle};
  text-align: center;
  margin-top: 100px;
`
const FABContainer = styled.div`
  position: fixed;
  right: 40px;
  bottom: 55px;
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.lg}px) {
    display: none;
  }
`

interface IBaseRegistrarHomeProps {
  theme: ITheme
  language: string
  scope: Scope | null
  userDetails: IUserDetails | null
  goToPage: typeof goToPageAction
  goToRegistrarHomeTab: typeof goToRegistrarHomeTabAction
  goToReviewDuplicate: typeof goToReviewDuplicateAction
  goToPrintCertificate: typeof goToPrintCertificateAction
  tabId: string
  drafts: IApplication[]
  goToEvents: typeof goToEventsAction
}

interface IRegistrarHomeState {
  progressCurrentPage: number
  reviewCurrentPage: number
  updatesCurrentPage: number
  printCurrentPage: number
}

type IRegistrarHomeProps = InjectedIntlProps &
  IViewHeadingProps &
  ISearchInputProps &
  IBaseRegistrarHomeProps

const TAB_ID = {
  inProgress: 'progress',
  readyForReview: 'review',
  sentForUpdates: 'updates',
  readyForPrint: 'print'
}

export const EVENT_STATUS = {
  DECLARED: 'DECLARED',
  REGISTERED: 'REGISTERED',
  REJECTED: 'REJECTED'
}
export class RegistrarHomeView extends React.Component<
  IRegistrarHomeProps,
  IRegistrarHomeState
> {
  pageSize = 10
  constructor(props: IRegistrarHomeProps) {
    super(props)
    this.state = {
      progressCurrentPage: 1,
      reviewCurrentPage: 1,
      updatesCurrentPage: 1,
      printCurrentPage: 1
    }
  }
  userHasRegisterScope() {
    return this.props.scope && this.props.scope.includes('register')
  }

  transformDeclaredContent = (data: GQLQuery) => {
    if (!data.searchEvents || !data.searchEvents.results) {
      return []
    }
    const transformedData = transformData(data, this.props.intl)

    return transformedData.map(reg => {
      const actions = [] as IAction[]
      let icon: JSX.Element = <div />
      if (this.userHasRegisterScope()) {
        if (reg.duplicates && reg.duplicates.length > 0) {
          actions.push({
            label: this.props.intl.formatMessage(buttonMessages.review),
            handler: () => this.props.goToReviewDuplicate(reg.id)
          })
          icon = <Duplicate />
        } else {
          actions.push({
            label: this.props.intl.formatMessage(buttonMessages.review),
            handler: () =>
              this.props.goToPage(
                REVIEW_EVENT_PARENT_FORM_PAGE,
                reg.id,
                'review',
                reg.event ? reg.event.toLowerCase() : ''
              )
          })
        }
      }

      return {
        ...reg,
        eventTimeElapsed:
          (reg.dateOfEvent &&
            moment(reg.dateOfEvent.toString(), 'YYYY-MM-DD').fromNow()) ||
          '',
        applicationTimeElapsed:
          (reg.createdAt &&
            moment(
              moment(reg.createdAt, 'x').format('YYYY-MM-DD HH:mm:ss'),
              'YYYY-MM-DD HH:mm:ss'
            ).fromNow()) ||
          '',
        actions,
        icon
      }
    })
  }

  transformRejectedContent = (data: GQLQuery) => {
    if (!data.searchEvents || !data.searchEvents.results) {
      return []
    }
    const transformedData = transformData(data, this.props.intl)
    return transformedData.map(reg => {
      const actions = [] as IAction[]
      if (this.userHasRegisterScope()) {
        if (reg.duplicates && reg.duplicates.length > 0) {
          actions.push({
            label: this.props.intl.formatMessage(buttonMessages.review),
            handler: () => this.props.goToReviewDuplicate(reg.id)
          })
        } else {
          actions.push({
            label: this.props.intl.formatMessage(buttonMessages.update),
            handler: () =>
              this.props.goToPage(
                REVIEW_EVENT_PARENT_FORM_PAGE,
                reg.id,
                'review',
                reg.event ? reg.event.toLowerCase() : ''
              )
          })
        }
      }
      return {
        ...reg,
        dateOfRejection:
          (reg.modifiedAt &&
            moment(
              moment(reg.modifiedAt, 'x').format('YYYY-MM-DD HH:mm:ss'),
              'YYYY-MM-DD HH:mm:ss'
            ).fromNow()) ||
          '',
        actions
      }
    })
  }

  transformDraftContent = () => {
    if (!this.props.drafts || this.props.drafts.length <= 0) {
      return []
    }
    return this.props.drafts
      .filter(
        draft =>
          draft.submissionStatus === SUBMISSION_STATUS[SUBMISSION_STATUS.DRAFT]
      )
      .map((draft: IApplication) => {
        let name
        let pageRoute: string
        if (draft.event && draft.event.toString() === 'birth') {
          name =
            (draft.data &&
              draft.data.child &&
              draft.data.child.familyNameEng &&
              (!draft.data.child.firstNamesEng
                ? ''
                : draft.data.child.firstNamesEng + ' ') +
                draft.data.child.familyNameEng) ||
            (draft.data &&
              draft.data.child &&
              draft.data.child.familyName &&
              (!draft.data.child.firstNames
                ? ''
                : draft.data.child.firstNames + ' ') +
                draft.data.child.familyName) ||
            ''
          pageRoute = DRAFT_BIRTH_PARENT_FORM_PAGE
        } else if (draft.event && draft.event.toString() === 'death') {
          name =
            (draft.data &&
              draft.data.deceased &&
              draft.data.deceased.familyNameEng &&
              (!draft.data.deceased.firstNamesEng
                ? ''
                : draft.data.deceased.firstNamesEng + ' ') +
                draft.data.deceased.familyNameEng) ||
            (draft.data &&
              draft.data.deceased &&
              draft.data.deceased.familyName &&
              (!draft.data.deceased.firstNames
                ? ''
                : draft.data.deceased.firstNames + ' ') +
                draft.data.deceased.familyName) ||
            ''
          pageRoute = DRAFT_DEATH_FORM_PAGE
        }
        const lastModificationDate = draft.modifiedOn || draft.savedOn
        const actions = [
          {
            label: this.props.intl.formatMessage(buttonMessages.update),
            handler: () =>
              this.props.goToPage(
                pageRoute,
                draft.id,
                'preview',
                (draft.event && draft.event.toString()) || ''
              )
          }
        ]
        return {
          id: draft.id,
          event: (draft.event && sentenceCase(draft.event)) || '',
          name: name || '',
          dateOfModification:
            (lastModificationDate && moment(lastModificationDate).fromNow()) ||
            '',
          actions
        }
      })
  }

  transformRegisterdContent = (data: GQLQuery) => {
    if (!data.searchEvents || !data.searchEvents.results) {
      return []
    }

    const transformedData = transformData(data, this.props.intl)
    return transformedData.map(reg => {
      const actions = [
        {
          label: this.props.intl.formatMessage(buttonMessages.print),
          handler: () =>
            this.props.goToPrintCertificate(
              reg.id,
              reg.event.toLocaleLowerCase() || ''
            )
        }
      ]
      return {
        ...reg,
        dateOfRegistration:
          (reg.modifiedAt &&
            moment(
              moment(reg.modifiedAt, 'x').format('YYYY-MM-DD HH:mm:ss'),
              'YYYY-MM-DD HH:mm:ss'
            ).fromNow()) ||
          ((reg.createdAt &&
            moment(
              moment(reg.createdAt, 'x').format('YYYY-MM-DD HH:mm:ss'),
              'YYYY-MM-DD HH:mm:ss'
            ).fromNow()) ||
            ''),
        actions
      }
    })
  }

  onPageChange = (newPageNumber: number) => {
    if (this.props.tabId === TAB_ID.inProgress) {
      this.setState({ progressCurrentPage: newPageNumber })
    }
    if (this.props.tabId === TAB_ID.readyForReview) {
      this.setState({ reviewCurrentPage: newPageNumber })
    }
    if (this.props.tabId === TAB_ID.sentForUpdates) {
      this.setState({ updatesCurrentPage: newPageNumber })
    }
    if (this.props.tabId === TAB_ID.readyForPrint) {
      this.setState({ printCurrentPage: newPageNumber })
    }
  }

  renderExpandedComponent = (itemId: string) => {
    return <RowHistoryView eventId={itemId} />
  }

  render() {
    const { theme, intl, userDetails, tabId, drafts } = this.props
    const registrarUnion = userDetails && getUserLocation(userDetails, 'UNION')
    let parentQueryLoading = false

    return (
      <>
        <Header />
        <Query
          query={COUNT_REGISTRATION_QUERY}
          variables={{
            locationIds: [registrarUnion]
          }}
        >
          {({
            loading,
            error,
            data
          }: {
            loading: any
            error?: any
            data: any
          }) => {
            if (loading) {
              parentQueryLoading = true
              return (
                <StyledSpinner
                  id="search-result-spinner"
                  baseColor={theme.colors.background}
                />
              )
            }
            parentQueryLoading = false
            if (error) {
              Sentry.captureException(error)
              return (
                <ErrorText id="search-result-error-text-count">
                  {intl.formatMessage(errorMessages.queryError)}
                </ErrorText>
              )
            }

            return (
              <>
                <TopBar>
                  <IconTab
                    id={`tab_${TAB_ID.inProgress}`}
                    key={TAB_ID.inProgress}
                    active={tabId === TAB_ID.inProgress}
                    align={ICON_ALIGNMENT.LEFT}
                    icon={() => <StatusProgress />}
                    onClick={() =>
                      this.props.goToRegistrarHomeTab(TAB_ID.inProgress)
                    }
                  >
                    {intl.formatMessage(messages.inProgress)} (
                    {(drafts &&
                      drafts.filter(
                        draft =>
                          draft.submissionStatus ===
                          SUBMISSION_STATUS[SUBMISSION_STATUS.DRAFT]
                      ).length) ||
                      0}
                    )
                  </IconTab>
                  <IconTab
                    id={`tab_${TAB_ID.readyForReview}`}
                    key={TAB_ID.readyForReview}
                    active={tabId === TAB_ID.readyForReview}
                    align={ICON_ALIGNMENT.LEFT}
                    icon={() => <StatusOrange />}
                    onClick={() =>
                      this.props.goToRegistrarHomeTab(TAB_ID.readyForReview)
                    }
                  >
                    {intl.formatMessage(messages.readyForReview)} (
                    {data.countEvents.declared})
                  </IconTab>
                  <IconTab
                    id={`tab_${TAB_ID.sentForUpdates}`}
                    key={TAB_ID.sentForUpdates}
                    active={tabId === TAB_ID.sentForUpdates}
                    align={ICON_ALIGNMENT.LEFT}
                    icon={() => <StatusRejected />}
                    onClick={() =>
                      this.props.goToRegistrarHomeTab(TAB_ID.sentForUpdates)
                    }
                  >
                    {intl.formatMessage(messages.sentForUpdates)} (
                    {data.countEvents.rejected})
                  </IconTab>
                  <IconTab
                    id={`tab_${TAB_ID.readyForPrint}`}
                    key={TAB_ID.readyForPrint}
                    active={tabId === TAB_ID.readyForPrint}
                    align={ICON_ALIGNMENT.LEFT}
                    icon={() => <StatusGreen />}
                    onClick={() =>
                      this.props.goToRegistrarHomeTab(TAB_ID.readyForPrint)
                    }
                  >
                    {intl.formatMessage(messages.readyToPrint)} (
                    {data.countEvents.registered})
                  </IconTab>
                </TopBar>
              </>
            )
          }}
        </Query>
        {tabId === TAB_ID.inProgress && (
          <BodyContent>
            <GridTable
              content={this.transformDraftContent()}
              columns={[
                {
                  label: this.props.intl.formatMessage(constantsMessages.type),
                  width: 15,
                  key: 'event'
                },
                {
                  label: this.props.intl.formatMessage(constantsMessages.name),
                  width: 35,
                  key: 'name'
                },
                {
                  label: this.props.intl.formatMessage(
                    constantsMessages.lastEdited
                  ),
                  width: 35,
                  key: 'dateOfModification'
                },
                {
                  label: this.props.intl.formatMessage(messages.listItemAction),
                  width: 15,
                  key: 'actions',
                  isActionColumn: true,
                  alignment: ColumnContentAlignment.CENTER
                }
              ]}
              noResultText={intl.formatMessage(constantsMessages.noResults)}
              onPageChange={(currentPage: number) => {
                this.onPageChange(currentPage)
              }}
              pageSize={this.pageSize}
              totalItems={drafts && drafts.length}
              currentPage={this.state.progressCurrentPage}
            />
          </BodyContent>
        )}
        {tabId === TAB_ID.readyForReview && (
          <Query
            query={SEARCH_EVENTS}
            variables={{
              status: EVENT_STATUS.DECLARED,
              locationIds: [registrarUnion],
              count: this.pageSize,
              skip: (this.state.reviewCurrentPage - 1) * this.pageSize
            }}
          >
            {({
              loading,
              error,
              data
            }: {
              loading: any
              error?: any
              data: any
            }) => {
              if (loading) {
                return (
                  (!parentQueryLoading && (
                    <StyledSpinner
                      id="search-result-spinner"
                      baseColor={theme.colors.background}
                    />
                  )) ||
                  null
                )
              }
              if (error) {
                Sentry.captureException(error)
                return (
                  <ErrorText id="search-result-error-text-review">
                    {intl.formatMessage(errorMessages.queryError)}
                  </ErrorText>
                )
              }
              return (
                <BodyContent>
                  <GridTable
                    content={this.transformDeclaredContent(data)}
                    columns={[
                      {
                        label: this.props.intl.formatMessage(
                          constantsMessages.type
                        ),
                        width: 14,
                        key: 'event'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          constantsMessages.trackingId
                        ),
                        width: 20,
                        key: 'trackingId'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          messages.listItemApplicationDate
                        ),
                        width: 20,
                        key: 'applicationTimeElapsed'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          constantsMessages.eventDate
                        ),
                        width: 20,
                        key: 'eventTimeElapsed'
                      },
                      {
                        width: 6,
                        key: 'icons',
                        isIconColumn: true
                      },
                      {
                        width: 20,
                        key: 'actions',
                        isActionColumn: true,
                        alignment: ColumnContentAlignment.CENTER
                      }
                    ]}
                    renderExpandedComponent={this.renderExpandedComponent}
                    noResultText={intl.formatMessage(
                      constantsMessages.noResults
                    )}
                    onPageChange={(currentPage: number) => {
                      this.onPageChange(currentPage)
                    }}
                    pageSize={this.pageSize}
                    totalItems={
                      data.searchEvents && data.searchEvents.totalItems
                    }
                    currentPage={this.state.reviewCurrentPage}
                    expandable={true}
                  />
                </BodyContent>
              )
            }}
          </Query>
        )}
        {tabId === TAB_ID.sentForUpdates && (
          <Query
            query={SEARCH_EVENTS}
            variables={{
              status: EVENT_STATUS.REJECTED,
              locationIds: [registrarUnion],
              count: this.pageSize,
              skip: (this.state.updatesCurrentPage - 1) * this.pageSize
            }}
          >
            {({
              loading,
              error,
              data
            }: {
              loading: any
              error?: any
              data: any
            }) => {
              if (loading) {
                return (
                  (!parentQueryLoading && (
                    <StyledSpinner
                      id="search-result-spinner"
                      baseColor={theme.colors.background}
                    />
                  )) ||
                  null
                )
              }
              if (error) {
                Sentry.captureException(error)
                return (
                  <ErrorText id="search-result-error-text-reject">
                    {intl.formatMessage(errorMessages.queryError)}
                  </ErrorText>
                )
              }
              return (
                <BodyContent>
                  <GridTable
                    content={this.transformRejectedContent(data)}
                    columns={[
                      {
                        label: this.props.intl.formatMessage(
                          constantsMessages.type
                        ),
                        width: 14,
                        key: 'event'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          constantsMessages.name
                        ),
                        width: 23,
                        key: 'name'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          constantsMessages.applicantContactNumber
                        ),
                        width: 21,
                        key: 'contactNumber'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          constantsMessages.sentOn
                        ),
                        width: 22,
                        key: 'dateOfRejection'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          messages.listItemAction
                        ),
                        width: 20,
                        key: 'actions',
                        isActionColumn: true,
                        alignment: ColumnContentAlignment.CENTER
                      }
                    ]}
                    renderExpandedComponent={this.renderExpandedComponent}
                    noResultText={intl.formatMessage(
                      constantsMessages.noResults
                    )}
                    onPageChange={(currentPage: number) => {
                      this.onPageChange(currentPage)
                    }}
                    pageSize={this.pageSize}
                    totalItems={
                      data.searchEvents && data.searchEvents.totalItems
                    }
                    currentPage={this.state.updatesCurrentPage}
                    expandable={true}
                  />
                </BodyContent>
              )
            }}
          </Query>
        )}
        {tabId === TAB_ID.readyForPrint && (
          <Query
            query={SEARCH_EVENTS}
            variables={{
              status: EVENT_STATUS.REGISTERED,
              locationIds: [registrarUnion],
              count: this.pageSize,
              skip: (this.state.printCurrentPage - 1) * this.pageSize
            }}
          >
            {({
              loading,
              error,
              data
            }: {
              loading: any
              error?: any
              data: any
            }) => {
              if (loading) {
                return (
                  (!parentQueryLoading && (
                    <StyledSpinner
                      id="search-result-spinner-print"
                      baseColor={theme.colors.background}
                    />
                  )) ||
                  null
                )
              }
              if (error) {
                Sentry.captureException(error)
                return (
                  <ErrorText id="search-result-error-text-print">
                    {intl.formatMessage(errorMessages.queryError)}
                  </ErrorText>
                )
              }
              return (
                <BodyContent>
                  <GridTable
                    content={this.transformRegisterdContent(data)}
                    columns={[
                      {
                        label: this.props.intl.formatMessage(
                          constantsMessages.type
                        ),
                        width: 14,
                        key: 'event'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          constantsMessages.name
                        ),
                        width: 25,
                        key: 'name'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          messages.listItemRegisteredDate
                        ),
                        width: 24,
                        key: 'dateOfRegistration'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          messages.registrationNumber
                        ),
                        width: 25,
                        key: 'registrationNumber'
                      },
                      {
                        label: this.props.intl.formatMessage(
                          messages.listItemAction
                        ),
                        width: 12,
                        key: 'actions',
                        alignment: ColumnContentAlignment.CENTER,
                        isActionColumn: true
                      }
                    ]}
                    renderExpandedComponent={this.renderExpandedComponent}
                    noResultText={intl.formatMessage(
                      constantsMessages.noResults
                    )}
                    onPageChange={(currentPage: number) => {
                      this.onPageChange(currentPage)
                    }}
                    pageSize={this.pageSize}
                    totalItems={
                      data.searchEvents && data.searchEvents.totalItems
                    }
                    currentPage={this.state.printCurrentPage}
                    expandable={true}
                  />
                </BodyContent>
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
        <NotificationToast />
      </>
    )
  }
}

function mapStateToProps(
  state: IStoreState,
  props: RouteComponentProps<{ tabId: string }>
) {
  const { match } = props
  return {
    language: state.i18n.language,
    scope: getScope(state),
    userDetails: getUserDetails(state),
    tabId: (match && match.params && match.params.tabId) || 'review',
    drafts: state.applicationsState.applications
  }
}

export const RegistrarHome = connect(
  mapStateToProps,
  {
    goToEvents: goToEventsAction,
    goToPage: goToPageAction,
    goToRegistrarHomeTab: goToRegistrarHomeTabAction,
    goToReviewDuplicate: goToReviewDuplicateAction,
    goToPrintCertificate: goToPrintCertificateAction
  }
)(injectIntl(withTheme(RegistrarHomeView)))
