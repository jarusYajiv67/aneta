import React, {createContext, useContext, useState} from "react";

interface SwitchContextInterface {
  isLogin: boolean;
  toggleSwitch?: () => void;
}

const defaultState: SwitchContextInterface = {
  isLogin: true,
};

export const SwitchContext = createContext<SwitchContextInterface>(defaultState);

export const useSwitchContext = () => useContext(SwitchContext);

export const SwitchContextProvider: React.FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(defaultState.isLogin);
  const toggleSwitch = () => setIsLogin(!isLogin);
  return (
    <SwitchContext.Provider value={{
        isLogin, 
        toggleSwitch
    }}>{children}</SwitchContext.Provider>
  );
};
