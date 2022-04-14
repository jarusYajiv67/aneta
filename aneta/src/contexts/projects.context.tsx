import React, {createContext, useContext, useState} from "react";
import axios from "axios";

import {useAPIContext} from './api.context';
import {useOrganisationContext} from './organisation.context';

interface ProjectType {
  id: string;
  name: string;
  description: string;
}

interface ProjectsContextInterface {
  currProject: string;
  setCurrProject?: (val: string) => void;
  active: Array<ProjectType>;
  activePage: string | null;
  fetchActive?: () => void;
  stalled: Array<ProjectType>;
  stalledPage: string | null;
  fetchStalled?: () => void;
  completed: Array<ProjectType>;
  completedPage: string | null;
  fetchCompleted?: () => void;
  resetProjects?: () => void;
}

const defaultState: ProjectsContextInterface = {
  currProject: '',
  active: [],
  activePage: '',
  stalled: [],
  stalledPage: '',
  completed: [],
  completedPage: ''
};

export const ProjectsContext = createContext<ProjectsContextInterface>(defaultState);

export const useProjectsContext = () => useContext(ProjectsContext);

export const ProjectsContextProvider: React.FC = ({children}) => {
  const {REST_API} = useAPIContext();
  const {token, orgName, setLoading} = useOrganisationContext();
  const [currProject, setCurrProject] = useState<string>(defaultState.currProject);
  const [active, setActive] = useState<Array<ProjectType>>(defaultState.active);
  const [stalled, setStalled] = useState<Array<ProjectType>>(defaultState.stalled);
  const [completed, setCompleted] = useState<Array<ProjectType>>(defaultState.completed);
  const [activePage, setActivePage] = useState<string|null>(defaultState.activePage);
  const [stalledPage, setStalledPage] = useState<string|null>(defaultState.stalledPage);
  const [completedPage, setCompletedPage] = useState<string|null>(defaultState.completedPage);

  const fetchActive = () => {
    if (activePage === null) return;
    setLoading!(true);
    const reqBody: {orgName: string; page?: string;} = {orgName};
    if (activePage?.length) reqBody.page = activePage;
    axios.post(`${REST_API}/projects/fetch?status=1`, {...reqBody}, {
      headers: {Authorization: `Bearer ${token}`,}
    }).then(({data}) => {
      setActive([...active, ...(data.projects || [])]);
      setActivePage(data.pageState);
      setLoading!(false);
    }).catch(() => setLoading!(false));
  };
  
  const fetchStalled = () => {
    if (stalledPage === null) return;
    setLoading!(true);
    const reqBody: {orgName: string; page?: string;} = {orgName};
    if (stalledPage?.length) reqBody.page = stalledPage;
    axios.post(`${REST_API}/projects/fetch?status=0`, {...reqBody}, {
      headers: {Authorization: `Bearer ${token}`,}
    }).then(({data}) => {
      setStalled([...stalled, ...(data.projects || [])]);
      setStalledPage(data.pageState);
      setLoading!(false);
    }).catch(() => setLoading!(false));
  };
  
  const fetchCompleted = () => {
    if (completedPage === null) return;
    setLoading!(true);
    const reqBody: {orgName: string; page?: string;} = {orgName};
    if (completedPage?.length) reqBody.page = completedPage;
    axios.post(`${REST_API}/projects/fetch?status=2`, {...reqBody}, {
      headers: {Authorization: `Bearer ${token}`,}
    }).then(({data}) => {
      setCompleted([...completed, ...(data.projects || [])]);
      setCompletedPage(data.pageState);
      setLoading!(false);
    }).catch(() => setLoading!(false));
  };

  const resetProjects = () => {
    setActive([]);
    setActivePage('');
    setStalled([]);
    setStalledPage('');
    setCompleted([]);
    setCompletedPage('');
  };

  return (
    <ProjectsContext.Provider
      value={{
        currProject, active, stalled, completed,
        setCurrProject, activePage, stalledPage, completedPage,
        fetchActive, fetchStalled, fetchCompleted, resetProjects
      }}
    >{children}</ProjectsContext.Provider>
  );
};
