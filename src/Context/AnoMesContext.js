import { dateNow } from "common";
import { createContext, useState } from "react";

const ContextAnoMes = createContext();

function AnoMesProvider({ children }) {
  const [stateMesAtual, setStateMesAtual] = useState(dateNow().getMonth());
  const [stateAnoAtual, setStateAnoAtual] = useState(dateNow().getFullYear());
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
