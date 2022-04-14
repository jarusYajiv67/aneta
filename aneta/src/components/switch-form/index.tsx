import React from 'react';
import styled from 'styled-components';

import {useSwitchContext} from '../../contexts/switch.context';

export const RightTop = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  padding: 3.5px 0px;
`;

export const SwitchText = styled.span<{ active: boolean }>`
  font-family: calibri;
  font-size: 1.8rem;
  opacity: 0.9;
  cursor: pointer;
  ${(props) => props.active && `color: #1877f2;`}
`;

export const VrtclLn = styled.span`
  border-left: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 2rem;
`;

interface SwitchFormProps {}

const SwitchForm: React.FC<SwitchFormProps> = () => {
    const {isLogin, toggleSwitch} = useSwitchContext();
    return (
      <RightTop>
        <SwitchText onClick={() => !isLogin && toggleSwitch!()} active={isLogin}>Login</SwitchText>
        <VrtclLn />
        <SwitchText onClick={() => isLogin && toggleSwitch!()} active={!isLogin}>Create</SwitchText>
      </RightTop>
    );
};

export default SwitchForm;
