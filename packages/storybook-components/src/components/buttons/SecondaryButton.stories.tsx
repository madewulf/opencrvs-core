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
import { Story, Meta } from '@storybook/react'

import { SecondaryButton, IButtonProps } from '.'

const Template: Story<IButtonProps> = args => (
  <SecondaryButton {...args}>Press me</SecondaryButton>
)

export default {
  title: 'Components/Buttons/SecondaryButton',
  component: SecondaryButton,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: []
      }
    },
    align: {
      control: {
        type: 'select',
        options: ['LEFT', 'RIGHT']
      }
    }
  }
} as Meta

export const SecondaryButtonView = Template.bind({})
SecondaryButtonView.args = {
  id: 'myButton',
  onClick: () => alert('Hello')
}
