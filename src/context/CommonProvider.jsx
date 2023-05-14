import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const CommonContext = createContext();
export function CommonProvider({ children }) {
  const [searchMode, setSearchMode] = useState();
  const changeSearchMode = (mode) => {
    localStorage.setItem("searchMode", mode);
    setSearchMode(mode);
  };
  const baseState = { page: 1, numOfRows: 10 };
  const { state: currentState } = useLocation();
  return (
    <CommonContext.Provider
      value={{
        searchMode,
        changeSearchMode,
        state: { ...currentState, ...baseState },
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}
export const useCommonContext = () => useContext(CommonContext);
