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
import fetch from 'node-fetch'
import { APPLICATION_CONFIG_URL } from '@gateway/constants'
import { hasScope } from '@gateway/features/user/utils'
import {
  GQLQuestionInput,
  GQLResolver,
  GQLMesssageInput
} from '@gateway/graphql/schema'

export const resolvers: GQLResolver = {
  Query: {
    async getQuestions(_, {}, authHeader) {
      const res = await fetch(`${APPLICATION_CONFIG_URL}questions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        }
      })
      return await res.json()
    }
  },

  Mutation: {
    async createOrUpdateQuestion(_, { question }, authHeader) {
      // Only natlsysadmin should be able to create or update a question
      if (!hasScope(authHeader, 'natlsysadmin')) {
        return await Promise.reject(
          new Error(
            'Create or update question is only allowed for natlsysadmin'
          )
        )
      }
      const questionPayload: IQuestionPayload =
        createOrUpdateQuestionPayload(question)
      const method = questionPayload.id ? 'PUT' : 'POST'
      const res = await fetch(`${APPLICATION_CONFIG_URL}question`, {
        method,
        body: JSON.stringify(questionPayload),
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        }
      })

      if (res.status !== 201) {
        return await Promise.reject(
          new Error(
            `Something went wrong on config service. Couldn't mofify question`
          )
        )
      }
      return await res.json()
    }
  }
}

function createOrUpdateQuestionPayload(
  question: GQLQuestionInput
): IQuestionPayload {
  const questionPayload: IQuestionPayload = {
    id: question.id as string,
    fieldId: question.fieldId as string,
    label: question.label as GQLMesssageInput[],
    placeholder: question.placeholder as GQLMesssageInput[],
    description: question.description as GQLMesssageInput[],
    tooltip: question.tooltip as GQLMesssageInput[],
    errorMessage: question.errorMessage as GQLMesssageInput[],
    maxLength: question.maxLength as number,
    fieldName: question.fieldName as string,
    fieldType: question.fieldType as FieldType,
    preceedingFieldId: question.preceedingFieldId as string,
    required: question.required as boolean,
    enabled: question.enabled as string,
    custom: question.custom as boolean,
    initialValue: question.initialValue as string
  }
  if (question.id) {
    question.id = question.id
  }
  return questionPayload
}

enum FieldType {
  TEXT = 'TEXT',
  TEL = 'TEL',
  NUMBER = 'NUMBER',
  TEXTAREA = 'TEXTAREA',
  SUBSECTION = 'SUBSECTION',
  PARAGRAPH = 'PARAGRAPH'
}

interface IQuestionPayload {
  id?: string
  fieldId: string
  label?: GQLMesssageInput[]
  placeholder?: GQLMesssageInput[]
  description?: GQLMesssageInput[]
  tooltip?: GQLMesssageInput[]
  errorMessage?: GQLMesssageInput[]
  maxLength?: number
  fieldName?: string
  fieldType?: FieldType
  preceedingFieldId?: string
  required?: boolean
  enabled: string
  custom?: boolean
  initialValue?: string
}
