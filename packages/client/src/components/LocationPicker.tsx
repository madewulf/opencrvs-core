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
import { MapPin, Location, Cross } from '@opencrvs/components/lib/icons'
import { IStoreState } from '@client/store'
import { getOfflineData } from '@client/offline/selectors'
import { generateLocations } from '@client/utils/locationUtils'
import {
  ISearchLocation,
  LocationSearch
} from '@opencrvs/components/lib/interface'
import { connect } from 'react-redux'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { constantsMessages } from '@client/i18n/messages'
import { CircleButton } from '@opencrvs/components/lib/buttons'
import {
  PickerButton,
  ContentWrapper,
  ModalContainer as CommonModalContainer,
  ModalHeader,
  TitleContent,
  CancelableArea
} from '@client/components/DateRangePicker'
import styled from '@client/styledComponents'

const { useState } = React

interface IConnectProps {
  searchableLocations: ISearchLocation[]
}

interface IBaseProps {
  selectedLocationId: string
  onChangeLocation: (locationId: string) => void
  requiredJurisdictionTypes?: string
}

type LocationPickerProps = IBaseProps & IConnectProps & WrappedComponentProps

const ModalContainer = styled(CommonModalContainer)`
  width: 400px;
`

const ModalBody = styled.div`
  padding: 8px 16px;
`
const StyledLocationSearch = styled(LocationSearch)`
  flex-direction: column;
  width: 100%;

  & > svg {
    display: none;
  }

  & > input {
    padding-left: 8px;
  }

  & > ul {
    position: relative;
    z-index: 2;
    top: 0;
    box-shadow: none;
    margin-bottom: 0;
  }

  & > ul > li {
    border: none;
  }
`

function LocationPickerComponent(props: LocationPickerProps) {
  const { searchableLocations, selectedLocationId, intl } = props
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const selectedSearchedLocation = searchableLocations.find(
    ({ id }) => id === selectedLocationId
  ) as ISearchLocation

  return (
    <div>
      <PickerButton onClick={() => setModalVisible(true)}>
        <ContentWrapper>
          <span>{selectedSearchedLocation.displayLabel}</span>
          <MapPin />
        </ContentWrapper>
      </PickerButton>
      {modalVisible && (
        <>
          <ModalContainer>
            <ModalHeader>
              <TitleContent>
                <Location />
                <span>{intl.formatMessage(constantsMessages.location)}</span>
              </TitleContent>
              <CircleButton
                id="close-btn"
                type="button"
                onClick={() => setModalVisible(false)}
              >
                <Cross color="currentColor" />
              </CircleButton>
            </ModalHeader>
            <ModalBody>
              <StyledLocationSearch
                selectedLocation={selectedSearchedLocation}
                locationList={searchableLocations}
                searchHandler={({ id }) => {
                  props.onChangeLocation(id)
                  setModalVisible(false)
                }}
              />
            </ModalBody>
          </ModalContainer>
          <CancelableArea
            id="cancelable-area"
            onClick={() => setModalVisible(false)}
          />
        </>
      )}
    </div>
  )
}

function mapStateToProps(state: IStoreState, props: IBaseProps): IConnectProps {
  const offlineLocations = getOfflineData(state).locations
  const jurisidictionTypeFilter =
    (props.requiredJurisdictionTypes &&
      props.requiredJurisdictionTypes.split(',')) ||
    undefined
  const offlineSearchableLocations = generateLocations(
    offlineLocations,
    jurisidictionTypeFilter
  )
  return {
    searchableLocations: offlineSearchableLocations
  }
}

export const LocationPicker = connect(mapStateToProps)(
  injectIntl(LocationPickerComponent)
)
