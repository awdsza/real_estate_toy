import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { lpad, convertCurrencyUnit, throttling } from "../util/util";
const CommonContext = createContext();
export function CommonProvider({ children }) {
  const { state: currentState, search, pathname: path } = useLocation();
  const [searchMode, setSearchMode] = useState("");
  useEffect(() => {
    setSearchMode(
      search.indexOf("keyword") > -1 ? "keywordSearch" : "codeSearch"
    );
  }, [search]);
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
        lpad,
        convertCurrencyUnit,
        throttling,
        state: { ...baseState, ...currentState },
        path,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
}
export const useCommonContext = () => useContext(CommonContext);
