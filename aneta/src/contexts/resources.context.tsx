import React, {createContext, useContext, useState} from "react";
import axios from "axios";

import {useAPIContext} from './api.context';
import {useOrganisationContext} from './organisation.context';

interface ResourcesContextInterface {
  candidates: Array<{ id: string }>;
  candidatesPage: string | null;
  employee: Array<{ id: string }>;
  employeePage: string | null;
  currResource: string;
  setCurrResource?: (val: string) => void;
  fetchCandidates?: (val?: string) => void;
  fetchEmployee?: (val?: string) => void;
  resetCandidates?: () => void;
  resetEmployee?: () => void;
}

const defaultState: ResourcesContextInterface = {
  candidates: [],
  candidatesPage: "",
  employeePage: "",
  employee: [],
  currResource: ''
};

export const ResourcesContext = createContext<ResourcesContextInterface>(defaultState);

export const useRescourcesContext = () => useContext(ResourcesContext);

export const ResourcesContextProvider: React.FC = ({children}) => {
    const {REST_API} = useAPIContext();
    const {token, orgName, setLoading} = useOrganisationContext();
    const [employee, setEmployee] = useState<Array<{id: string}>>(defaultState.employee);
    const [candidates, setCandidates] = useState<Array<{id: string}>>(defaultState.candidates);
    const [employeePage, setEmployeePage] = useState<string|null>(defaultState.employeePage);
    const [candidatesPage, setCandidatesPage] = useState<string|null>(defaultState.candidatesPage);
    const [currResource, setCurrResource] = useState<string>('');
    
    const fetchEmployee = (kw: string = '') => {
        if (employeePage === null && !kw?.length) return;
        setLoading!(true);
        const reqBody: {orgName: string; page?: string; keyword?: string} = {orgName};
        if (employeePage?.length) reqBody.page = employeePage;
        if (kw?.length > 0) {
          delete reqBody.page;
          reqBody.keyword = kw;
        };
        axios.post(`${REST_API}/organisation/employee?joined=true`, {...reqBody}, {
          headers: {Authorization: `Bearer ${token}`,}
        }).then(({data}) => {
          if (kw?.length) setEmployee(data.resource || []);
          else setEmployee([...employee, ...data.resource||[]]);
          setEmployeePage(data.pageState);
          setLoading!(false);
        }).catch(() => setLoading!(false));
    };
    
    const resetEmployee = () => {
        setEmployee([]);
        setEmployeePage('');
    }
    
    const fetchCandidates = (kw: string = "") => {
      if (candidatesPage === null && !kw?.length) return;
      setLoading!(true);
      const reqBody: { orgName: string; page?: string; keyword?: string} = { orgName };
      if (candidatesPage?.length) reqBody.page = candidatesPage;
      if (kw?.length > 0) {
        delete reqBody.page;
        reqBody.keyword = kw;
      };
      axios.post(
        `${REST_API}/organisation/employee?joined=false`,
        {...reqBody},
        {headers: { Authorization: `Bearer ${token}`},}
      )
      .then(({ data }) => {
        if (kw?.length) setCandidates(data.resource || []);
        else setCandidates([...candidates, ...(data.resource || [])]);
        setCandidatesPage(data.pageState);
        setLoading!(false);
      })
      .catch(() => setLoading!(false));
    };

    const resetCandidates = () => {
        setCandidates([]);
        setCandidatesPage('');
    };

    return (
        <ResourcesContext.Provider
          value={{
            employee, candidates, employeePage, candidatesPage, currResource,
            fetchEmployee, fetchCandidates, resetEmployee, resetCandidates,
            setCurrResource
          }}
        >{children}</ResourcesContext.Provider>
    );
};
