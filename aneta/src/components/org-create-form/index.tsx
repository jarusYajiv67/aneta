import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";

import {RightEnd} from '../../pages/home/styles';
import {useUserContext} from '../../contexts/user.context';
import {useAPIContext} from '../../contexts/api.context';

import Input from "../input";

export const RightMid = styled.div`
  display: flex;
  padding: 0.84rem;
  flex-direction: column;
`;

const notInOrg: Array<string> = '%&/:?#'.split('');

interface OrgFormProps {}

const OrganisationFormCreate: React.FC<OrgFormProps> = () => {
  const {setLoading} = useUserContext();
  const {REST_API} = useAPIContext();
  const [orgName, setOrgname] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleCreate = () => {
    if (!orgName.length || !name.length || !email.length || !password.length)
      return window.alert("Field empty");
    if (notInOrg.map(v => orgName.includes(v)).includes(true))
      return window.alert("Invalid name for organisation");
    setLoading!(true);
    const formBody = {
      orgName,
      creator: name,
      email,
      password,
    };
    axios.post(`${REST_API}/organisation/create`, formBody)
    .then(() => {
      setLoading!(false);
      setOrgname('');
      setName('');
      setEmail('');
      setPassword('');
      window.alert("Organisation creation success");
    })
    .catch((err) => {
      setLoading!(false);
      const erd = err.response.data;
      if (erd) return window.alert(JSON.stringify(erd));
      return window.alert("Issue in creating account");
    });
  };

  return (
    <>
      <RightMid>
        <Input label="Organisation Name" name="orgName" value={orgName} setValue={setOrgname} />
        <Input label="Name" name="name" value={name} setValue={setName} />
        <Input label="Email" name="email" value={email} setValue={setEmail} />
        <Input label="Password" isPass name="password" value={password} setValue={setPassword} />
      </RightMid>
      <RightEnd onClick={handleCreate}>Create</RightEnd>
    </>
  );
};

export default OrganisationFormCreate;
