import React from 'react';

import Section from '../section';
import UserSkillsManager from '../user-skills-manager';

interface UserSkillsProps {}

const UserSkills: React.FC<UserSkillsProps> = () => {
  return (
    <div>
      <Section name="Skills" />
      <UserSkillsManager />
    </div>
  );
};

export default UserSkills;
