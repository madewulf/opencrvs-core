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
import Select, { components } from 'react-select'
import { ISelectOption } from '@opencrvs/components/lib/forms/Select'
import styled from '@client/styledComponents'
import { IndicatorProps } from 'react-select/lib/components/indicators'
import { KeyboardArrowDown } from '@opencrvs/components/lib/icons'

export interface IPerformanceSelectOption extends ISelectOption {
  type?: string
}
interface IOperationalSelectProps {
  id?: string
  value: string
  options: IPerformanceSelectOption[]
  onChange?: (selectedOption: IPerformanceSelectOption) => void
}

const StyledSelect = styled(Select)<{ defaultWidth: number }>`
  .react-select__container {
    border-radius: 2px;
    ${({ theme }) => theme.fonts.smallButtonStyleNoCapitalize};
  }

  .react-select__control {
    ${({ defaultWidth }) =>
      defaultWidth ? `min-width: ${defaultWidth}px` : 'min-width: 160px'};
    background-color: ${({ theme }) => theme.colors.secondary} !important;
    justify-content: center;
    ${({ theme }) => theme.fonts.smallButtonStyleNoCapitalize};
    text-transform: none;
    max-height: 32px;

    &:hover {
      ${({ theme }) => theme.gradients.gradientBabyShade}
    }
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__dropdown-indicator {
    padding-top: 6px;
  }

  .react-select__menu {
    ${({ defaultWidth }) =>
      defaultWidth ? `min-width: ${defaultWidth}` : 'min-width: 160px'};
    ${({ theme }) => theme.fonts.smallButtonStyleNoCapitalize};
  }

  .react-select__single-value {
    color: ${({ theme }) => theme.colors.white};
    margin-top: -3px;
  }
  .react-select__control--is-focused {
    background: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 0 0px 3px ${({ theme }) => theme.colors.focus};
  }
`

const DropdownIndicator = (props: IndicatorProps<ISelectOption>) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <KeyboardArrowDown pathStroke="white" />
      </components.DropdownIndicator>
    )
  )
}

function getSelectedOption(
  value: string,
  options: IPerformanceSelectOption[]
): IPerformanceSelectOption | null {
  const selectedOption = options.find(
    (x: IPerformanceSelectOption) => x.value === value
  )
  if (selectedOption) {
    return selectedOption
  }

  return null
}

export function PerformanceSelect(props: IOperationalSelectProps) {
  function handleChange(item: IPerformanceSelectOption) {
    if (props.onChange) {
      props.onChange(item)
    }
  }

  const selectedOption: IPerformanceSelectOption = getSelectedOption(
    props.value,
    props.options
  ) as IPerformanceSelectOption

  return (
    <StyledSelect
      isSearchable={false}
      value={getSelectedOption(props.value, props.options)}
      classNamePrefix="react-select"
      components={{ DropdownIndicator }}
      options={props.options}
      onChange={handleChange}
      defaultWidth={selectedOption.label.length * 8 + 50}
    />
  )
}