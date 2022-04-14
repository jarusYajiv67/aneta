import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {Footer, TitleText} from './styles';

import {Container, Wrapper, CloseIcon} from '../resource-overview/styles';
import Input from '../input';
import Button from '../button';

import {useAPIContext} from '../../contexts/api.context';
import {useOrganisationContext} from '../../contexts/organisation.context';

interface ProjectFormProps {
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({onClose}) => {
  const {REST_API} = useAPIContext();
  const navigate = useNavigate();
  const {setLoading, token, orgName} = useOrganisationContext();
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');

  const onCreate = () => {
    if (!name.length || !desc.length) 
      return window.alert("Fields empty");
    setLoading!(true);
    const reqBody = {
      orgName,
      projName: name,
      projDesc: desc
    };
    axios.post(`${REST_API}/projects/create`, {...reqBody}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(() => {
      setLoading!(false);
      onClose();
      window.alert("Project created successfully");
      navigate(`../organisation/${orgName}/dashboard`);
    }).catch(err => {
      setLoading!(false);
      window.alert(JSON.stringify(err?.response?.data));
    });
  };

  return (
    <Container>
      <Wrapper>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        <TitleText>New Project</TitleText>
        <Input 
          label="Name" 
          name="Name" 
          value={name} 
          setValue={setName} 
        />
        <Input
          isDesc
          label="Description"
          name="Description"
          value={desc}
          setValue={setDesc}
        />
        <Footer>
          <Button
            text="Create"
            variant={2}
            disabled={false}
            onPress={onCreate}
          />
        </Footer>
      </Wrapper>
    </Container>
  );
};

export default ProjectForm;
