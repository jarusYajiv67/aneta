import React, { createContext, useContext, useState } from "react";
import axios from "axios";

import {useSocketContext} from './socket.context';
import {useAPIContext} from "./api.context";

interface UserContextInterface {
  id: string;
  token: string;
  orgName: string;
  email: string;
  loading: boolean;
  setId?: (val: string) => void;
  setToken?: (val: string) => void;
  setOrgName?: (val: string) => void;
  setEmail?: (val: string) => void;
  setLoading?: (val: boolean) => void;
  userLogout?: () => void;
}

const defaultState: UserContextInterface = {
  id: "",
  token: "",
  orgName: "",
  email: "",
  loading: false,
};

export const UserContext = createContext<UserContextInterface>(defaultState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC = ({ children }) => {
  const {socket} = useSocketContext();
  const {REST_API} = useAPIContext();
  const [id, setId] = useState<string>(defaultState.id);
  const [token, setToken] = useState<string>(defaultState.token);
  const [orgName, setOrgName] = useState<string>(defaultState.orgName);
  const [email, setEmail] = useState<string>(defaultState.email);
  const [loading, setLoading] = useState<boolean>(defaultState.loading);

  const userLogout = () => {
    setLoading(true);
    axios.put(`${REST_API}/employee/set-status`, {status: 0, orgName, email}, {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(() => {
      axios.delete(`${REST_API}/auth/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setId("");
        setToken("");
        setOrgName("");
        socket?.close();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        window.alert(err.response.data);
      });
    })
    .catch((err) => {
      setLoading(false);
      window.alert(err.response.data);
    });
  };

  return (
    <UserContext.Provider
      value={{
        id, token, loading, orgName, email,
        setId, setToken, setLoading, setOrgName, setEmail,
        userLogout
      }}
    >{children}</UserContext.Provider>
  );
};
