import React, {useState, useLayoutEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import {
  HomePageContainer,
  FormContainer,
  LeftContainer,
  FirstText,
  SecondText,
  RightContainer,
  CaptionText,
} from "../home/styles";

import UserFormLogin from "../../components/user-login-form";
import UserFormCreate from "../../components/user-create-form";
import SwitchForm from "../../components/switch-form";
import ErrorPage from '../error';

import {useSwitchContext} from "../../contexts/switch.context";
import {useUserContext} from '../../contexts/user.context';
import {useAPIContext} from '../../contexts/api.context';

interface UserHomeProps {}

const UserHomePage: React.FC<UserHomeProps> = () => {
    const {isLogin} = useSwitchContext();
    const {setLoading} = useUserContext();
    const {REST_API} = useAPIContext();
    const params = useParams();
    const [found, setFound] = useState<boolean>(false);

    useLayoutEffect(() => {
      setLoading!(true);
      axios.post(`${REST_API}/organisation/check`, {orgName: params.orgName})
      .then(({data}) => {
        setLoading!(false);
        setFound(data.found);
      }).catch(() => setLoading!(false));
    }, [params.orgName]);

    if (!found) return <ErrorPage />;

    return (
      <HomePageContainer>
        <FormContainer>
          <LeftContainer>
            <div>
              <FirstText>A</FirstText>
              <SecondText>neta</SecondText>
            </div>
            <CaptionText>for</CaptionText>
            <CaptionText>{params.orgName}</CaptionText>
          </LeftContainer>
          <RightContainer>
            <SwitchForm />
            {!isLogin ? <UserFormCreate /> : <UserFormLogin />}
          </RightContainer>
        </FormContainer>
      </HomePageContainer>
    );
};

export default UserHomePage;
