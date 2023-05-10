import React, { useContext } from "react";
import { createContext } from "react";
import { JusoAPI } from "../api/JusoAPI";
const JusoContext = createContext();
export function JusoProvider({ children }) {
  const jusoAPI = new JusoAPI();
  return (
    <JusoContext.Provider value={{ jusoAPI }}>{children}</JusoContext.Provider>
  );
}
export const useJusoAPI = () => useContext(JusoContext);
