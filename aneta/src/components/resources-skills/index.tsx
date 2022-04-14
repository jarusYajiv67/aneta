import React from 'react';
import styled from 'styled-components';

import {SkillsContainer, SkillHolder, SkillName} from '../user-skills-manager/styles';

const NoneText = styled.span`
  font-family: calibri;
  font-size: 1rem;
  opacity: 0.84;
`;

interface ResourcesSkillsProps {
  skills: Array<string>
}

const ResourcesSkills: React.FC<ResourcesSkillsProps> = ({skills}) => {
    return (
      <SkillsContainer>
        {skills.map((sn, idx) => (
          <SkillHolder key={idx}>
            <SkillName>{sn}</SkillName>
          </SkillHolder>
        ))}
        {skills.length === 0 && (
          <NoneText>No skills added yet</NoneText>
        )}
      </SkillsContainer>
    );
};

export default ResourcesSkills;
