import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useParams} from 'react-router-dom';
import axios from "axios";
import {io} from "socket.io-client";

import {RightEnd} from '../../pages/home/styles';
import {useAPIContext} from '../../contexts/api.context';
import {useUserContext} from "../../contexts/user.context";

import Input from "../input";
import Select from "../select";

export const RightMid = styled.div`
  display: flex;
  padding: 0.84rem;
  flex-direction: column;
`;

interface OrgFormProps {}

const UserFormCreate: React.FC<OrgFormProps> = () => {
  const params = useParams();
  const {REST_API, SOCKET} = useAPIContext();
  const {setLoading} = useUserContext();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("Developer");
  const [password, setPassword] = useState<string>("");
  const [ws, setWs] = useState<any>();

  useEffect(() => {
    setWs(io(SOCKET));
  }, []);

  const handleCreate = () => {
    if (!name.length || !email.length || !password.length || !role.length)
      return window.alert("Field empty");
    setLoading!(true);
    const requestBody = {
      orgName: params.orgName,
      name, email, role, password
    };
    axios.post(`${REST_API}/employee/create`, requestBody)
    .then(() => {
      setLoading!(false);
      ws?.emit("createAcc", params.orgName);
      window.alert("Account created successfully");
      setName('');
      setEmail('');
      setRole("Developer");
      setPassword('');
    })
    .catch(err => {
      setLoading!(false);
      window.alert(err.response.data);
    });
  };

  return (
    <>
      <RightMid>
        <Input label="Name" name="name" value={name} setValue={setName} />
        <Input label="Email" name="email" value={email} setValue={setEmail} />
        <Select value={role} setValue={setRole} />
        <Input
          label="Password"
          isPass
          name="password"
          value={password}
          setValue={setPassword}
        />
      </RightMid>
      <RightEnd onClick={handleCreate}>Create</RightEnd>
    </>
  );
};

export default UserFormCreate;
