import React from 'react';
import {format} from 'timeago.js';

import {Container, Title, Description, Date} from './styles';

import {getDateObj} from '../../utils/timeuuid-to-date';
import {useProjectsContext} from '../../contexts/projects.context';

interface ProjectOverviewProps {
  id: string;
  name: string;
  description: string;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({id, name, description}) => {
  const {setCurrProject} = useProjectsContext();
  return (
    <Container onClick={() => setCurrProject!(id)}>
      <Title>{name}</Title>
      <Description>{description}</Description>
      <Date>{format(getDateObj(id).toISOString())}</Date>
    </Container>
  );
};

export default ProjectOverview;
