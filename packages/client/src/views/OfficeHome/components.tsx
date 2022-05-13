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
import styled from '@client/styledComponents'
import { DeclarationIcon } from '@opencrvs/components/lib/icons/DeclarationIcon'
import { STATUSTOCOLOR } from '@client/views/Home/RecordAudit'
import { Duplicate, StatusFailed } from '@opencrvs/components/lib/icons'
import { SUBMISSION_STATUS } from '@client/declarations'
import { LinkButton } from '@opencrvs/components/lib/buttons'

import { Spinner } from '@opencrvs/components/lib/interface/Spinner'
import { Uploaded } from '@opencrvs/components/lib/icons/Uploaded'
import { WaitingToSent } from '@opencrvs/components/lib/icons/WaitingToSent'
import { ConnectionError } from '@opencrvs/components/lib/icons/ConnectionError'

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.md}px) {
    align-items: flex-start;
  }
`

const Error = styled.span`
  color: ${({ theme }) => theme.colors.negative};
`

const Event = styled.div`
  color: ${({ theme }) => theme.colors.grey500};
  ${({ theme }) => theme.fonts.reg16}
`

const NameEventContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Icon = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 24px;
`
interface IIconWith {
  status?: string
  name?: string
  event?: string
  isDuplicate?: boolean
  isValidatedOnReview?: boolean
}

const IconComp = ({
  status,
  isDuplicateIcon,
  isValidatedOnReview
}: {
  status: string
  isDuplicateIcon?: boolean
  isValidatedOnReview?: boolean
}) => {
  return (
    <Icon>
      {isDuplicateIcon ? (
        <Duplicate />
      ) : (
        <DeclarationIcon
          color={STATUSTOCOLOR[status]}
          isValidatedOnReview={isValidatedOnReview}
        />
      )}
    </Icon>
  )
}

export const IconWithName = ({
  status,
  name,
  isDuplicate,
  isValidatedOnReview
}: IIconWith) => {
  return (
    <Flex id="flex">
      {status && (
        <IconComp
          status={status}
          isDuplicateIcon={isDuplicate}
          isValidatedOnReview={isValidatedOnReview}
        />
      )}
      {name ? (
        <LinkButton id="name" isBoldLink>
          {name}
        </LinkButton>
      ) : (
        <LinkButton isBoldLink>No name provided</LinkButton>
      )}
    </Flex>
  )
}

export const IconWithNameEvent = ({
  status,
  name,
  event,
  isDuplicate,
  isValidatedOnReview
}: IIconWith) => {
  return (
    <Flex id="flex">
      {status && (
        <IconComp
          status={status}
          isDuplicateIcon={isDuplicate}
          isValidatedOnReview={isValidatedOnReview}
        />
      )}
      <NameEventContainer id="nameEvent">
        {name ? (
          <LinkButton isBoldLink>{name}</LinkButton>
        ) : (
          <LinkButton isBoldLink>No name provided</LinkButton>
        )}
        {event && <Event>{event}</Event>}
      </NameEventContainer>
    </Flex>
  )
}

export const SubmissionStatusMap = ({
  status,
  online,
  index
}: {
  status: string
  online: boolean
  index: number
}) => {
  let icon: React.ReactNode
  let overwriteStatusIfOffline = true
  let iconId: string
  switch (status) {
    case SUBMISSION_STATUS[SUBMISSION_STATUS.SUBMITTING]:
      iconId = `submitting${index}`
      icon = <Spinner id={iconId} key={iconId} size={24} />
      break
    case SUBMISSION_STATUS[SUBMISSION_STATUS.SUBMITTED]:
    case SUBMISSION_STATUS[SUBMISSION_STATUS.DECLARED]:
      overwriteStatusIfOffline = false
      iconId = `submitted${index}`
      icon = <Uploaded id={iconId} key={iconId} />
      break
    case SUBMISSION_STATUS[SUBMISSION_STATUS.FAILED]:
      overwriteStatusIfOffline = false
      iconId = `failed${index}`
      icon = <StatusFailed id={iconId} key={iconId} />
      break
    case SUBMISSION_STATUS[SUBMISSION_STATUS.READY_TO_SUBMIT]:
      iconId = `waiting${index}`
      icon = <WaitingToSent id={iconId} key={iconId} />
      break
    default:
      iconId = `waiting${index}`
      icon = <WaitingToSent id={iconId} key={iconId} />
      break
  }

  if (!online && overwriteStatusIfOffline) {
    iconId = `offline${index}`
    icon = <ConnectionError id={iconId} key={iconId} />
  }

  return <>{icon}</>
}
