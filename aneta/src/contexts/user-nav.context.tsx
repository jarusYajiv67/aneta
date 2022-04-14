import React, {createContext, useContext, useState} from "react";
interface UserNavContextInterface {
  uni: number;
  changeUni?: (val: number) => void;
}

const defaultState: UserNavContextInterface = {
  uni: 0,
};

export const UserNavContext = createContext<UserNavContextInterface>(defaultState);

export const useUserNavContext = () => useContext(UserNavContext);

export const UserNavContextProvider: React.FC = ({ children }) => {
  const [uni, setUni] = useState<number>(defaultState.uni);
  const changeUni = (val: number) => {
    if (val === uni) return;
    setUni(val);
  };
  
  return (
    <UserNavContext.Provider value={{
      uni, 
      changeUni
    }}>{children}</UserNavContext.Provider>
  );
};
