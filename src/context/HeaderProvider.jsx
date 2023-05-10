import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const HeaderContext = createContext();
export function HeaderProvider({ children }) {
  const [searchState, setSearchState] = useState({
    sido: sessionStorage.getItem("sidoCode") || "",
    sigungu: sessionStorage.getItem("sigunguCode") || "",
    keyword: sessionStorage.getItem("keyword") || "",
  });
  const [searchMode, setSearchMode] = useState(
    localStorage.getItem("searchMode") || "bjdCodeSearch"
  );
  const navigate = useNavigate();
  const submitSearch = ({ keyword, sido, sigungu }) => {
    setSearchState({ sido, sigungu, keyword });
    sessionStorage.setItem("sidoCode", sido || "");
    sessionStorage.setItem("sigunguCode", sigungu || "");
    sessionStorage.setItem("keyword", keyword || "");
    navigate(
      `/apartment/list?${
        keyword ? `keyword=${keyword}` : `bjdCode=${sigungu ? sigungu : sido}`
      }`
    );
  };
  const changeSearchMode = (mode) => {
    localStorage.setItem("searchMode", mode);
    setSearchMode(mode);
  };
  return (
    <HeaderContext.Provider
      value={{ submitSearch, searchState, searchMode, changeSearchMode }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeaderContext = () => useContext(HeaderContext);
