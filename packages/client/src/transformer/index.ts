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
import {
  IForm,
  IFormData,
  TransformedData,
  IFormField,
  IFormFieldMapping,
  IFormFieldMutationMapFunction,
  IFormFieldQueryMapFunction,
  IFormSection,
  IFormSectionData
} from '@client/forms'
import {
  getConditionalActionsForField,
  getVisibleSectionGroupsBasedOnConditions
} from '@client/forms/utils'
import { IApplication } from '@client/applications'
import { isEqual } from 'lodash'

const nestedFieldsMapping = (
  transformedData: TransformedData,
  draftData: IFormData,
  sectionId: string,
  fieldDef: IFormField,
  mappingKey: keyof IFormFieldMapping
) => {
  let tempFormField: IFormField
  for (const index in fieldDef.nestedFields) {
    for (const nestedIndex in fieldDef.nestedFields[index]) {
      tempFormField = fieldDef.nestedFields[index][nestedIndex]
      tempFormField &&
        tempFormField.mapping &&
        tempFormField.mapping[mappingKey] &&
        (
          tempFormField.mapping[mappingKey] as
            | IFormFieldMutationMapFunction
            | IFormFieldQueryMapFunction
        )(transformedData, draftData, sectionId, fieldDef, tempFormField)
    }
  }
}
const hasNestedDataChanged = (
  draft: IApplication,
  section: IFormSection,
  field: IFormField
) => {
  const { data, originalData } = draft
  const nestedFieldData = data[section.id][field.name] as IFormData

  const previousNestedFieldData = (originalData as IFormData)[section.id][
    field.name
  ] as IFormData
  if (nestedFieldData.value === previousNestedFieldData.value) {
    Object.keys(nestedFieldData.nestedFields).forEach((key) => {
      if (
        nestedFieldData.nestedFields[key] !==
        previousNestedFieldData.nestedFields[key]
      )
        return true
    })
    return false
  }
  return true
}

const hasFieldChanged = (
  draft: IApplication,
  section: IFormSection,
  field: IFormField
) => {
  const { data, originalData } = draft
  if (!originalData) return false
  if (
    data[section.id][field.name] &&
    (data[section.id][field.name] as IFormData).value
  ) {
    return hasNestedDataChanged(draft, section, field)
  }
  /*
   * data section might have some values as empty string
   * whereas original data section have them as undefined
   */
  if (
    !originalData[section.id][field.name] &&
    data[section.id][field.name] === ''
  ) {
    return false
  }

  if (
    Array.isArray(data[section.id][field.name]) &&
    isEqual(data[section.id][field.name], originalData[section.id][field.name])
  ) {
    return false
  }

  return data[section.id][field.name] !== originalData[section.id][field.name]
}

export const draftToGqlTransformer = (
  formDefinition: IForm,
  application: IApplication,
  draftId?: string
) => {
  const draftData = application.data
  if (!formDefinition.sections) {
    throw new Error('Sections are missing in form definition')
  }
  const transformedData: TransformedData = { createdAt: new Date() }
  const inCompleteFieldList: string[] = []
  formDefinition.sections.forEach((section) => {
    if (!draftData[section.id]) {
      draftData[section.id] = {}
    }
    if (!transformedData[section.id]) {
      transformedData[section.id] = {}
    }
    getVisibleSectionGroupsBasedOnConditions(
      section,
      draftData[section.id],
      draftData
    ).forEach((groupDef) => {
      groupDef.fields.forEach((fieldDef) => {
        const conditionalActions: string[] = getConditionalActionsForField(
          fieldDef,
          draftData[section.id],
          undefined,
          draftData
        )
        if (
          fieldDef.required &&
          !conditionalActions.includes('hide') &&
          !conditionalActions.includes('disable') &&
          (draftData[section.id][fieldDef.name] === undefined ||
            draftData[section.id][fieldDef.name] === '')
        ) {
          /* eslint-disable no-console */
          console.error(
            `Data is missing for a required field: ${fieldDef.name}` +
              `on section ${section.id}`
          )
          /* eslint-enable no-console */
          inCompleteFieldList.push(
            `${section.id}/${groupDef.id}/${fieldDef.name}`
          )
          return
        }
        if (application.originalData) {
          if (hasFieldChanged(application, section, fieldDef)) {
            if (!transformedData.registration) {
              transformedData.registration = {}
            }
            if (!transformedData.registration.correction) {
              transformedData.registration.correction = draftData.registration
                .correction
                ? { ...(draftData.registration.correction as IFormSectionData) }
                : {}
            }
            if (!transformedData.registration.correction.values) {
              transformedData.registration.correction.values = []
            }
            transformedData.registration.correction.values.push({
              section: section.id,
              fieldName: fieldDef.name,
              newValue: draftData[section.id][fieldDef.name].toString(),
              oldValue: (
                application.originalData[section.id][fieldDef.name] || ''
              ).toString()
            })
          }
        }
        if (
          draftData[section.id][fieldDef.name] !== null &&
          draftData[section.id][fieldDef.name] !== undefined &&
          draftData[section.id][fieldDef.name] !== '' &&
          !conditionalActions.includes('hide')
        ) {
          if (fieldDef.mapping && fieldDef.mapping.mutation) {
            fieldDef.mapping.mutation(
              transformedData,
              draftData,
              section.id,
              fieldDef
            )
            nestedFieldsMapping(
              transformedData,
              draftData,
              section.id,
              fieldDef,
              'mutation'
            )
          } else {
            transformedData[section.id][fieldDef.name] =
              draftData[section.id][fieldDef.name]
          }
        }
      })
    })
    if (draftData[section.id]._fhirID) {
      transformedData[section.id]._fhirID = draftData[section.id]._fhirID
    }
    if (section.mapping && section.mapping.mutation) {
      section.mapping.mutation(transformedData, draftData, section.id)
    }
    if (
      transformedData[section.id] &&
      Object.keys(transformedData[section.id]).length < 1
    ) {
      delete transformedData[section.id]
    }
  })
  if (draftData._fhirIDMap) {
    transformedData._fhirIDMap = draftData._fhirIDMap
  }
  if (inCompleteFieldList && inCompleteFieldList.length > 0) {
    if (transformedData.registration) {
      transformedData.registration.inCompleteFields =
        inCompleteFieldList.join(',')
    } else {
      transformedData.registration = {
        inCompleteFields: inCompleteFieldList.join(',')
      }
    }
  }
  if (draftId) {
    if (transformedData.registration) {
      transformedData.registration.draftId = draftId
    } else {
      transformedData.registration = { draftId }
    }
  }
  return transformedData
}

export const appendGqlMetadataFromDraft = (
  draft: IApplication,
  gqlDetails: TransformedData
) => {
  const { timeLoggedMS } = draft

  if (!gqlDetails.registration.status) {
    gqlDetails.registration.status = []
  }
  if (!gqlDetails.registration.status[0]) {
    gqlDetails.registration.status[0] = {}
  }
  gqlDetails.registration.status[0].timeLoggedMS = timeLoggedMS
}

export const gqlToDraftTransformer = (
  formDefinition: IForm,
  queryData: any
) => {
  if (!formDefinition.sections) {
    throw new Error('Sections are missing in form definition')
  }
  if (!queryData) {
    throw new Error('Provided query data is not valid')
  }
  const transformedData: IFormData = {}

  const visibleSections = formDefinition.sections.filter(
    (section) =>
      getVisibleSectionGroupsBasedOnConditions(
        section,
        queryData[section.id] || {},
        queryData
      ).length > 0
  )

  visibleSections.forEach((section) => {
    transformedData[section.id] = {}
    section.groups.forEach((groupDef) => {
      groupDef.fields.forEach((fieldDef) => {
        if (fieldDef.mapping && fieldDef.mapping.query) {
          fieldDef.mapping.query(
            transformedData,
            queryData,
            section.id,
            fieldDef
          )
          nestedFieldsMapping(
            transformedData,
            queryData,
            section.id,
            fieldDef,
            'query'
          )
        } else if (
          queryData[section.id] &&
          queryData[section.id][fieldDef.name] &&
          queryData[section.id][fieldDef.name] !== ''
        ) {
          transformedData[section.id][fieldDef.name] =
            queryData[section.id][fieldDef.name]
        }
      })
    })
    if (queryData[section.id] && queryData[section.id].id) {
      transformedData[section.id]._fhirID = queryData[section.id].id
    }
    if (section.mapping && section.mapping.query) {
      section.mapping.query(transformedData, queryData, section.id)
    }
    if (
      transformedData[section.id] &&
      Object.keys(transformedData[section.id]).length < 1
    ) {
      delete transformedData[section.id]
    }
  })
  if (queryData._fhirIDMap) {
    transformedData._fhirIDMap = queryData._fhirIDMap
  }
  return transformedData
}
