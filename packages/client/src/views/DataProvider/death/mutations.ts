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
import gql from 'graphql-tag'
import { IForm, Action } from '@client/forms'
import { IApplication } from '@client/applications'
import {
  draftToGqlTransformer,
  appendGqlMetadataFromDraft
} from '@client/transformer'

const SUBMIT_DEATH_APPLICATION = gql`
  mutation submitMutation($details: DeathRegistrationInput!) {
    createDeathRegistration(details: $details) {
      trackingId
      compositionId
    }
  }
`
const APPROVE_DEATH_APPLICATION = gql`
  mutation submitMutation($id: ID!, $details: DeathRegistrationInput) {
    markDeathAsValidated(id: $id, details: $details)
  }
`
const REGISTER_DEATH_APPLICATION = gql`
  mutation submitMutation($id: ID!, $details: DeathRegistrationInput) {
    markDeathAsRegistered(id: $id, details: $details) {
      id
      registration {
        id
        status {
          id
          user {
            id
            name {
              use
              firstNames
              familyName
            }
            role
          }
          location {
            id
            name
            alias
          }
          office {
            name
            alias
            address {
              district
              state
            }
          }
          type
          timestamp
          comments {
            comment
          }
        }
      }
    }
  }
`
const REJECT_DEATH_APPLICATION = gql`
  mutation submitMutation($id: String!, $reason: String!, $comment: String!) {
    markEventAsVoided(id: $id, reason: $reason, comment: $comment)
  }
`

const COLLECT_DEATH_CERTIFICATE = gql`
  mutation submitMutation($id: ID!, $details: DeathRegistrationInput!) {
    markDeathAsCertified(id: $id, details: $details)
  }
`

export function getDeathMutationMappings(
  action: Action,
  payload?: any,
  form?: IForm,
  draft?: IApplication
) {
  let gqlDetails = {}
  if (form && draft) {
    gqlDetails = draftToGqlTransformer(form, draft, draft.id)
    appendGqlMetadataFromDraft(draft, gqlDetails)
  }

  switch (action) {
    case Action.SUBMIT_FOR_REVIEW:
      return {
        mutation: SUBMIT_DEATH_APPLICATION,
        variables: { details: gqlDetails },
        dataKey: 'createDeathRegistration'
      }
    case Action.APPROVE_APPLICATION:
      return {
        mutation: APPROVE_DEATH_APPLICATION,
        variables: {
          id: draft && draft.id,
          details: gqlDetails
        },
        dataKey: 'markDeathAsValidated'
      }
    case Action.REGISTER_APPLICATION:
      return {
        mutation: REGISTER_DEATH_APPLICATION,
        variables: {
          id: draft && draft.id,
          details: gqlDetails
        },
        dataKey: 'markDeathAsRegistered'
      }
    case Action.REJECT_APPLICATION:
      return {
        mutation: REJECT_DEATH_APPLICATION,
        variables: {
          ...payload
        },
        dataKey: 'markEventAsVoided'
      }
    case Action.COLLECT_CERTIFICATE:
      return {
        mutation: COLLECT_DEATH_CERTIFICATE,
        variables: {
          id: draft && draft.id,
          details: gqlDetails
        },
        dataKey: 'markDeathAsCertified'
      }
    default:
      return null
  }
}
