import React, { createContext, useContext, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
const SpinnerContext = createContext();
export function SpinnerProvider({ children }) {
  const [executeSpinner, setExecuteSpinner] = useState(true);
  const override = {
    margin: " 0 auto",
  };
  const closeSpinner = () => {
    setExecuteSpinner(false);
  };
  const openSpinner = () => {
    setExecuteSpinner(true);
  };
  return (
    <SpinnerContext.Provider value={{ closeSpinner, openSpinner }}>
      {executeSpinner && (
        <div className="fixed overflow-hidden bg-black opacity-30 w-full h-full top-0 left-0 right-0 bottom-0 z-40 text-center ">
          <GridLoader
            color="#565eb6"
            loading={executeSpinner}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="fixed overflow-hidden top-2/4 left-2/4 -translate-x-xHalf translate-y-yHalf z-50"
          />
        </div>
      )}

      {children}
    </SpinnerContext.Provider>
  );
}
export const useSpinnerContext = () => useContext(SpinnerContext);
