import React, { createContext, useState } from "react";

const ContextAnoMes = createContext();

function AnoMesProvider({ children }) {
  const [stateMesAtual, setStateMesAtual] = useState(new Date().getMonth() + 1);
  const [stateAnoAtual, setStateAnoAtual] = useState(new Date().getFullYear());
  return (
    <ContextAnoMes.Provider
      value={{
        stateMesAtual,
        setStateMesAtual,
        stateAnoAtual,
        setStateAnoAtual,
      }}
    >
      {children}
    </ContextAnoMes.Provider>
  );
}

export { ContextAnoMes, AnoMesProvider };
