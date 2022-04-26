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
import { Header } from '@client/components/interface/Header/Header'
import { CircleButton } from '@opencrvs/components/lib/buttons'
import { BackArrowDeepBlue } from '@opencrvs/components/lib/icons'
import { BodyContent, Container } from '@opencrvs/components/lib/layout'
import { LoadingGrey } from '@opencrvs/components/lib/interface'
import * as React from 'react'
import styled from 'styled-components'
import { Navigation } from '@client/components/interface/Navigation'

const DynamicContainer = styled.div<{
  marginLeft?: number
  marginRight?: number
  fixedWidth?: number
}>`
  margin-right: ${({ marginRight }) => (marginRight ? `${marginRight}px` : 0)};
  margin-left: ${({ marginLeft }) => (marginLeft ? `${marginLeft}px` : 0)};
  ${({ fixedWidth }) =>
    fixedWidth ? `width: ${fixedWidth}px;` : `width: 100%`}
`

interface IprofilePageStyle {
  paddingTopMd: number
  horizontalPaddingMd: number
}

const Content = styled(BodyContent)<{
  profilePageStyle?: IprofilePageStyle
}>`
  padding: 0px 24px;
  margin: 0 auto;
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.lg}px) {
    padding: 0px 16px;

    ${({ profilePageStyle }) =>
      profilePageStyle &&
      `
      margin: ${profilePageStyle.paddingTopMd}px auto ${0};
      padding: ${0}px ${profilePageStyle.horizontalPaddingMd}px
    `}
  }
`
const SubPageContent = styled(Content)`
  max-width: 100%;
`
export enum SysAdminPageVariant {
  DEFAULT = 'DEFAULT',
  SUBPAGE = 'SUBPAGE',
  SUBPAGE_CENTERED = 'SUBPAGE_CENTERED'
}

interface BasePage {
  id?: string
  type?: SysAdminPage['type']
  children?: React.ReactNode
  marginLeft?: number
  marginRight?: number
  fixedWidth?: number
  mapPinClickHandler?: () => void
  profilePageStyle?: IprofilePageStyle
  subMenuComponent?: React.ReactNode
  isCertificatesConfigPage?: boolean
}

interface DefaultPage extends BasePage {
  type?: typeof SysAdminPageVariant.DEFAULT
}

interface HeaderProps {
  id?: string
  headerTitle?: string
  loadingHeader?: boolean
  backActionHandler: () => void
  toolbarComponent?: React.ReactNode
  menuComponent?: React.ReactNode
}

interface SubPage extends BasePage, HeaderProps {
  type: any
}

type SysAdminPage = DefaultPage | SubPage

function isSubPage(page: SysAdminPage): page is SubPage {
  return page.type === SysAdminPageVariant.SUBPAGE
}

function isSubPageCentered(page: SysAdminPage): page is SubPage {
  return page.type === SysAdminPageVariant.SUBPAGE_CENTERED
}

const SubPageHeaderContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.copy};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey300};
`
const SubPageHeaderBody = styled.div`
  display: flex;
  align-items: center;
  max-height: 56px;
  padding: 16px;
  ${({ theme }) => theme.fonts.bold16}
  text-overflow: ellipsis;
  & > :first-child {
    margin-right: 8px;
  }
  & > #menuOptionsHolder {
    margin-left: auto;
    padding-right: 10px;
    @media (max-width: ${({ theme }) => theme.grid.breakpoints.md}px) {
      padding-right: 0px;
    }
  }
`
const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 24px;
  padding: 0 40px 16px 40px;

  @media (max-width: ${({ theme }) => theme.grid.breakpoints.md}px) {
    margin: 0 -16px;
  }
`
const HeaderMenuContainer = styled.div`
  ${({ theme }) => theme.fonts.reg16};
  justify-content: space-between;
`

const HeaderText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const BodyContainer = styled.div`
  margin-left: 0px;
  @media (min-width: ${({ theme }) => theme.grid.breakpoints.lg}px) {
    margin-left: 249px;
  }
`

function SubPageHeader(props: HeaderProps) {
  return (
    <SubPageHeaderContainer id="sub-page-header">
      <SubPageHeaderBody>
        <CircleButton
          id={`${props.id}-action-back`}
          onClick={props.backActionHandler}
        >
          <BackArrowDeepBlue />
        </CircleButton>
        {(props.loadingHeader && <LoadingGrey width={20} />) || (
          <HeaderText id={`${props.id}-header`}>
            {props.headerTitle || ''}
          </HeaderText>
        )}
        {props.menuComponent && (
          <HeaderMenuContainer id="menuOptionsHolder">
            {props.menuComponent}
          </HeaderMenuContainer>
        )}
      </SubPageHeaderBody>
      {props.toolbarComponent && (
        <ToolbarContainer>{props.toolbarComponent}</ToolbarContainer>
      )}
    </SubPageHeaderContainer>
  )
}

export function SysAdminContentWrapper(props: SysAdminPage) {
  let pageHeader: JSX.Element
  let pageContent: JSX.Element
  if (isSubPage(props)) {
    pageHeader = (
      <SubPageHeader
        id={props.id}
        headerTitle={props.headerTitle}
        loadingHeader={props.loadingHeader}
        backActionHandler={props.backActionHandler}
        toolbarComponent={props.toolbarComponent}
        menuComponent={props.menuComponent}
      />
    )

    pageContent = <SubPageContent>{props.children}</SubPageContent>
  } else if (isSubPageCentered(props)) {
    pageHeader = (
      <SubPageHeader
        id={props.id}
        headerTitle={props.headerTitle}
        loadingHeader={props.loadingHeader}
        backActionHandler={props.backActionHandler}
        toolbarComponent={props.toolbarComponent}
        menuComponent={props.menuComponent}
      />
    )
    pageContent = (
      <DynamicContainer
        marginLeft={props.marginLeft}
        marginRight={props.marginRight}
        fixedWidth={props.fixedWidth}
      >
        <Content profilePageStyle={props.profilePageStyle}>
          {props.children}
        </Content>
      </DynamicContainer>
    )
  } else {
    pageHeader = <Header mapPinClickHandler={props.mapPinClickHandler} />
    pageContent = (
      <>
        <Navigation />
        <BodyContainer>
          <DynamicContainer
            marginLeft={props.marginLeft}
            marginRight={props.marginRight}
            fixedWidth={props.fixedWidth}
          >
            <Content>{props.children}</Content>
          </DynamicContainer>
        </BodyContainer>
      </>
    )
  }

  return (
    <Container isCertificatesConfigPage={props.isCertificatesConfigPage}>
      {pageHeader}
      {props.subMenuComponent && props.subMenuComponent}
      {pageContent}
    </Container>
  )
}
