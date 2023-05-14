import React from "react";
import { createContext, useContext } from "react";
import EstateDataAPI from "../api/EstateDataAPI";
const EstateAPIContext = createContext();
export function EstateAPIProvider({ children }) {
  const estateAPI = new EstateDataAPI();
  return (
    <EstateAPIContext.Provider value={{ estateAPI }}>
      {children}
    </EstateAPIContext.Provider>
  );
}
export const useEstateAPIContext = () => useContext(EstateAPIContext);
