import { useDashValues } from "hooks";
import React, { createContext, useContext, useEffect, useState } from "react";
import { emptyTotais } from "../common/EmptyStates";
import { ContextAnoMes } from "./AnoMesContext";
import { ContextChecked } from "./CheckedContext";

const ContextTotais = createContext();

function TotaisProvider({ children }) {
  const [stateTotais, setStateTotais] = useState(emptyTotais);
  const { stateAnoAtual, stateMesAtual } = useContext(ContextAnoMes);
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const calculate = useDashValues((state) => state.calculate);

  const fetch = async () => {
    await calculate({
      year: stateAnoAtual,
      month: stateMesAtual,
      checkedExpenses: stateCheckedDespesas,
      checkedEarnings: stateCheckedReceitas,
    });
  };
  return (
    <ContextTotais.Provider
      value={{
        stateTotais,
        setStateTotais,
        fetch,
      }}
    >
      {children}
    </ContextTotais.Provider>
  );
}

export { ContextTotais, TotaisProvider };
