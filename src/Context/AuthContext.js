import React, { createContext, useState } from "react";

const Context = createContext();

function AuthProvider({ children }) {
  
  const [spin, setSpin] = useState(false);

  return (
    <Context.Provider
      value={{
        spin,
        setSpin
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
