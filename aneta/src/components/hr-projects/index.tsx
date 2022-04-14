import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';

import {Section, SectionContent, Content} from '../hr-sections/styles';

import HRSections from '../hr-sections';
import {VrtclLn} from '../switch-form';

import {useAPIContext} from '../../contexts/api.context';
import {useOrganisationContext} from '../../contexts/organisation.context';

interface ProjectStats {
  Stalled: string;
  Active: string;
  Completed: string;
}

const defaultState: ProjectStats = {
  Active: '-',
  Stalled: '-',
  Completed: '-'
};

interface HRProjectsProps {
  onPress: () => void;
}

const HRProjects: React.FC<HRProjectsProps> = ({onPress}) => {
  const {REST_API} = useAPIContext();
  const {token, orgName} = useOrganisationContext();
  const [state, setState] = useState<ProjectStats>(defaultState);
  const fetched = useRef<boolean>(false);

  const fetchData = () => {
    axios.post(`${REST_API}/projects/stats`, {orgName}, {
      headers: {Authorization: `Bearer ${token}`,}
    }).then(({data}) => {
      setState(data);
    }).catch(() => {});
  };

  useEffect(() => {
    if (!token.length || !orgName.length) return;
    if (fetched.current) return;
    fetched.current = true;
    fetchData();
  }, [orgName, token]);

  return (
    <Section onClick={onPress}>
      <HRSections variant={3} />
      <SectionContent>
        <Content>
          <span>Active</span>
          <span>{state.Active}</span>
        </Content>
        <div>
          <VrtclLn />
        </div>
        <Content>
          <span>Parked</span>
          <span>{state.Stalled}</span>
        </Content>
        <div>
          <VrtclLn />
        </div>
        <Content>
          <span>Completed</span>
          <span>{state.Completed}</span>
        </Content>
        <div>
          <VrtclLn />
        </div>
        <Content>
          <span>Total</span>
          <span>{(+state.Active+(+state.Stalled)+(+state.Completed))||'0'}</span>
        </Content>
      </SectionContent>
    </Section>
  );
};

export default HRProjects;
