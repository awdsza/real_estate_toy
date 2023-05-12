import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
const HeaderContext = createContext();
export function HeaderProvider({ children }) {
  const [searchMode, setSearchMode] = useState("");
  const navigate = useNavigate();
  const submitSearch = ({ keyword, sido, sigungu }) => {
    navigate(
      `/apartment/list?${
        keyword ? `keyword=${keyword}` : `bjdCode=${sigungu ? sigungu : sido}`
      }`,
      {
        state: {
          sido,
          sigungu,
          keyword,
          searchMode: searchMode || "bjdCodeSearch",
        },
      }
    );
  };
  const changeSearchMode = (mode) => {
    localStorage.setItem("searchMode", mode);
    setSearchMode(mode);
  };
  return (
    <HeaderContext.Provider
      value={{ submitSearch, searchMode, changeSearchMode }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeaderContext = () => useContext(HeaderContext);
