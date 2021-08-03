import React, { useContext } from "react";
import CheckboxLabels from "../CheckBox";

import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import FcCard from "./fc-card";

export default function FcCardExpense(props) {
  const { setStateCurrentBody } = props;
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const valor = ctxTotais.stateTotais.totalDespesas;
  const stateChecked = ctxChecked.stateCheckedDespesas;
  const setStateChecked = ctxChecked.setStateCheckedDespesas;

  const onClick = () => {
    setStateCurrentBody();
  };

  return (
    <FcCard onClick={onClick} value={valor} description="Despesas">
      <CheckboxLabels
        setStateChecked={setStateChecked}
        stateChecked={stateChecked}
      />
    </FcCard>
  );
}
