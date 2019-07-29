import * as React from 'react'
import { ExpandableNotification } from '@opencrvs/components/lib/interface'
import styled from '@register/styledComponents'
import { connect } from 'react-redux'
import { IStoreState } from '@register/store'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import Outbox from './Outbox'
import { IApplication, SUBMISSION_STATUS } from '@register/applications'
import { messages } from '@register/i18n/messages/views/notification'

const ExpandableNotificationContainer = styled.div`
  display: flex;
  bottom: 0;
  position: fixed;
  width: 100%;
  flex-direction: column;
`

interface IProps {
  application: IApplication[]
}
type IFullProps = IProps & InjectedIntlProps
class NotificationToast extends React.Component<IFullProps> {
  render() {
    const outboxData = this.props.application.filter(
      item =>
        item.submissionStatus === SUBMISSION_STATUS.READY_TO_SUBMIT ||
        item.submissionStatus === SUBMISSION_STATUS.SUBMITTING ||
        item.submissionStatus === SUBMISSION_STATUS.READY_TO_REGISTER ||
        item.submissionStatus === SUBMISSION_STATUS.READY_TO_REJECT ||
        item.submissionStatus === SUBMISSION_STATUS.REGISTERING ||
        item.submissionStatus === SUBMISSION_STATUS.REJECTING ||
        item.submissionStatus === SUBMISSION_STATUS.FAILED_NETWORK
    )

    return outboxData.length > 0 ? (
      <ExpandableNotificationContainer>
        <ExpandableNotification
          outboxText={this.props.intl.formatMessage(messages.outboxText, {
            num: outboxData.length
          })}
          processingText={this.props.intl.formatMessage(
            messages.processingText,
            {
              num: outboxData.length
            }
          )}
        >
          <Outbox application={outboxData} />
        </ExpandableNotification>
      </ExpandableNotificationContainer>
    ) : null
  }
}

function mapStatetoProps(state: IStoreState) {
  return {
    application:
      state.applicationsState && state.applicationsState.applications
        ? [...state.applicationsState.applications]
        : []
  }
}
export default connect(mapStatetoProps)(injectIntl(NotificationToast))
