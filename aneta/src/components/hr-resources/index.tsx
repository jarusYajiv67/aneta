import React, {useEffect, useState, useRef} from 'react';
import axios from "axios";

import {Section, SectionContent, Content} from "../hr-sections/styles";

import HRSections from "../hr-sections";
import {VrtclLn} from "../switch-form";

import {useAPIContext} from '../../contexts/api.context';
import {useOrganisationContext} from '../../contexts/organisation.context';
import {useSocketContext} from '../../contexts/socket.context';

interface ResourceStats {
  Developer: string;
  Tester: string;
  Support: string;
  "Project Manager": string;
  Candidates: string;
}

const defaultState: ResourceStats = {
  Developer: "-",
  Tester: "-",
  Support: "-",
  "Project Manager": "-",
  Candidates: "-",
};

interface HRResourcesProps {
  onPress: () => void;
}

const HRResources: React.FC<HRResourcesProps> = ({onPress}) => {
  const {REST_API} = useAPIContext();
  const {socket} = useSocketContext();
  const {token, orgName} = useOrganisationContext();
  const [state, setState] = useState<ResourceStats>(defaultState);
  const fetched = useRef<boolean>(false);

  const fetchData = () => {
    axios.post(`${REST_API}/employee/stats`, {orgName}, {
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

  useEffect(() => {
    socket?.on("createAcc", () => {
      fetchData();
    });
  }, []);

  return (
    <Section onClick={onPress}>
      <HRSections variant={4} />
      <SectionContent>
        <Content>
          <span>Total Employee</span>
          <span>{(+state.Developer+(+state.Tester)+(+state.Support)+(+state['Project Manager']))||'0'}</span>
        </Content>
        <div>
          <VrtclLn />
        </div>
        <Content>
          <span>Developers</span>
          <span>{state.Developer}</span>
        </Content>
        <div>
          <VrtclLn />
        </div>
        <Content>
          <span>Testers</span>
          <span>{state.Tester}</span>
        </Content>
        <div>
          <VrtclLn />
        </div>
        <Content>
          <span>Support</span>
          <span>{state.Support}</span>
        </Content>
        <div>
          <VrtclLn />
        </div>
        <Content>
          <span>Project Managers</span>
          <span>{state["Project Manager"]}</span>
        </Content>
        <div>
          <VrtclLn />
        </div>
        <Content>
          <span>Candidates</span>
          <span>{state.Candidates}</span>
        </Content>
      </SectionContent>
    </Section>
  );
};

export default HRResources;
