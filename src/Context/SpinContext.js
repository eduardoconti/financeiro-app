import React, { createContext, useState } from "react";

const SpinContext = createContext();

function SpinProvider({ children }) {

  const [spin, setSpin] = useState(false);

  return (
    <SpinContext.Provider
      value={{
        spin,
        setSpin
      }}
    >
      {children}
    </SpinContext.Provider>
  );
}

export { SpinContext, SpinProvider };
