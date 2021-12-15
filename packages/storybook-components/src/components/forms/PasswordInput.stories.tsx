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
import { Meta, Story } from '@storybook/react'
import { EyeOff, EyeOn } from '../icons'
import { PasswordInput, IPasswordInputProps } from './PasswordInput'
import React from 'react'

export default {
  title: 'Components/forms/PasswordInput',
  component: PasswordInput
} as Meta

const Template: Story<IPasswordInputProps> = args => <PasswordInput {...args} />

export const PasswordInputView = Template.bind({})
PasswordInputView.args = {
  showIcon: <EyeOn />,
  hideIcon: <EyeOff />
}
