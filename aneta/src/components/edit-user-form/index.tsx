import React, {useState, useEffect, useRef} from 'react';
import axios from "axios";

import {Wrapper, ImageArea, ProfileImage} from './styles';
import defaultImg from "../../assets/me.jpg";

import Section from "../section";
import Input from '../input';
import Button from '../button';

import {useAPIContext} from "../../contexts/api.context";
import {useUserContext} from "../../contexts/user.context";

interface EditUserFormProps {
  fromOrg?: boolean;
}

const EditUserForms: React.FC<EditUserFormProps> = () => {
  const {REST_API} = useAPIContext();
  const {setLoading, token, id, orgName, email} = useUserContext();
  const initName = useRef<string>();
  const initImage = useRef<string>();

  const [name, setName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>();
  const [password, setPassword] = useState<string>("");

  const btnDisabled = initName.current === name 
  && !password.length 
  && imageUrl === initImage.current;

  const fetchData = () => {
    setLoading!(true);
    axios.post(`${REST_API}/employee/tiny-info`, {id}, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then(({data}) => {
      initName.current = data.name;
      initImage.current = data.profile_picture;
      setName(data.name);
      setImageUrl(data.profile_picture);
      setLoading!(false);
    }).catch(() => setLoading!(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getImageUrl = () => {
    const url = window.prompt("URL of image: ");
    if (!url?.length) return;
    setImageUrl(url);
  };

  const updateProfile = () => {
    if (btnDisabled) return;
    if (!name.length) return window.alert("Fields empty");
    const requestBody = {name, imageUrl, password, orgName, email};
      setLoading!(true);
      axios.put(`${REST_API}/employee/update`, {...requestBody}, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(() => {
        setLoading!(false);
        window.alert("Profile updated");
        fetchData();
      })
      .catch(() => setLoading!(false));
  };

  return (
    <div>
      <Section name="Personal" />
      <Wrapper>
        <Input label="Name" name="Name" value={name} setValue={setName} />
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

export default EditUserForms;
