import React, {useState} from 'react';

import {
  HomePageContainer,
  FormContainer,
  FirstText,
  SecondText,
  LeftContainer,
  RightContainer,
  Slogan,
} from "./styles";

import OrganisationFormLogin from '../../components/org-login-form';
import OrganisationFormCreate from '../../components/org-create-form';
import SwitchForm from "../../components/switch-form";
import {HomeNav, TermsAndPolicies, Pricing} from "../../components/home-nav";

import {useSwitchContext} from "../../contexts/switch.context";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
    const {isLogin} = useSwitchContext();
    const [currOption, setCurrOption] = useState<number>(0);

    const ResetOption = () => setCurrOption(0);
    
    return (
      <HomePageContainer>
        <HomeNav setter={setCurrOption}/>
        {currOption === 1 && <TermsAndPolicies onClose={ResetOption} />}
        {currOption === 2 && <Pricing onClose={ResetOption} />}
        <FormContainer>
          <LeftContainer>
            <div>
              <FirstText>A</FirstText>
              <SecondText>neta</SecondText>
            </div>
            <Slogan>Work from home made simple.</Slogan>
          </LeftContainer>
          <RightContainer>
            <SwitchForm />
            {!isLogin ? <OrganisationFormCreate /> : <OrganisationFormLogin />}
          </RightContainer>
        </FormContainer>
      </HomePageContainer>
    );
};

export default HomePage;
