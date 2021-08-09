import React, { useContext } from "react";
import CheckboxLabels from "../CheckBox";

import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import FcCard from "./fc-card";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function FcCardExpense(props) {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const valor = ctxTotais.stateTotais.totalDespesas;
  const stateChecked = ctxChecked.stateCheckedDespesas;
  const setStateChecked = ctxChecked.setStateCheckedDespesas;

  const history = useHistory();

  const routeChange = () => {
    let path = ``;
    history.push(path);
  };

  return (
    <FcCard onClick={routeChange} value={valor} description="Despesas">
      <CheckboxLabels
        setStateChecked={setStateChecked}
        stateChecked={stateChecked}
      />
    </FcCard>
  );
}
