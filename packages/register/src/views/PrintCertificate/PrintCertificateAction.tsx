import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import { ActionPage, Box } from '@opencrvs/components/lib/interface'
import { Spinner } from '@opencrvs/components/lib/interface'
import { InjectedIntlProps, injectIntl, defineMessages } from 'react-intl'
import { FormFieldGenerator } from 'src/components/form'
import {
  IFormSection,
  IFormSectionData,
  INFORMATIVE_RADIO_GROUP
} from 'src/forms'

export const ActionPageWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 4;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

const StyledSpinner = styled(Spinner)`
  margin: 50% auto;
`

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-family: ${({ theme }) => theme.fonts.lightFont};
  text-align: center;
  margin-top: 100px;
`
const FormContainer = styled.div`
  padding: 35px 25px;
`

export const FETCH_BIRTH_REGISTRATION_QUERY = gql`
  query data($id: ID!) {
    fetchBirthRegistration(id: $id) {
      id
      mother {
        name {
          firstNames
          familyName
        }
        identifier {
          id
          type
        }
        birthDate
        nationality
      }
      father {
        name {
          firstNames
          familyName
        }
        identifier {
          id
          type
        }
        birthDate
        nationality
      }
      createdAt
    }
  }
`

const messages = defineMessages({
  queryError: {
    id: 'print.certificate.queryError',
    defaultMessage:
      'An error occurred while quering for birth registration data',
    description: 'The error message shown when a query fails'
  }
})

type State = {
  data: IFormSectionData
  isAllQuestionsAnswered: boolean
}

type IProps = {
  backLabel: string
  title: string
  registrationId: string
  togglePrintCertificateSection: () => void
  printCertificateFormSection: IFormSection
}

type IFullProps = InjectedIntlProps & IProps

class PrintCertificateActionComponent extends React.Component<
  IFullProps,
  State
> {
  constructor(props: IFullProps) {
    super(props)
    this.state = {
      isAllQuestionsAnswered: false,
      data: {
        personCollectingCertificate: 'MOTHER'
      }
    }
  }

  storeData = (documentData: IFormSectionData) => {
    this.setState(() => ({ data: documentData }))
  }

  isAllQuestionsAnswered = (
    documentData: IFormSectionData,
    personCollectingCertificate: string
  ): boolean => {
    switch (personCollectingCertificate) {
      case 'MOTHER':
        return documentData.motherDetails !== '' ? true : false
      case 'FATHER':
        return documentData.fatherDetails !== '' ? true : false
      case 'OTHER':
        const {
          otherPersonFamilyName,
          otherPersonGivenNames,
          otherPersonIDType,
          otherPersonSignedAffidavit
        } = documentData
        const allFieldsNotCovered =
          otherPersonFamilyName === '' ||
          otherPersonGivenNames === '' ||
          otherPersonIDType === '' ||
          otherPersonSignedAffidavit === ''
        return allFieldsNotCovered
      default:
        return false
    }
  }

  render = () => {
    const {
      intl,
      title,
      backLabel,
      registrationId,
      togglePrintCertificateSection,
      printCertificateFormSection
    } = this.props
    return (
      <ActionPageWrapper>
        <ActionPage
          title={title}
          backLabel={backLabel}
          goBack={togglePrintCertificateSection}
        >
          <Query
            query={FETCH_BIRTH_REGISTRATION_QUERY}
            variables={{
              id: registrationId
            }}
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <StyledSpinner id="print-certificate-spinner" />
              }

              if (data) {
                let fields = printCertificateFormSection.fields
                fields = fields.map(field => {
                  if (
                    field &&
                    field.type === INFORMATIVE_RADIO_GROUP &&
                    field.name === 'motherDetails'
                  ) {
                    field.information = data.fetchBirthRegistration.mother
                  } else if (
                    field &&
                    field.type === INFORMATIVE_RADIO_GROUP &&
                    field.name === 'fatherDetails'
                  ) {
                    field.information = data.fetchBirthRegistration.father
                  }

                  return field
                })
                return (
                  <FormContainer>
                    <Box>
                      <FormFieldGenerator
                        id={printCertificateFormSection.id}
                        onChange={this.storeData}
                        setAllFieldsDirty={false}
                        fields={printCertificateFormSection.fields}
                      />
                    </Box>
                  </FormContainer>
                )
              }
              if (error) {
                return (
                  <ErrorText id="print-certificate-queue-error-text">
                    {intl.formatMessage(messages.queryError)}
                  </ErrorText>
                )
              }

              return JSON.stringify(data)
            }}
          </Query>
        </ActionPage>
      </ActionPageWrapper>
    )
  }
}

export const PrintCertificateAction = injectIntl<IFullProps>(
  PrintCertificateActionComponent
)
