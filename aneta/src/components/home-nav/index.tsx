import React from 'react';

import {
  NavContainer,
  BlockContainer,
  Content,
  Wrapper,
  HugeText,
  CloseIcon,
  Title,
  PlansContainer,
  Plan,
  Features,
  NameCost,
} from "./styles";

import Section from '../section';
import {TermsAndConditions, PrivacyAndPolicies} from './data';

interface MiscProps {
  setter: (val: number) => void;
}

export const HomeNav: React.FC<MiscProps> = ({setter}) => {
  return (
    <NavContainer>
      <span onClick={() => setter(2)}>Pricing</span>
      <span onClick={() => setter(1)}>Terms And Policies</span>
    </NavContainer>
  );
};

interface TermsAndPoliciesProps {
  onClose: () => void;
}

export const TermsAndPolicies: React.FC<TermsAndPoliciesProps> = ({onClose}) => {
  return (
    <BlockContainer>
      <Wrapper>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        <Section name="Terms and Conditions" />
        <Content>
          <HugeText>{TermsAndConditions}</HugeText>
        </Content>
        <Section name="Privacy and Policies" />
        <Content>
          <HugeText>{PrivacyAndPolicies}</HugeText>
        </Content>
      </Wrapper>
    </BlockContainer>
  );
};

interface PricingProps {
  onClose: () => void;
}

export const Pricing: React.FC<PricingProps> = ({onClose}) => {
  return (
    <BlockContainer>
      <Wrapper isPricing>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        <Title>Plans</Title>
        <PlansContainer>
          <Plan>
            <NameCost>Micro</NameCost>
            <Features>
              <span>Resources: 100</span>
              <span>Projects: 15</span>
            </Features>
            <NameCost>19$/month</NameCost>
          </Plan>
          <Plan>
            <NameCost>Small</NameCost>
            <Features>
              <span>Resources: 1000</span>
              <span>Projects: 100</span>
            </Features>
            <NameCost>79$/month</NameCost>
          </Plan>
          <Plan>
            <NameCost>Medium</NameCost>
            <Features>
              <span>Resources: 100,000</span>
              <span>Projects: 400</span>
            </Features>
            <NameCost>599$/month</NameCost>
          </Plan>
          <Plan>
            <NameCost>Large</NameCost>
            <Features>
              <span>Resources: 500,000</span>
              <span>Projects: 1000</span>
            </Features>
            <NameCost>2799$/month</NameCost>
          </Plan>
        </PlansContainer>
      </Wrapper>
    </BlockContainer>
  );
};
