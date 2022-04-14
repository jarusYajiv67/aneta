import React, {createContext, useContext} from 'react';

interface APIContextInterface {
  REST_API: string;
  SOCKET: string;
}

const defaultState: APIContextInterface = {
  REST_API: "https://aneta-server.herokuapp.com/api",
  SOCKET: "https://aneta-server.herokuapp.com",
};

if (process.env.NODE_ENV === "development") {
  defaultState.REST_API = "http://192.168.29.97:5000/api";
  defaultState.SOCKET = "http://192.168.29.97:5000";
}

export const APIContext = createContext<APIContextInterface>(defaultState);

export const useAPIContext = () => useContext(APIContext);

export const APIContextProvider: React.FC = ({children}) => {
  return (
    <APIContext.Provider value={defaultState}>{children}</APIContext.Provider>
  );
};