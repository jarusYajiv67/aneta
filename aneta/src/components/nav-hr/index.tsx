import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

import {Container, Body, Footer} from './styles';

import NavHeader from '../nav-header';
import Option from '../option';
import HorizontalLine from '../horizontal-line';
import SimpleProfile from '../simple-profile';

import {useUserNavContext} from '../../contexts/user-nav.context';
import {useOrganisationContext} from '../../contexts/organisation.context';

export const destinationMapper = [
  "dashboard", 
  "chat",
  "settings",
  "projects",
  "resources",
  "financial",
];

interface NavHrProps {}

const NavHr: React.FC<NavHrProps> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { uni, changeUni } = useUserNavContext();
  const {id: oid} = useOrganisationContext();
  const handleClick = (val: number) => {
    changeUni!(val);
    navigate(`../organisation/${params.orgName}/${destinationMapper[val]}`);
  };
  return (
    <Container>
      <NavHeader orgName={params.orgName} />
      <Body>
        {Array(6).fill(0).map((_, idx) => (
          <span key={idx} onClick={() => handleClick(idx)}>
            <Option fromHr={true} variant={idx} active={uni === idx} />
          </span>
        ))}
      </Body>
      <Footer>
        <HorizontalLine />
        <SimpleProfile variant={1} id={oid} />
      </Footer>
    </Container>
  );
};

export default NavHr;
