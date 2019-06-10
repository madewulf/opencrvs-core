import { group, check } from 'k6'
import { post } from 'k6/http'
import genReg from './gen-registration.js'
import { API_URL } from './constants.js'
import { fetchToken, chooseElementUsingRate } from './utils.js'

export const options = {
  vus: 10,
  duration: '30s'
}

export function setup() {
  return {
    // users are assigned to locations so these rates affect which location is used
    tokens: [
      { rate: 0.25, token: fetchToken('+8801733333333', 'test') },
      { rate: 0.4, token: fetchToken('+8801722038795', 'test') },
      { rate: 0.35, token: fetchToken('+8801712142796', 'test') }
    ]
  }
}

export default data => {
  group('Birth Registration', () => {
    const chosenToken = chooseElementUsingRate(data.tokens)
    const reg = genReg({ femaleRate: 0.45 })
    const res = post(API_URL, JSON.stringify(reg), {
      headers: {
        'Content-Type': 'application/fhir+json',
        Authorization: `Bearer ${chosenToken.token}`
      }
    })
    check(res, {
      'is status 200': r => r.status === 200
    })
  })
}