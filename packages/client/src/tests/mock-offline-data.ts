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
import { readFileSync } from 'fs'
import { join } from 'path'

export const validImageB64String =
  'iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAZ25vbWUtc2NyZWVuc2hvdO8Dvz4AAAAXSURBVAiZY1RWVv7PgAcw4ZNkYGBgAABYyAFsic1CfAAAAABJRU5ErkJggg=='

export const mockOfflineData = {
  forms: JSON.parse(
    readFileSync(join(__dirname, './register.json')).toString()
  ) as any,
  facilities: {
    '627fc0cc-e0e2-4c09-804d-38a9fa1807ee': {
      id: '627fc0cc-e0e2-4c09-804d-38a9fa1807ee',
      name: 'Shaheed Taj Uddin Ahmad Medical College',
      alias: 'শহীদ তাজউদ্দিন আহমেদ মেডিকেল কলেজ হাসপাতাল',
      physicalType: 'Building',
      type: 'HEALTH_FACILITY',
      partOf: 'Location/3a5358d0-1bcd-4ea9-b0b7-7cfb7cbcbf0f'
    },
    'ae5b4462-d1b2-4b22-b289-a66f912dce73': {
      id: 'ae5b4462-d1b2-4b22-b289-a66f912dce73',
      name: 'Kaliganj Union Sub Center',
      alias: 'কালীগঞ্জ ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র',
      physicalType: 'Building',
      type: 'HEALTH_FACILITY',
      partOf: 'Location/50c5a9c4-3cc1-4c8c-9a1b-a37ddaf85987'
    },
    '6abbb7b8-d02e-41cf-8a3e-5039776c1eb0': {
      id: '6abbb7b8-d02e-41cf-8a3e-5039776c1eb0',
      name: 'Kaliganj Upazila Health Complex',
      alias: 'কালীগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স',
      physicalType: 'Building',
      type: 'HEALTH_FACILITY',
      partOf: 'Location/50c5a9c4-3cc1-4c8c-9a1b-a37ddaf85987'
    },
    '0d8474da-0361-4d32-979e-af91f020309e': {
      id: '0d8474da-0361-4d32-979e-af91f020309e',
      name: 'Dholashadhukhan Cc',
      alias: 'ধলাশাধুখান সিসি - কালিগঞ্জ',
      physicalType: 'Building',
      type: 'HEALTH_FACILITY',
      partOf: 'Location/50c5a9c4-3cc1-4c8c-9a1b-a37ddaf85987'
    }
  },
  offices: {
    '0d8474da-0361-4d32-979e-af91f012340a': {
      id: '0d8474da-0361-4d32-979e-af91f012340a',
      name: 'Moktarpur Union Parishad',
      alias: 'মোক্তারপুর ইউনিয়ন পরিষদ',
      physicalType: 'Building',
      type: 'CRVS_OFFICE',
      partOf: 'Location/7a18cb4c-38f3-449f-b3dc-508473d485f3'
    }
  },
  locations: {
    '65cf62cb-864c-45e3-9c0d-5c70f0074cb4': {
      id: '65cf62cb-864c-45e3-9c0d-5c70f0074cb4',
      name: 'Barisal',
      alias: 'বরিশাল',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '8cbc862a-b817-4c29-a490-4a8767ff023c': {
      id: '8cbc862a-b817-4c29-a490-4a8767ff023c',
      name: 'Chittagong',
      alias: 'চট্টগ্রাম',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b': {
      id: '6e1f3bce-7bcb-4bf6-8e35-0d9facdf158b',
      name: 'Dhaka',
      alias: 'ঢাকা',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '7304b306-1b0d-4640-b668-5bf39bc78f48': {
      id: '7304b306-1b0d-4640-b668-5bf39bc78f48',
      name: 'Khulna',
      alias: 'খুলনা',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '75fdf3dc-0dd2-4b65-9c59-3afe5f49fc3a': {
      id: '75fdf3dc-0dd2-4b65-9c59-3afe5f49fc3a',
      name: 'Rajshahi',
      alias: 'রাজশাহী',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '2b55d13f-f700-4373-8255-c0febd4733b6': {
      id: '2b55d13f-f700-4373-8255-c0febd4733b6',
      name: 'Rangpur',
      alias: 'রংপুর',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '59f7f044-84b8-4a6c-955d-271aa3e5af46': {
      id: '59f7f044-84b8-4a6c-955d-271aa3e5af46',
      name: 'Sylhet',
      alias: 'সিলেট',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    '237f3404-d417-41fe-9130-3d049800a1e5': {
      id: '237f3404-d417-41fe-9130-3d049800a1e5',
      name: 'Mymensingh',
      alias: 'ময়মনসিংহ',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DIVISION',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/0'
    },
    'bc4b9f99-0db3-4815-926d-89fd56889407': {
      id: 'bc4b9f99-0db3-4815-926d-89fd56889407',
      name: 'BARGUNA',
      alias: 'বরগুনা',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    'dabffdf7-c174-4450-b306-5a3c2c0e2c0e': {
      id: 'dabffdf7-c174-4450-b306-5a3c2c0e2c0e',
      name: 'BARISAL',
      alias: 'বরিশাল',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    'a5b61fc5-f0c9-4f54-a934-eba18f9110c2': {
      id: 'a5b61fc5-f0c9-4f54-a934-eba18f9110c2',
      name: 'BHOLA',
      alias: 'ভোলা',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    '5ffa5780-5ddf-4549-a391-7ad3ba2334d4': {
      id: '5ffa5780-5ddf-4549-a391-7ad3ba2334d4',
      name: 'JHALOKATI',
      alias: 'ঝালকাঠি',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    'c8dcf1fe-bf92-404b-81c0-31d6802a1a68': {
      id: 'c8dcf1fe-bf92-404b-81c0-31d6802a1a68',
      name: 'PATUAKHALI',
      alias: 'পটুয়াখালী ',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    '9c86160a-f704-464a-8b7d-9eae2b4cf1f9': {
      id: '9c86160a-f704-464a-8b7d-9eae2b4cf1f9',
      name: 'PIROJPUR',
      alias: 'পিরোজপুর ',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/65cf62cb-864c-45e3-9c0d-5c70f0074cb4'
    },
    '1846f07e-6f5c-4507-b5d6-126716b0856b': {
      id: '1846f07e-6f5c-4507-b5d6-126716b0856b',
      name: 'BANDARBAN',
      alias: 'বান্দরবান',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    'cf141982-36a1-4308-9090-0445c311f5ae': {
      id: 'cf141982-36a1-4308-9090-0445c311f5ae',
      name: 'BRAHMANBARIA',
      alias: 'ব্রাহ্মণবাড়িয়া',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    '478f518e-8d86-439d-8618-5cfa8d3bf5dd': {
      id: '478f518e-8d86-439d-8618-5cfa8d3bf5dd',
      name: 'CHANDPUR',
      alias: 'চাঁদপুর',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    'db5faba3-8143-4924-a44a-8562ed5e0437': {
      id: 'db5faba3-8143-4924-a44a-8562ed5e0437',
      name: 'CHITTAGONG',
      alias: 'চট্টগ্রাম',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    '5926982b-845c-4463-80aa-cbfb86762e0a': {
      id: '5926982b-845c-4463-80aa-cbfb86762e0a',
      name: 'COMILLA',
      alias: 'কুমিল্লা',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    'a3455e64-164c-4bf4-b834-16640a85efd8': {
      id: 'a3455e64-164c-4bf4-b834-16640a85efd8',
      name: "COX'S BAZAR",
      alias: 'কক্সবাজার ',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    '1dfc716a-c5f7-4d39-ad71-71d2a359210c': {
      id: '1dfc716a-c5f7-4d39-ad71-71d2a359210c',
      name: 'FENI',
      alias: 'ফেনী',
      physicalType: 'Jurisdiction',
      jurisdictionType: 'DISTRICT',
      type: 'ADMIN_STRUCTURE',
      partOf: 'Location/8cbc862a-b817-4c29-a490-4a8767ff023c'
    },
    'bfe8306c-0910-48fe-8bf5-0db906cf3155': {
      alias: 'বানিয়াজান',
      id: 'bfe8306c-0910-48fe-8bf5-0db906cf3155',
      jurisdictionType: 'UNION',
      name: 'Baniajan',
      partOf: 'Location/8f1aae72-2f90-4585-b853-e8c37f4be764',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    },
    'd3cef1d4-6187-4f0e-a024-61abd3fce9d4': {
      alias: 'দুওজ',
      id: 'd3cef1d4-6187-4f0e-a024-61abd3fce9d4',
      jurisdictionType: 'UNION',
      name: 'Duaz',
      partOf: 'Location/8f1aae72-2f90-4585-b853-e8c37f4be764',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    },
    '473ed705-13e8-4ec1-9836-69bc269f7fad': {
      alias: '',
      id: '473ed705-13e8-4ec1-9836-69bc269f7fad',
      jurisdictionType: 'STATE',
      name: 'Lusaka',
      partOf: 'Location/0',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    },
    '81317429-1d89-42ac-8abc-7a92f268273c': {
      alias: '',
      id: '81317429-1d89-42ac-8abc-7a92f268273c',
      jurisdictionType: 'DISTRICT',
      name: 'Lusaka',
      partOf: 'Location/473ed705-13e8-4ec1-9836-69bc269f7fad',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    }
  },
  pilotLocations: {
    'bfe8306c-0910-48fe-8bf5-0db906cf3155': {
      alias: 'বানিয়াজান',
      id: 'bfe8306c-0910-48fe-8bf5-0db906cf3155',
      jurisdictionType: 'UNION',
      name: 'Baniajan',
      partOf: 'Location/8f1aae72-2f90-4585-b853-e8c37f4be764',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    },
    'd3cef1d4-6187-4f0e-a024-61abd3fce9d4': {
      alias: 'দুওজ',
      id: 'd3cef1d4-6187-4f0e-a024-61abd3fce9d4',
      jurisdictionType: 'UNION',
      name: 'Duaz',
      partOf: 'Location/8f1aae72-2f90-4585-b853-e8c37f4be764',
      physicalType: 'Jurisdiction',
      type: 'ADMIN_STRUCTURE'
    }
  },
  languages: JSON.parse(
    readFileSync(join(__dirname, './languages.json')).toString()
  ).data,
  templates: JSON.parse(
    readFileSync(join(__dirname, './templates.json')).toString()
  ),
  assets: {
    logo: `data:image;base64,${validImageB64String}`
  },
  config: {
    APPLICATION_NAME: 'Farajaland CRVS',
    COUNTRY_LOGO_RENDER_WIDTH: 104,
    COUNTRY_LOGO_RENDER_HEIGHT: 104,
    DESKTOP_TIME_OUT_MILLISECONDS: 900000,
    HEALTH_FACILITY_FILTER: 'DISTRICT',
    LANGUAGES: 'en,bn',
    CERTIFICATE_PRINT_CHARGE_FREE_PERIOD: 36500,
    CERTIFICATE_PRINT_CHARGE_UP_LIMIT: 36500,
    CERTIFICATE_PRINT_LOWEST_CHARGE: 0,
    CERTIFICATE_PRINT_HIGHEST_CHARGE: 0,
    UI_POLLING_INTERVAL: 5000,
    FIELD_AGENT_AUDIT_LOCATIONS:
      'WARD,UNION,CITY_CORPORATION,MUNICIPALITY,UPAZILA',
    APPLICATION_AUDIT_LOCATIONS: 'WARD,UNION',
    INFORMANT_MINIMUM_AGE: 16,
    HIDE_EVENT_REGISTER_INFORMATION: false,
    EXTERNAL_VALIDATION_WORKQUEUE: true,
    _id: '61a8c105c04ac94fe46ceb27',
    BACKGROUND_SYNC_BROADCAST_CHANNEL: 'backgroundSynBroadCastChannel',
    COUNTRY: 'bgd',
    COUNTRY_LOGO_FILE: 'logo.png',
    PHONE_NUMBER_PATTERN: {
      pattern: /^01[1-9][0-9]{8}$/,
      example: '01741234567',
      start: '01',
      num: '11',
      mask: {
        startForm: 5,
        endBefore: 3
      }
    },
    BIRTH_REGISTRATION_TARGET: 45,
    DEATH_REGISTRATION_TARGET: 45,
    NID_NUMBER_PATTERN: /^[0-9]{9}$/,
    SENTRY: 'https://sentry.com',
    LOGROCKET: 'opencrvs-foundation/opencrvs-zambia'
  }
}
