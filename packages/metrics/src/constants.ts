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
export const HOST = process.env.METRICS_HOST || '0.0.0.0'
export const PORT = process.env.METRICS_PORT || 1050
export const fhirUrl = process.env.FHIR_URL || 'http://localhost:5001/fhir/'
export const CERT_PUBLIC_KEY_PATH =
  (process.env.CERT_PUBLIC_KEY_PATH as string) ||
  '../../.secrets/public-key.pem'
export const AUTH_URL = process.env.AUTH_URL || 'http://localhost:4040'
export const COUNTRY_CONFIG_URL =
  process.env.COUNTRY_CONFIG_URL || 'http://localhost:3040'
export const USER_MANAGEMENT_URL =
  process.env.USER_MANAGEMENT_URL || 'http://localhost:3030'
export const SENTRY_DSN =
  process.env.SENTRY_DSN ||
  'https://2ed906a0ba1c4de2ae3f3f898ec9df0b@sentry.io/1774551'

// Check if the token has been invalided in the auth service before it has expired
// This needs to be a string to make it easy to pass as an ENV var.
export const CHECK_INVALID_TOKEN = process.env.CHECK_INVALID_TOKEN || 'false'
export const SEARCH_URL = process.env.SEARCH_URL || 'http://localhost:9090/'
export const EXPECTED_BIRTH_REGISTRATION_IN_DAYS =
  process.env.EXPECTED_BIRTH_REGISTRATION_IN_DAYS || 45
export const CONFIG_API_URL =
  process.env.CONFIG_API_URL || 'http://localhost:2021'
export const mockFetchConfig = {
  API_GATEWAY_URL: 'http://localhost:7070/',
  CONFIG_API_URL: 'http://localhost:2021',
  LOGIN_URL: 'http://localhost:3020',
  AUTH_URL: 'http://localhost:4040',
  RESOURCES_URL: 'http://localhost:3040',
  APPLICATION_NAME: 'Farajaland CRVS',
  UI_POLLING_INTERVAL: 5000,
  FIELD_AGENT_AUDIT_LOCATIONS: 'DISTRICT',
  DECLARATION_AUDIT_LOCATIONS: 'DISTRICT',
  INFORMANT_MINIMUM_AGE: 16,
  HIDE_EVENT_REGISTER_INFORMATION: false,
  EXTERNAL_VALIDATION_WORKQUEUE: false,
  PHONE_NUMBER_PATTERN: '/^0(7|9)[0-9]{1}[0-9]{7}$/',
  SENTRY: 'https://f892d643aab642108f44e2d1795706bc@sentry.io/1774604',
  LOGROCKET: 'opencrvs-foundation/opencrvs-zambia',
  NID_NUMBER_PATTERN: '/^[0-9]{9}$/',
  COUNTRY: 'zmb',
  CURRENCY: {
    isoCode: 'ZMW',
    languagesAndCountry: ['en-ZM']
  },
  LANGUAGES: 'en',
  ADDRESSES: 1
}
