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
import { CustomFieldForms } from '@client/components/formConfig/CustomFieldForm'
import {
  IConfigField,
  isDefaultField
} from '@client/forms/configuration/formConfig/utils'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { Redirect, useParams, useLocation } from 'react-router'
import { HOME } from '@client/navigation/routes'
import { IStoreState } from '@client/store'
import styled from '@client/styledComponents'
import { PrimaryButton, TertiaryButton } from '@opencrvs/components/lib/buttons'
import { SettingsBlue } from '@opencrvs/components/lib/icons'
import { EventTopBar } from '@opencrvs/components/lib/interface'
import { SectionNavigation } from '@client/components/formConfig/SectionNavigation'
import { FormTools } from '@client/components/formConfig/formTools/FormTools'
import { BirthSection, DeathSection, WizardSection } from '@client/forms'
import { Event } from '@client/utils/gateway'
import { buttonMessages } from '@client/i18n/messages'
import { Canvas } from '@client/components/formConfig/Canvas'
import { DefaultFieldTools } from '@client/components/formConfig/formTools/DefaultFieldTools'
import { constantsMessages } from '@client/i18n/messages/constants'
import { messages } from '@client/i18n/messages/views/formConfig'
import { goToFormConfigHome, goToFormConfigWizard } from '@client/navigation'
import { getScope } from '@client/profile/profileSelectors'
import { AuthScope } from '@client/utils/authUtils'
import { ActionStatus } from '@client/views/SysAdmin/Config/Forms/utils'
import { SaveActionModal, SaveActionContext } from './SaveActionModal'
import { SaveActionNotification } from './SaveActionNotification'
import { FormConfigSettings } from './FormConfigSettings'
import {
  selectConfigField,
  selectFormDraft,
  selectConfigFields
} from '@client/forms/configuration/formConfig/selectors'
import { FieldPosition, FieldEnabled } from '@client/forms/configuration'
import {
  getIdentifiersFromFieldId,
  isDefaultQuestionConfig
} from '@client/forms/questionConfig'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const WizardContainer = styled.div`
  margin-top: 56px;
  height: calc(100% - 56px);
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.lg}px) {
    display: none;
  }
`

const NavigationContainer = styled.div`
  width: 250px;
  flex-shrink: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.grey300};
  background-color: ${({ theme }) => theme.colors.white};
`

const ToolsContainer = styled.div`
  width: 348px;
  flex-shrink: 0;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 30px;
  border-left: 1px solid ${({ theme }) => theme.colors.grey300};
  background-color: ${({ theme }) => theme.colors.white};
  overflow-y: auto;
`

const CanvasContainer = styled.div`
  overflow-y: auto;
  flex: 0 1 800px;
  margin-left: 40px;
  margin-right: 40px;
  padding-top: 18px;
`

const CanvasWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

type IRouteProps = {
  event: Event
  section: string
}

function isValidEvent(event: string): event is Event {
  return Object.values<string>(Event).includes(event)
}

function isValidSection(section: string): section is WizardSection {
  return [
    ...Object.values<string>(BirthSection),
    ...Object.values<string>(DeathSection),
    'settings'
  ].includes(section)
}

function isSelectedFieldValid(
  selectedField: IConfigField | null,
  section: string
): selectedField is IConfigField {
  return !!selectedField?.fieldId.includes(section)
}

function useHasNatlSysAdminScope() {
  const scope = useSelector(getScope)
  return scope?.includes(AuthScope.NATLSYSADMIN)
}

function useSelectedField() {
  const { event, section } = useParams<IRouteProps>()
  const [selectedFieldId, setSelectedFieldId] = React.useState<string | null>(
    null
  )
  const selectedField = useSelector((store: IStoreState) =>
    selectConfigField(store, event, section, selectedFieldId)
  )

  /*
   * We need to clear the selected field if section changes
   * as the changed section won't have the previously selected field
   */
  React.useEffect(() => {
    if (selectedFieldId && !selectedFieldId.includes(section)) {
      setSelectedFieldId(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section])

  return { selectedField, setSelectedField: setSelectedFieldId }
}

function useHiddenFields({
  selectedField,
  setSelectedField
}: ReturnType<typeof useSelectedField>) {
  const [showHiddenFields, setShowHiddenFields] = React.useState(true)

  /*
   * We need to clear the selected field if the selected field is made
   * hidden and we have the showHiddenFields set to false
   */
  React.useEffect(() => {
    if (
      !showHiddenFields &&
      selectedField &&
      isDefaultQuestionConfig(selectedField) &&
      selectedField.enabled === FieldEnabled.DISABLED
    ) {
      setSelectedField(null)
    }
  }, [showHiddenFields, selectedField, setSelectedField])

  return { showHiddenFields, setShowHiddenFields }
}

export function FormConfigWizard() {
  const dispatch = useDispatch()
  const hasNatlSysAdminScope = useHasNatlSysAdminScope()
  const intl = useIntl()
  const [status, setStatus] = React.useState<ActionStatus>(ActionStatus.IDLE)
  const { selectedField, setSelectedField } = useSelectedField()
  const { showHiddenFields, setShowHiddenFields } = useHiddenFields({
    selectedField,
    setSelectedField
  })
  const { event, section } = useParams<IRouteProps>()
  const { version } = useSelector((store: IStoreState) =>
    selectFormDraft(store, event)
  )
  const fieldsMap = useSelector((store: IStoreState) =>
    selectConfigFields(store, event, section)
  )
  const location = useLocation()

  let firstFieldIdentifiers
  if (section !== 'settings') {
    const firstField = Object.values(fieldsMap).find(
      (formField) => formField.precedingFieldId === FieldPosition.TOP
    )
    if (!firstField) {
      throw new Error(`No starting field found in section`)
    }
    firstFieldIdentifiers = getIdentifiersFromFieldId(firstField.fieldId)
  }
  if (
    !hasNatlSysAdminScope ||
    !isValidEvent(event) ||
    !isValidSection(section)
  ) {
    return <Redirect to={HOME} />
  }

  return (
    <Container>
      <EventTopBar
        title={intl.formatMessage(messages.draftLabel, {
          event: intl.formatMessage(constantsMessages[event]),
          version: version + 1
        })}
        pageIcon={<></>}
        topBarActions={
          !location.pathname.includes('settings')
            ? [
                <TertiaryButton
                  id="settings"
                  key="settings"
                  icon={() => <SettingsBlue />}
                  onClick={() =>
                    dispatch(goToFormConfigWizard(event, 'settings'))
                  }
                ></TertiaryButton>,
                <PrimaryButton
                  key="save"
                  size="small"
                  disabled={status === ActionStatus.PROCESSING}
                  onClick={() => setStatus(ActionStatus.MODAL)}
                >
                  {intl.formatMessage(buttonMessages.save)}
                </PrimaryButton>
              ]
            : []
        }
        goHome={() => dispatch(goToFormConfigHome())}
      />
      <WizardContainer>
        <NavigationContainer>
          <SectionNavigation />
        </NavigationContainer>
        {section !== 'settings' && firstFieldIdentifiers !== undefined ? (
          <>
            <CanvasWrapper
              onClick={(e) => {
                e.preventDefault()
                if (e.target === e.currentTarget) {
                  setSelectedField(null)
                }
              }}
            >
              <CanvasContainer>
                <Canvas
                  selectedField={selectedField}
                  setSelectedField={setSelectedField}
                  showHiddenFields={showHiddenFields}
                />
              </CanvasContainer>
            </CanvasWrapper>
            <ToolsContainer>
              {/*
               *  The useEffect hook for clearing the selectedFieldId takes
               *  effect after the render for when the section changes so
               *  for that particular render where the section has changed
               *  but the selectedFieldId is still from the previous section,
               *  we need to make sure that the selectedField is valid
               */}
              {isSelectedFieldValid(selectedField, section) ? (
                isDefaultField(selectedField) ? (
                  <DefaultFieldTools configField={selectedField} />
                ) : (
                  <CustomFieldForms
                    key={selectedField.fieldId}
                    event={event}
                    section={section}
                    selectedField={selectedField}
                    setSelectedField={setSelectedField}
                    groupId={firstFieldIdentifiers.groupId}
                  />
                )
              ) : (
                <FormTools
                  showHiddenFields={showHiddenFields}
                  setShowHiddenFields={setShowHiddenFields}
                  setSelectedField={setSelectedField}
                  groupId={firstFieldIdentifiers.groupId}
                />
              )}
            </ToolsContainer>
            <SaveActionContext.Provider value={{ status, setStatus }}>
              <SaveActionModal />
              <SaveActionNotification />
            </SaveActionContext.Provider>
          </>
        ) : (
          <FormConfigSettings />
        )}
      </WizardContainer>
    </Container>
  )
}
