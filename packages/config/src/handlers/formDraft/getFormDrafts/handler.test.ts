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
import { createServer } from '@config/server'
import FormDraft from '@config/models/formDraft'
import * as mockingoose from 'mockingoose'
import * as jwt from 'jsonwebtoken'
import { readFileSync } from 'fs'

const token = jwt.sign(
  { scope: ['natlsysadmin'] },
  readFileSync('../auth/test/cert.key'),
  {
    algorithm: 'RS256',
    issuer: 'opencrvs:auth-service',
    audience: 'opencrvs:config-user'
  }
)
const mockFormDraft = [
  {
    status: 'DRAFT',
    _id: '623f30a18aef60124a72df14',
    event: 'death',
    comment: 'Modified previous death question',
    version: 2,
    createdAt: 1648308385612,
    updatedAt: 1648308396432,
    history: [
      {
        status: 'DRAFT',
        _id: '623f30ac8aef60124a72df1c',
        version: 1,
        comment: 'Added new death question',
        updatedAt: 1648308385612
      }
    ],
    __v: 0
  },
  {
    status: 'DRAFT',
    _id: '623f30c18aef60124a72df28',
    event: 'birth',
    comment: 'Added new birth question',
    version: 1,
    createdAt: 1648308417889,
    updatedAt: 1648308457121,
    history: [],
    __v: 0
  }
]

describe('getFormDraft', () => {
  let server: any

  beforeEach(async () => {
    server = await createServer()
  })

  it('get question using mongoose', async () => {
    mockingoose(FormDraft).toReturn(mockFormDraft, 'find')

    const res = await server.server.inject({
      method: 'GET',
      url: '/formDraft',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    expect(res.statusCode).toBe(200)
  })
})
