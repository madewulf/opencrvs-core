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
import {
  modifyApplication,
  IApplication,
  SUBMISSION_STATUS
} from '@client/applications'
import { connect } from 'react-redux'
import { WrappedComponentProps as IntlShapeProps, injectIntl } from 'react-intl'
import { goBack, goToHomeTab } from '@client/navigation'
import { IFormSection, IFormSectionData, IForm, Action } from '@client/forms'
import { replaceInitialValues } from '@client/views/RegisterForm/RegisterForm'
import { ActionPageLight } from '@opencrvs/components/lib/interface'
import { FormFieldGenerator } from '@client/components/form'
import { PrimaryButton } from '@opencrvs/components/lib/buttons'
import { buttonMessages } from '@client/i18n/messages'
import { correctReasonSection } from '@client/forms/correction/reason'
import {
  Content,
  ContentSize
} from '@opencrvs/components/lib/interface/Content'
import {
  groupHasError,
  updateApplicationRegistrationWithCorrection
} from './utils'
import { draftToGqlTransformer } from '@client/transformer'
import { getCorrectorSection } from '@client/forms/correction/corrector'
import { IStoreState } from '@client/store'

type IConnectProps = {
  form: IForm
  userPrimaryOffice?: string
}
type IProps = {
  application: IApplication
}

type IDispatchProps = {
  goBack: typeof goBack
  goToHomeTab: typeof goToHomeTab
  modifyApplication: typeof modifyApplication
}

type IFullProps = IProps & IDispatchProps & IntlShapeProps & IConnectProps

function getGroupWithInitialValues(
  section: IFormSection,
  application: IApplication
) {
  const group = section.groups[0]

  return {
    ...group,
    fields: replaceInitialValues(
      group.fields,
      application.data[section.id] || {},
      application.data
    )
  }
}

function CorrectionReasonFormComponent(props: IFullProps) {
  const { application, intl } = props

  const section = correctReasonSection

  const group = React.useMemo(
    () => getGroupWithInitialValues(section, application),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const modifyApplication = (
    sectionData: IFormSectionData,
    activeSection: IFormSection,
    application: IApplication
  ) => {
    props.modifyApplication({
      ...application,
      data: {
        ...application.data,
        [activeSection.id]: {
          ...application.data[activeSection.id],
          ...sectionData
        }
      }
    })
  }
  /*
   * TODO: goto next form
   */
  const continueButtonHandler = () => {
    const application = props.application
    application.action = Action.REQUEST_CORRECTION_APPLICATION
    application.submissionStatus = SUBMISSION_STATUS.READY_TO_REQUEST_CORRECTION
    updateApplicationRegistrationWithCorrection(props.application, {
      userPrimaryOffice: props.userPrimaryOffice
    })

    props.goToHomeTab('review')
  }

  const cancelCorrection = () => {
    props.modifyApplication({
      ...application,
      data: {
        ...application.originalData
      }
    })
    props.goToHomeTab('review')
  }

  const continueButton = (
    <PrimaryButton
      id="confirm_form"
      key="confirm_form"
      onClick={continueButtonHandler}
      disabled={groupHasError(group, application.data[section.id])}
    >
      {intl.formatMessage(buttonMessages.continueButton)}
    </PrimaryButton>
  )

  return (
    <>
      <ActionPageLight
        id="corrector_form"
        title={intl.formatMessage(section.title)}
        hideBackground
        goBack={props.goBack}
        goHome={cancelCorrection}
      >
        <Content
          title={group.title && intl.formatMessage(group.title)}
          bottomActionButtons={[continueButton]}
          size={ContentSize.LARGE}
        >
          <FormFieldGenerator
            id={group.id}
            onChange={(values) => {
              modifyApplication(values, section, application)
            }}
            setAllFieldsDirty={false}
            fields={group.fields}
            draftData={application.data}
          />
        </Content>
      </ActionPageLight>
    </>
  )
}

export const CorrectionReasonForm = connect(
  (state: IStoreState) => {
    return {
      userPrimaryOffice: state.profile.userDetails?.primaryOffice?.id,
      form: state.registerForm.registerForm?.birth as IForm
    }
  },
  {
    goBack,
    goToHomeTab,
    modifyApplication
  }
)(injectIntl(CorrectionReasonFormComponent))
