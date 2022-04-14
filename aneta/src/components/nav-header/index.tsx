import React from 'react';
import styled from 'styled-components';

import HorizontalLine from "../horizontal-line";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoText = styled.span`
  font-family: roboto;
  font-size: 2.4rem;
  color: #f0f2f5;
  font-weight: bold;
  text-align: center;
`;

const CaptionText = styled.span`
  font-family: bahnschrift;
  font-size: 1.6rem;
  color: #f0f2f5;
  text-align: center;
  opacity: 0.9;
`;

interface NavHeaderProps {
  orgName?: string;
}

const NavHeader: React.FC<NavHeaderProps> = ({orgName}) => {
    return (
        <HeaderContainer>
            <LogoText>Aneta</LogoText>
            {orgName && <CaptionText>for {orgName}</CaptionText>}
            <HorizontalLine />
        </HeaderContainer>
    );
};

export default NavHeader;
