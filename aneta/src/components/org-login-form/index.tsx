import React, {useState} from 'react';
import styled from "styled-components";
import axios from "axios";
import {io} from "socket.io-client";

import {RightEnd} from '../../pages/home/styles';
import {useAPIContext} from '../../contexts/api.context';
import {useOrganisationContext} from '../../contexts/organisation.context';
import {useSocketContext} from '../../contexts/socket.context';

import Input from '../input';

export const RightMid = styled.div`
  display: flex;
  padding: 0.84rem;
  flex-direction: column;
`;

interface OrgFormProps {}

const OrganisationFormLogin: React.FC<OrgFormProps> = () => {
  const {REST_API, SOCKET} = useAPIContext();
  const {setId, setToken, setOrgName, setLoading} = useOrganisationContext();
  const {setSocket} = useSocketContext();
  const [orgName, setOrgname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const handleLogin = () => {
    if (!orgName.length || !password.length)
      return window.alert("Field empty");
    setLoading!(true);
    const formBody = {
      orgName,
      password
    };
    axios.post(`${REST_API}/auth/org-login`, formBody)
    .then(({data}) => {
      setLoading!(false);
      setId!(data.id);
      setToken!(data.token);
      setOrgName!(data.orgName);
      setSocket!(io(SOCKET, {query: {userId: data.id}}));
    })
    .catch(err => {
      setLoading!(false);
      window.alert(JSON.stringify(err.response.data));
    });
  };

  return (
    <>
      <RightMid>
        <Input label="Organisation Name" name="orgName" value={orgName} setValue={setOrgname} />
        <Input label="Password" isPass name="password" value={password} setValue={setPassword} />
      </RightMid>
      <RightEnd onClick={handleLogin}>Login</RightEnd>
    </>
  );
};

export default OrganisationFormLogin;
