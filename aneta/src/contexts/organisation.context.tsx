import React, { createContext, useContext, useState } from "react";
import axios from "axios";

import {useSocketContext} from './socket.context';
import {useAPIContext} from './api.context';

interface OrganisationContextInterface {
  id: string;
  token: string;
  orgName: string;
  loading: boolean;
  setId?: (val: string) => void;
  setToken?: (val: string) => void;
  setOrgName?: (val: string) => void;
  setLoading?: (val: boolean) => void;
  organisationLogout?: () => void;
}

const defaultState: OrganisationContextInterface = {
  id: "",
  token: "",
  orgName: "",
  loading: false,
};

export const OrganisationContext = createContext<OrganisationContextInterface>(defaultState);

export const useOrganisationContext = () => useContext(OrganisationContext);

export const OrganisationContextProvider: React.FC = ({ children }) => {
  const {socket} = useSocketContext();
  const {REST_API} = useAPIContext();
  const [id, setId] = useState<string>(defaultState.id);
  const [token, setToken] = useState<string>(defaultState.token);
  const [orgName, setOrgName] = useState<string>(defaultState.orgName);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);

  const organisationLogout = () => {
    setLoading(true);
    axios.put(`${REST_API}/organisation/set-status`, {status: 0, orgName}, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(() => {
      axios.delete(`${REST_API}/auth/logout`, {
      headers: {Authorization: `Bearer ${token}`,},
    })
      .then(() => {
        setId("");
        setToken("");
        setOrgName("");
        socket?.close();
        setLoading(false);
      })
      .catch(() => setLoading(false));
    })
    .catch((err) => {
      setLoading(false);
      window.alert(err.response.data);
    });
  };

  return (
    <OrganisationContext.Provider
      value={{
        id, token, loading, orgName,
        setId, setToken, setLoading, setOrgName,
        organisationLogout
      }}
    >{children}</OrganisationContext.Provider>
  );
};
