import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {ImageArea, ProfileImage} from '../edit-user-form/styles';
import defaultImg from '../../assets/me.jpg';

import Section from "../section";
import Input from '../input';
import Button from '../button';

import {useAPIContext} from '../../contexts/api.context';
import {useOrganisationContext} from '../../contexts/organisation.context';

const Wrapper = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  width: 50%;
  gap: 0.5rem;
`;

interface EditOrgFormProps {}

const EditOrgForms: React.FC<EditOrgFormProps> = () => {
    const {REST_API} = useAPIContext();
    const {setLoading, token, orgName} = useOrganisationContext();
    const navigate = useNavigate();
    const initName = useRef<string>();
    const initEmail = useRef<string>();
    const initImage = useRef<string>();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const btnDisabled = initName.current === name 
    && initEmail.current === email 
    && !password.length 
    && (imageUrl === initImage.current);
    
    useEffect(() => {
      setLoading!(true);
      axios.post(`${REST_API}/organisation/tiny-info`, {orgName}, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(({data}) => {
        initName.current = data.name;
        initEmail.current = data.email;
        initImage.current = data.profilePicture;
        setName(data.name);
        setEmail(data.email);
        setImageUrl(data.profilePicture);
        setLoading!(false);
      }).catch(() => setLoading!(false));
    }, []);

    const getImageUrl = () => {
      const url = window.prompt("URL of image: ");
      if (!url?.length) return;
      setImageUrl(url);
    };

    const updateProfile = () => {
      if (btnDisabled) return;
      if (!name.length || !email.length) return window.alert("Fields empty");
      const requestBody = {name, email, imageUrl, orgName, password};
      setLoading!(true);
      axios.put(`${REST_API}/organisation/update`, {...requestBody}, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(() => {
        setLoading!(false);
        window.alert("Profile updated");
        navigate(`../organisation/${orgName}/dashboard`);
      })
      .catch(() => setLoading!(false));
    };
    
    return (
      <div>
        <Section name="Organisation" />
        <Wrapper>
          <Input label="Name" name="Name" value={name} setValue={setName} />
          <Input label="Email" name="Email" value={email} setValue={setEmail} />
          <Input
            label="Password"
            name="Password"
            value={password}
            setValue={setPassword}
            isPass
          />
          <ImageArea>
            <Button
              variant={4}
              text="Change profile picture"
              disabled={false}
              onPress={getImageUrl}
            />
            <ProfileImage src={imageUrl?.length ? imageUrl : defaultImg} />
          </ImageArea>
          <Button
            variant={2}
            text="UPDATE"
            disabled={btnDisabled}
            onPress={updateProfile}
          />
        </Wrapper>
      </div>
    );
};

export default EditOrgForms;
