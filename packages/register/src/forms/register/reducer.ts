import { LoopReducer, Loop } from 'redux-loop'
import { IForm, IFormSection } from 'src/forms'
import { defineMessages } from 'react-intl'
import { childSection, IChildSectionFormData } from './child-section'
import { motherSection, IMotherSectionFormData } from './mother-section'
import {
  fatherSection,
  fathersSectionDetails,
  IFatherSectionFormData,
  fathersCurrentAddress,
  fathersPermanentAddress
} from './father-section'
import { getFormFieldIndex, insertFields } from '../utils'
import { pullAll } from 'lodash'

export interface IRegisterFormData {
  child: IChildSectionFormData
  mother: IMotherSectionFormData
  father: IFatherSectionFormData
}

const messages = defineMessages({
  registrationTab: {
    id: 'register.form.tabs.registrationTab',
    defaultMessage: 'Registration',
    description: 'Tab title for Registration'
  },
  registrationTitle: {
    id: 'register.form.section.registrationTitle',
    defaultMessage: 'Registration',
    description: 'Form section title for Registration'
  },
  documentsTab: {
    id: 'register.form.tabs.documentsTab',
    defaultMessage: 'Documents',
    description: 'Tab title for Documents'
  },
  documentsTitle: {
    id: 'register.form.section.documentsTitle',
    defaultMessage: 'Documents',
    description: 'Form section title for Documents'
  },
  previewTab: {
    id: 'register.form.tabs.previewTab',
    defaultMessage: 'Preview',
    description: 'Tab title for Preview'
  },
  previewTitle: {
    id: 'register.form.section.previewTitle',
    defaultMessage: 'Preview',
    description: 'Form section title for Preview'
  }
})

const ADD_FATHERS_DETAILS = 'REGISTER_FORM/ADD_FATHERS_DETAILS'
const REMOVE_FATHERS_DETAILS = 'REGISTER_FORM/REMOVE_FATHERS_DETAILS'

type AddFathersDetailsAction = {
  type: typeof ADD_FATHERS_DETAILS
}

export function addFathersDetails() {
  return { type: ADD_FATHERS_DETAILS }
}

type RemoveFathersDetailsAction = {
  type: typeof REMOVE_FATHERS_DETAILS
}

export function removeFathersDetails() {
  return { type: REMOVE_FATHERS_DETAILS }
}

const ADD_FATHER_CURRENT_ADDRESS = 'REGISTER_FORM/ADD_FATHER_CURRENT_ADDRESS'
const REMOVE_FATHER_CURRENT_ADDRESS =
  'REGISTER_FORM/REMOVE_FATHER_CURRENT_ADDRESS'

type AddFatherCurrentAddress = {
  type: typeof ADD_FATHER_CURRENT_ADDRESS
}

export function addFatherCurrentAddress() {
  return { type: ADD_FATHER_CURRENT_ADDRESS }
}

type RemoveFatherCurrentAddress = {
  type: typeof REMOVE_FATHER_CURRENT_ADDRESS
}

export function removeFatherCurrentAddress() {
  return { type: REMOVE_FATHER_CURRENT_ADDRESS }
}

const ADD_FATHER_PERMANENT_ADDRESS =
  'REGISTER_FORM/ADD_FATHER_PERMANENT_ADDRESS'
const REMOVE_FATHER_PERMANENT_ADDRESS =
  'REGISTER_FORM/REMOVE_FATHER_PERMANENT_ADDRESS'

type AddFatherPermanentAddress = {
  type: typeof ADD_FATHER_PERMANENT_ADDRESS
}

export function addFatherPermanentAddress() {
  return { type: ADD_FATHER_PERMANENT_ADDRESS }
}

type RemoveFatherPermanentAddress = {
  type: typeof REMOVE_FATHER_PERMANENT_ADDRESS
}

export function removeFatherPermanentAddress() {
  return { type: REMOVE_FATHER_PERMANENT_ADDRESS }
}

type Action =
  | AddFathersDetailsAction
  | RemoveFathersDetailsAction
  | AddFatherCurrentAddress
  | RemoveFatherCurrentAddress
  | AddFatherPermanentAddress
  | RemoveFatherPermanentAddress

export type IRegisterFormState = {
  registerForm: IForm
  fathersDetailsAdded: boolean
  fathersCurrentAddressAdded: boolean
  fathersPermanentAddressAdded: boolean
}

export const initialState: IRegisterFormState = {
  registerForm: {
    sections: [
      childSection,
      motherSection,
      fatherSection,
      {
        id: 'registration',
        viewType: 'form',
        name: messages.registrationTab,
        title: messages.registrationTitle,
        fields: []
      },
      {
        id: 'documents',
        viewType: 'form',
        name: messages.documentsTab,
        title: messages.documentsTitle,
        fields: []
      },
      {
        id: 'preview',
        viewType: 'preview',
        name: messages.previewTab,
        title: messages.previewTitle,
        fields: []
      }
    ]
  },
  fathersDetailsAdded: false,
  fathersCurrentAddressAdded: false,
  fathersPermanentAddressAdded: false
}

const getRegisterFormSection = (state: IRegisterFormState, key: string) => {
  return state.registerForm.sections.find(
    (section: IFormSection) => section.id === key
  ) as IFormSection
}

const getRegisterFormSectionIndex = (
  state: IRegisterFormState,
  section: IFormSection
) => {
  return state.registerForm.sections.indexOf(section)
}

const updateSection = (state: IRegisterFormState, section: IFormSection) => {
  return state.registerForm.sections.splice(
    getRegisterFormSectionIndex(state, section),
    1,
    section
  )
}

export const registerFormReducer: LoopReducer<IRegisterFormState, Action> = (
  state: IRegisterFormState = initialState,
  action: Action
): IRegisterFormState | Loop<IRegisterFormState, Action> => {
  const fathersSection = getRegisterFormSection(state, 'father')

  switch (action.type) {
    case ADD_FATHERS_DETAILS:
      if (!state.fathersDetailsAdded) {
        const newState = { ...state, fathersDetailsAdded: true }
        fathersSection.fields = fathersSection.fields.concat(
          fathersSectionDetails
        )
        newState.registerForm.sections = updateSection(newState, fathersSection)
        return newState
      } else {
        return { ...state }
      }
    case REMOVE_FATHERS_DETAILS:
      if (state.fathersDetailsAdded) {
        const newState = { ...state, fathersDetailsAdded: false }
        getRegisterFormSection(newState, 'father').fields.length = 1
        return newState
      } else {
        return { ...state }
      }
    case ADD_FATHER_CURRENT_ADDRESS:
      if (!state.fathersCurrentAddressAdded) {
        const newState = { ...state, fathersCurrentAddressAdded: true }
        const insertPoint =
          getFormFieldIndex(fathersSection.fields, 'addressSameAsMother') + 1
        fathersSection.fields = insertFields(
          fathersSection.fields,
          insertPoint,
          fathersCurrentAddress
        )
        newState.registerForm.sections = updateSection(newState, fathersSection)
        return newState
      } else {
        return { ...state }
      }
    case REMOVE_FATHER_CURRENT_ADDRESS:
      if (state.fathersCurrentAddressAdded) {
        const newState = { ...state, fathersCurrentAddressAdded: false }
        pullAll(fathersSection.fields, fathersCurrentAddress)
        newState.registerForm.sections = updateSection(newState, fathersSection)
        return newState
      } else {
        return { ...state }
      }
    case ADD_FATHER_PERMANENT_ADDRESS:
      if (!state.fathersPermanentAddressAdded) {
        const newState = { ...state, fathersPermanentAddressAdded: true }
        const insertPoint =
          getFormFieldIndex(
            fathersSection.fields,
            'permanentAddressSameAsMother'
          ) + 1
        fathersSection.fields = insertFields(
          fathersSection.fields,
          insertPoint,
          fathersPermanentAddress
        )
        newState.registerForm.sections = updateSection(newState, fathersSection)
        return newState
      } else {
        return { ...state }
      }
    case REMOVE_FATHER_PERMANENT_ADDRESS:
      if (state.fathersPermanentAddressAdded) {
        const newState = { ...state, fathersPermanentAddressAdded: false }
        pullAll(fathersSection.fields, fathersPermanentAddress)
        newState.registerForm.sections = updateSection(newState, fathersSection)
        return newState
      } else {
        return { ...state }
      }
    default:
      return state
  }
}
