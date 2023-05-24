import React, { createContext, useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const CommonContext = createContext();
export function CommonProvider({ children }) {
  const { state: currentState, search } = useLocation();
  const [searchMode, setSearchMode] = useState(
    search.indexOf("keyword") > -1 ? "keywordSearch" : "codeSearch"
  );
  const changeSearchMode = (mode) => {
    setSearchMode(mode);
  };
  const baseState = { page: 1, numOfRows: 20 };
  const [searchState, setSearchState] = useState({ ...baseState });

  return (
    <CommonContext.Provider
      value={{
        searchState,
        setSearchState,
        searchMode,
        changeSearchMode,
        state: { ...baseState, ...currentState },
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}
export const useCommonContext = () => useContext(CommonContext);
