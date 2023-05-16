import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
const HeaderContext = createContext();
export function HeaderProvider({ children }) {
  const navigate = useNavigate();
  const submitSearch = ({
    searchKeyword = "",
    searchSidoCode = "",
    searchSigunguCode = "",
  }) => {
    navigate(
      `/apartment/list?${
        searchKeyword
          ? `keyword=${searchKeyword}`
          : `bjdCode=${searchSigunguCode ? searchSigunguCode : searchSidoCode}`
      }`,
      {
        state: {
          searchSigunguCode,
          searchSidoCode,
          searchKeyword,
        },
      }
    );
  };

  return (
    <HeaderContext.Provider value={{ submitSearch }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeaderContext = () => useContext(HeaderContext);
