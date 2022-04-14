import React, {useState, useEffect} from 'react';
import axios from 'axios';

import {Container, Wrapper, Circle} from './styles';
import {NameText, EmailText} from '../simple-profile/styles';

import {useAPIContext} from '../../contexts/api.context';
import {useOrganisationContext} from '../../contexts/organisation.context';
import {useRescourcesContext} from '../../contexts/resources.context';

interface ResourceProps {
  id: string;
  isCandidate?: boolean;
}

const Resource: React.FC<ResourceProps> = ({id, isCandidate}) => {
    const {token} = useOrganisationContext();
    const {setCurrResource} = useRescourcesContext();
    const {REST_API} = useAPIContext();
    const [name, setName] = useState<string>('-------');
    const [role, setRole] = useState<string>('-------');
    const [request, setRequest] = useState<boolean>(false);

    useEffect(() => {
      axios.post(`${REST_API}/employee/for-resource`, {id}, {
        headers: {Authorization: `Bearer ${token}`}
      }).then(({data}) => {
        setName(data.name);
        setRole(data.role);
        setRequest(data.request);
      }).catch(() => {});
    }, [id]);

    return (
      <Container onClick={() => setCurrResource!(id)}>
        <Wrapper>
          <NameText>{name}</NameText>
          <EmailText>{role}</EmailText>
        </Wrapper>
        {request && <Circle hidden={isCandidate as boolean}>1</Circle>}
      </Container>
    );
};

export default Resource;
