import { readFileSync } from 'fs'
import * as jwt from 'jsonwebtoken'
import {
  userMock,
  fieldAgentPractitionerMock,
  fieldAgentPractitionerRoleMock,
  districtMock,
  upazilaMock,
  unionMock,
  officeMock,
  testFhirTaskBundle,
  taskResouceMock
} from '@workflow/test/utils'
import { modifyTaskBundle } from '@workflow/features/task/fhir/fhir-bundle-modifier'
import { cloneDeep } from 'lodash'
import * as fetchAny from 'jest-fetch-mock'

const fetch = fetchAny as any
let token: string
describe('Verify handler', () => {
  beforeEach(() => {
    token = jwt.sign(
      { scope: ['declare'] },
      readFileSync('../auth/test/cert.key'),
      {
        algorithm: 'RS256',
        issuer: 'opencrvs:auth-service',
        audience: 'opencrvs:workflow-user'
      }
    )
  })

  it('modifyTaskBundle returns correct bundle', async () => {
    fetch.mockResponses(
      [taskResouceMock, { status: 200 }],
      [userMock, { status: 200 }],
      [fieldAgentPractitionerMock, { status: 200 }],
      [fieldAgentPractitionerRoleMock, { status: 200 }],
      [districtMock, { status: 200 }],
      [upazilaMock, { status: 200 }],
      [unionMock, { status: 200 }],
      [officeMock, { status: 200 }],
      [fieldAgentPractitionerRoleMock, { status: 200 }],
      [districtMock, { status: 200 }],
      [upazilaMock, { status: 200 }],
      [unionMock, { status: 200 }],
      [officeMock, { status: 200 }]
    )
    const clonedTestFhirTaskBundle = cloneDeep(testFhirTaskBundle)
    clonedTestFhirTaskBundle.entry[0].resource.businessStatus.coding[0].code =
      'REJECTED'
    const payload = await modifyTaskBundle(clonedTestFhirTaskBundle, token)
    if (
      payload &&
      payload.entry &&
      payload.entry[0] &&
      payload.entry[0].resource
    ) {
      const fhirTask = payload.entry[0].resource as fhir.Task
      if (
        fhirTask &&
        fhirTask.note &&
        fhirTask.note[0] &&
        fhirTask.note[0].authorString
      ) {
        expect(fhirTask.note[0].authorString).toEqual(
          'Practitioner/e0daf66b-509e-4f45-86f3-f922b74f3dbf'
        )
      }
    } else {
      throw new Error('Failed')
    }
  })

  it('Throws error if application is already rejected', () => {
    fetch.mockResponses(
      [
        JSON.stringify({
          id: 'ba0412c6-5125-4447-bd32-fb5cf336ddbc',
          businessStatus: {
            coding: [
              {
                system: 'http://opencrvs.org/specs/reg-status',
                code: 'REJECTED'
              }
            ]
          }
        }),
        { status: 200 }
      ],
      [userMock, { status: 200 }],
      [fieldAgentPractitionerMock, { status: 200 }],
      [fieldAgentPractitionerRoleMock, { status: 200 }],
      [districtMock, { status: 200 }],
      [upazilaMock, { status: 200 }],
      [unionMock, { status: 200 }],
      [officeMock, { status: 200 }],
      [fieldAgentPractitionerRoleMock, { status: 200 }],
      [districtMock, { status: 200 }],
      [upazilaMock, { status: 200 }],
      [unionMock, { status: 200 }],
      [officeMock, { status: 200 }]
    )
    expect(modifyTaskBundle(testFhirTaskBundle, token)).rejects.toThrowError()
  })
})
