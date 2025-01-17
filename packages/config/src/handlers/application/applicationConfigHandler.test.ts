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
import ApplicationConfig, {
  IApplicationConfigurationModel
} from '@config/models/config'
import * as fetchMock from 'jest-fetch-mock'
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

const fetch = fetchMock as fetchMock.FetchMock

export const validImageB64String =
  'iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAXSURBVAiZY1RWVv7PgAcw4ZNkYGBgAABYyAFsic1CfAAAAABJRU5ErkJggg=='

let mockConfig = {
  APPLICATION_NAME: 'Farajaland CRVS',
  BACKGROUND_SYNC_BROADCAST_CHANNEL: 'backgroundSynBroadCastChannel',
  BIRTH: {
    REGISTRATION_TARGET: 45,
    LATE_REGISTRATION_TARGET: 365,
    FEE: {
      ON_TIME: 0,
      LATE: 0,
      DELAYED: 0
    }
  },
  COUNTRY: 'bgd',
  COUNTRY_LOGO: {
    fileName: 'logo.png',
    file: `data:image;base64,${validImageB64String}`
  },
  CURRENCY: {
    isoCode: 'ZMW',
    languagesAndCountry: ['en-ZM']
  },
  DEATH: {
    REGISTRATION_TARGET: 45,
    FEE: {
      ON_TIME: 0,
      DELAYED: 0
    }
  },
  DESKTOP_TIME_OUT_MILLISECONDS: 900000, // 15 mins
  HEALTH_FACILITY_FILTER: 'UPAZILA',
  LANGUAGES: 'en,bn',
  LOGIN_URL: 'http://localhost:3020',
  AUTH_URL: 'http://localhost:4040',
  API_GATEWAY_URL: 'http://localhost:7070/',
  PERFORMANCE_URL: 'http://localhost:3001',
  RESOURCES_URL: 'http://localhost:3040',
  UI_POLLING_INTERVAL: 5000,
  FIELD_AGENT_AUDIT_LOCATIONS:
    'WARD,UNION,CITY_CORPORATION,MUNICIPALITY,UPAZILA',
  DECLARATION_AUDIT_LOCATIONS: 'WARD,UNION,MUNICIPALITY',
  EXTERNAL_VALIDATION_WORKQUEUE: true, // this flag will decide whether to show external validation workqueue on registrar home
  SENTRY: 'https://2ed906a0ba1c4de2ae3f3f898ec9df0b@sentry.io/1774551',
  LOGROCKET: 'opencrvs-foundation/opencrvs-bangladesh',
  ADDRESSES: 1
} as unknown as IApplicationConfigurationModel

describe('applicationHandler', () => {
  let server: any

  beforeEach(async () => {
    mockingoose.resetAll()
    server = await createServer()
    fetch.resetMocks()
  })

  it('get all config using mongoose', async () => {
    mockingoose(ApplicationConfig).toReturn(mockConfig, 'findOne')

    const res = await server.server.inject({
      method: 'GET',
      url: '/config',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    expect(res.statusCode).toBe(200)
  })

  it('get application config using mongoose', async () => {
    mockingoose(ApplicationConfig).toReturn(mockConfig, 'findOne')

    const res = await server.server.inject({
      method: 'GET',
      url: '/loginConfig'
    })
    expect(res.statusCode).toBe(200)
  })

  it('update application config using mongoose', async () => {
    mockConfig.id = '61c4664e663fc6af203b63b8'
    mockingoose(ApplicationConfig).toReturn(mockConfig, 'findOne')
    mockingoose(ApplicationConfig).toReturn(mockConfig, 'update')

    const res = await server.server.inject({
      method: 'POST',
      url: '/updateApplicationConfig',
      payload: {
        APPLICATION_NAME: 'Farajaland CRVS'
      },
      headers: {
        Authorization: `${token}`
      }
    })
    expect(res.statusCode).toBe(201)
  })

  it('return error when tries to save invalid data', async () => {
    mockingoose(ApplicationConfig).toReturn(null, 'findOne')
    mockingoose(ApplicationConfig).toReturn({}, 'update')

    const res = await server.server.inject({
      method: 'POST',
      url: '/getCertificate',
      payload: {
        APPLICATION_NAME: 1234
      },
      headers: {
        Authorization: `${token}`
      }
    })

    expect(res.statusCode).toBe(400)
  })
})
