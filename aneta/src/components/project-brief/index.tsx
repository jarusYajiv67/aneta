import React, {useEffect, useState, useRef, ChangeEvent} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";

import {Container, Wrapper, CloseIcon} from "../resource-overview/styles";
import {Text, ActionsContainer, DescBox} from './styles';

import Section from '../section';
import Button from '../button';
import JoinedOn from '../joined-on';

import {useProjectsContext} from '../../contexts/projects.context';
import {useAPIContext} from '../../contexts/api.context';
import {useOrganisationContext} from '../../contexts/organisation.context';

interface ProjectBriefProps {}

const ProjectBrief: React.FC<ProjectBriefProps> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {currProject: projId, setCurrProject} = useProjectsContext();
  const {REST_API} = useAPIContext();
  const {setLoading, token, orgName} = useOrganisationContext();
  const [name, setName] = useState<string>('-------');
  const [desc, setDesc] = useState<string>('-------');
  const descRef = useRef<string>("-------");
  const [resc, setResc] = useState<Array<string>>([]);
  const [stat, setStat] = useState<number>(0);

  useEffect(() => {
    if (!projId.length) return;
    setLoading!(true);
    axios.post(`${REST_API}/projects/overview`, {id: projId}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(({data}) => {
      setName(data.name);
      setDesc(data.description);
      descRef.current = data.description;
      setStat(data.status);
      setResc(data.resources || []);
      setLoading!(false);
    }).catch(() => setLoading!(false));
  }, [projId]);

  const onClose = () => setCurrProject!('');
  const handleDesc = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setDesc(event.target.value);

  const updateStatus = (status: number) => {
    if (status === stat) return;
    setLoading!(true);
    const reqBody = {orgName, projName: name, status};
    axios.put(`${REST_API}/projects/set-status`, {...reqBody}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(() => {
      setStat(status);
      setLoading!(false);
      setCurrProject!('');
      navigate(`../organisation/${params.orgName}/dashboard`);
    }).catch(() => setLoading!(false));
  };

  const updateDescription = () => {
    if (descRef.current === desc || !desc.length) return;
    setLoading!(true);
    const reqBody = {orgName, projName: name, desc};
    axios.put(`${REST_API}/projects/set-desc`, {...reqBody}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(() => {
      descRef.current = desc;
      setLoading!(false);
    }).catch(() => setLoading!(false));
  };

  const takeToRescources = () => {
    setCurrProject!('');
    navigate(
      `../organisation/${params.orgName}/resources`, 
      {state: resc}
    );
  };

  const addResource = () => {
    const resourceEmail = window.prompt("Email of resource");
    if (!resourceEmail || !resourceEmail.length) 
      return window.alert("Field empty");
    setLoading!(true);
    const reqBody = {orgName, projName: name, email: resourceEmail};
    axios.put(`${REST_API}/projects/add-emp`, {...reqBody}, {
      headers: {Authorization: `Bearer ${token}`}
    }).then(({data}) => {
      if (!resc.includes(data.id)) {
        setResc([...resc, data.id]);
        window.alert("Resource has been added");
      } else {
        window.alert("Resource already added");
      }
      setLoading!(false);
    }).catch(() => {
      window.alert("Resource doesn't exist");
      setLoading!(false);
    });
  };

  return (
    <Container>
      <Wrapper>
        <CloseIcon onClick={onClose}>X</CloseIcon>
        <Section name="Name" />
        <Text>{name}</Text>
        <Section name="Description" />
        <DescBox 
          value={desc} 
          onChange={handleDesc}
          rows={7}
          cols={84}
        />
        <Button
          variant={2}
          text="Update"
          onPress={updateDescription}
          disabled={descRef.current === desc || desc.length === 0}
        />
        <Section name="Actions" />
        <ActionsContainer>
          <Button
            variant={3}
            text="Park"
            onPress={() => updateStatus(0)}
            disabled={stat === 0}
          />
          <Button
            variant={4}
            text="Resume"
            onPress={() => updateStatus(1)}
            disabled={stat === 1}
          />
          <Button
            variant={5}
            text="Complete"
            onPress={() => updateStatus(2)}
            disabled={stat === 2}
          />
        </ActionsContainer>
        <JoinedOn id={projId} forProject />
        <Section name="Resources" />
        <ActionsContainer>
          <span>{resc.length}</span>
          <Button
            variant={0}
            text="Add resource"
            onPress={addResource}
            disabled={false}
          />
        </ActionsContainer>
        {resc.length > 0 && (
          <Button
            variant={0}
            text="View resources"
            onPress={takeToRescources}
            disabled={false}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default ProjectBrief;
