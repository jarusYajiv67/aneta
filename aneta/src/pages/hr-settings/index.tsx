import React, {useEffect, useState, useLayoutEffect} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom';

import NavHR from "../../components/nav-hr";
import Logout from '../../components/logout';
import EditOrgForms from '../../components/edit-org-form';
import ErrorPage from "../error";

import {useUserNavContext} from "../../contexts/user-nav.context";
import {useOrganisationContext} from "../../contexts/organisation.context";

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 10fr;
`;

const RightContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 7%;
`;

interface HRSettingsPageProps {}

const HRSettingsPage: React.FC<HRSettingsPageProps> = () => {
  const {changeUni} = useUserNavContext();
  const params = useParams();
  const {orgName} = useOrganisationContext();
  const [show, setShow] = useState<boolean | null>();

  useEffect(() => {
    changeUni!(2);
  }, []);

  useLayoutEffect(() => {
    if (params.orgName !== orgName) setShow(false);
    else setShow(true);
  }, [params.orgName, orgName]);

  if (show === false) return <ErrorPage />;

  return (
    <MainContainer>
      <NavHR />
      <Logout />
      <RightContainer>
        <EditOrgForms />
      </RightContainer>
    </MainContainer>
  );
};

export default HRSettingsPage;
