import React, {useState} from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import axios from "axios";
import {io} from "socket.io-client";

import {RightEnd} from '../../pages/home/styles';

import Input from "../input";
import {useAPIContext} from "../../contexts/api.context";
import {useUserContext} from "../../contexts/user.context";
import {useSocketContext} from "../../contexts/socket.context";

export const RightMid = styled.div`
  display: flex;
  padding: 0.84rem;
  flex-direction: column;
`;

interface OrgFormProps {}

const UserFormLogin: React.FC<OrgFormProps> = () => {
  const {REST_API, SOCKET} = useAPIContext();
  const {setId, setToken, setOrgName, setLoading, setEmail: se} = useUserContext();
  const {setSocket} = useSocketContext();
  const params = useParams();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (!email.length || !password.length) 
      return window.alert("Field empty");
    setLoading!(true);
    const formBody = {
      orgName: params.orgName,
      email, password
    };
    axios.post(`${REST_API}/auth/emp-login`, formBody)
    .then(({data}) => {
      setLoading!(false);
      setId!(data.id);
      setToken!(data.token);
      setOrgName!(data.orgName);
      se!(data.email);
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
        <Input label="Email" name="email" value={email} setValue={setEmail} />
        <Input
          label="Password"
          isPass
          name="password"
          value={password}
          setValue={setPassword}
        />
      </RightMid>
      <RightEnd onClick={handleLogin}>Login</RightEnd>
    </>
  );
};

export default UserFormLogin;
