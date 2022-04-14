import React, {useState, useEffect, useRef} from "react";
import axios from "axios";

import {Projects, Holder, NoneText} from './styles';
import {CloseIcon} from '../user-skills-manager/styles';

import Section from '../section';
import ProjectName from "../project-name";

import {useUserContext} from "../../contexts/user.context";
import {useOrganisationContext} from '../../contexts/organisation.context';
import {useAPIContext} from '../../contexts/api.context';

interface AssignedToProps {
  fromHr?: Array<string>;
  fromHrEmail?: string;
  fromHrId?: string;
}

const AssignedTo: React.FC<AssignedToProps> = ({fromHr, fromHrEmail, fromHrId}) => {
    const {REST_API} = useAPIContext();
    const {setLoading, token, id} = useUserContext();
    const {id: orgId, orgName, token: otkn} = useOrganisationContext();
    const [projects, setProjects] = useState<Array<string>>([]);
    const fetched = useRef<boolean>(false);

    useEffect(() => {
      if (fromHr?.length) {
        setProjects(fromHr);
        return;
      }
      if (!token.length || !id.length) return;
      if (fetched.current) return;
      fetched.current = true;
      setLoading!(true);
      axios.post(`${REST_API}/employee/projects`, {id}, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(({data}) => {
        setProjects(data.projects||[]);
        setLoading!(false);
      }).catch(() => setLoading!(false));
    }, []);

    const removeFromProject = (projectName: string) => {
      if (!(orgId.length > 0)) return;
      setLoading!(true);
      const reqBody = {
        orgName,
        projName: projectName,
        email: fromHrEmail,
        empId: fromHrId,
      }
      axios.put(`${REST_API}/projects/rem-emp`, {...reqBody}, {
        headers: {Authorization: `Bearer ${otkn}`}
      }).then(() => {
        setProjects(projects.filter(val => val !== projectName));
        setLoading!(false);
      }).catch(() => setLoading!(false));
    };

    return (
      <div>
        <Section name="Projects / Assigned to" />
        <Projects>
          {projects.map((pn, idx) => (
            <Holder key={idx} onClick={
              () => orgId.length > 0 && removeFromProject(pn)
            }>
              <ProjectName id={pn} />
              {orgId.length > 0 && <CloseIcon />}
            </Holder>
          ))}
          {projects.length === 0 && (
            <NoneText>Not assigned to any projects currently</NoneText>
          )}
        </Projects>
      </div>
    );
};

export default AssignedTo;
