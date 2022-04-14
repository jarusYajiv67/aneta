import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import {
  Container, Wrapper, Header, Body, CloseIcon
} from './styles';

import SimpleProfile from '../simple-profile';
import Button from '../button';
import JoinedOn from '../joined-on';
import AssignedTo from '../assigned-to';
import HRActions from '../hr-actions';
import Leaves from '../leaves';
import ResourcesSkills from "../resources-skills";
import Section from '../section';

import {useAPIContext} from '../../contexts/api.context';
import {useOrganisationContext} from '../../contexts/organisation.context';
import {useContactsContext} from '../../contexts/contacts.context';

interface ResourceOverviewProps {
  currId: string;
  onClose: () => void;
}

const ResourceOverview: React.FC<ResourceOverviewProps> = ({onClose, currId}) => {
    const navigate = useNavigate();
    const {REST_API} = useAPIContext();
    const {token, setLoading, orgName} = useOrganisationContext();
    const {setCurrContact} = useContactsContext();
    const [skills, setSkills] = useState<Array<string>>([]);
    const [projects, setProjects] = useState<Array<string>>([]);
    const [joined, setJoined] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [request, setRequest] = useState<boolean>(false);
    const [leaves, setLeaves] = useState<number>(0);
    const [role, setRole] = useState<string>('');

    useEffect(() => {
      setLoading!(true);
      axios.post(
        `${REST_API}/organisation/resource-overview`, 
        {id: currId},
        {headers: {Authorization: `Bearer ${token}`}}
      ).then(({data}) => {
        setSkills(data.skills||[]);
        setProjects(data.projects||[]);
        setJoined(data.joined);
        setEmail(data.email);
        setRequest(data.request);
        setLeaves(data.leaves);
        setRole(data.role);
        setLoading!(false);
      }).catch(() => setLoading!(false));
    }, []);

    const onHireClick = () => {
      setLoading!(true);
      axios.put(`${REST_API}/organisation/hire`, {orgName, email}, {
        headers: {Authorization: `Bearer ${token}`}
      }).then(() => {
        navigate(`../organisation/${orgName}/dashboard`);
        setLoading!(false);
      }).catch(() => setLoading!(false));
    };

    const onDenyClick = () => {
      setLoading!(true);
      axios.put(`${REST_API}/organisation/deny`, {orgName, email}, {
        headers: {Authorization: `Bearer ${token}`}
      }).then(() => {
        navigate(`../organisation/${orgName}/dashboard`);
        setLoading!(false);
      }).catch(() => setLoading!(false));
    };

    const onAcceptLeaveClick = () => {
      if (!request) return;
      axios.put(
        `${REST_API}/organisation/accept-leave`, 
        {orgName, email, leaves: leaves + 1},
        {headers: {Authorization: `Bearer ${token}`}}
      ).then(() => {
        setLeaves(leaves + 1);
        setRequest(false);
        navigate(`../organisation/${orgName}/dashboard`);
      }).catch(() => {});
    };

    const onSalaryClick = () => {
      setLoading!(true);
      axios.post(
        `${REST_API}/transactions/new`, 
        {orgName, role, empEmail: email},
        {headers: {Authorization: `Bearer ${token}`}}
      ).then(() => {
        setLoading!(false);
        window.alert("Transaction Success");
      }).catch(() => setLoading!(false));
    };

    const onAssignProject = () => {
      const projName = window.prompt("Project name:");
      if (!projName || !projName.length) return;
      setLoading!(true);
      axios.post(`${REST_API}/projects/find`, {orgName, projName}, {
        headers: {Authorization: `Bearer ${token}`}
      }).then(() => {
        axios.put(
          `${REST_API}/projects/add-emp`, {orgName, projName, email}, {
          headers: {Authorization: `Bearer ${token}`}
        }).then(() => {
          setLoading!(false);
          window.alert("Assigned to project");
          onClose();
          navigate(`../organisation/${orgName}/dashboard`);
        }).catch(() => setLoading!(false));
      }).catch((err) => {
        setLoading!(false);
        window.alert(JSON.stringify(err?.response?.data));
      });
    };

    const onMessageClick = () => {
      setCurrContact!(currId);
      navigate(`../organisation/${orgName}/chat`);
    };
    
    return (
      <Container>
        <Wrapper>
          <CloseIcon onClick={onClose}>X</CloseIcon>
          <Header>
            <SimpleProfile id={currId} variant={2} showEmail />
            {joined && <Button
              variant={4}
              text="Message"
              disabled={false}
              onPress={onMessageClick}
            />}
          </Header>
          <Body>
            {joined && <JoinedOn id={currId} />}
            {joined && <Leaves id={currId} leaves={leaves > 0 ? leaves : undefined} />}
            <Section name="Skills" />
            <ResourcesSkills skills={skills} />
            {joined && (
              <AssignedTo 
                fromHr={projects}
                fromHrEmail={email}
                fromHrId={currId}
              />
            )}
            <HRActions 
              joined={joined} 
              request={request}
              hire={onHireClick}
              deny={onDenyClick}
              acceptLeave={onAcceptLeaveClick}
              salary={onSalaryClick}
              assignProject={onAssignProject}
            />
          </Body>
        </Wrapper>
      </Container>
    );
}

export default ResourceOverview;
