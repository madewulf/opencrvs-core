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

export const Warning = (props: React.HTMLAttributes<SVGElement>) => {
  const fill = props.color === 'invert' ? '#F1B162' : '#fff'
  return (
    <svg width={24} height={24} fill="none" {...props}>
      <path
        d="M10.5282 2.28312C10.9775 2.03017 11.4844 1.89728 12 1.89728C12.5156 1.89728 13.0225 2.03017 13.4718 2.28312C13.9211 2.53607 14.2976 2.90055 14.565 3.34139L14.5679 3.34614L14.5679 3.34615L23.0379 17.4862L23.046 17.5C23.308 17.9536 23.4466 18.4679 23.448 18.9917C23.4495 19.5156 23.3138 20.0307 23.0544 20.4858C22.795 20.9408 22.4209 21.3201 21.9694 21.5857C21.518 21.8514 21.0048 21.9942 20.481 22L20.47 22.0001V22H3.53002H3.51903L3.51903 22C2.99523 21.9942 2.48206 21.8514 2.03059 21.5857C1.57912 21.3201 1.20507 20.9408 0.94567 20.4858C0.686267 20.0307 0.550547 19.5156 0.552014 18.9917C0.55348 18.4679 0.692083 17.9536 0.95403 17.5L0.962153 17.4862L9.43215 3.34615L10.29 3.86002L9.43502 3.34139C9.70243 2.90055 10.0789 2.53607 10.5282 2.28312ZM11.1462 4.37666L2.68271 18.5058C2.59753 18.6556 2.55249 18.8249 2.55201 18.9973C2.55152 19.172 2.59676 19.3436 2.68322 19.4953C2.76969 19.647 2.89437 19.7735 3.04487 19.862C3.19404 19.9498 3.36342 19.9973 3.53642 20H20.4636C20.6366 19.9973 20.806 19.9498 20.9552 19.862C21.1057 19.7735 21.2303 19.647 21.3168 19.4953C21.4033 19.3436 21.4485 19.172 21.448 18.9973C21.4475 18.8249 21.4025 18.6556 21.3173 18.5058L12.855 4.37865L12.8538 4.37666C12.7647 4.23061 12.6397 4.10983 12.4906 4.02589C12.3409 3.94157 12.1719 3.89728 12 3.89728C11.8282 3.89728 11.6592 3.94157 11.5094 4.02589C11.3603 4.10983 11.2353 4.23061 11.1462 4.37666ZM12 8C12.5523 8 13 8.44772 13 9V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V9C11 8.44772 11.4477 8 12 8ZM12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18H12.01C12.5623 18 13.01 17.5523 13.01 17C13.01 16.4477 12.5623 16 12.01 16H12Z"
        fill={fill}
      />
    </svg>
  )
}
