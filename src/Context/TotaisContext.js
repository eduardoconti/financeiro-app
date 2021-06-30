import React, { createContext, useState } from "react";
import { emptyTotais } from "../common/EmptyStates";

const ContextTotais = createContext();

function TotaisProvider({ children }) {
  const [stateTotais, setStateTotais] = useState(emptyTotais);
  return (
    <ContextTotais.Provider
      value={{
        stateTotais,
        setStateTotais,
      }}
    >
      {children}
    </ContextTotais.Provider>
  );
}

export { ContextTotais, TotaisProvider };
