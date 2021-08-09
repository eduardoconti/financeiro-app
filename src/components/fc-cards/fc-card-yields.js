import React, { useContext } from "react";
import CheckboxLabels from "../CheckBox";

import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import FcCard from "./fc-card";
import { useHistory } from "react-router-dom";
export default function FcCardYeld() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const valor = ctxTotais.stateTotais.totalReceitas;
  const stateChecked = ctxChecked.stateCheckedReceitas;
  const setStateChecked = ctxChecked.setStateCheckedReceitas;

  const history = useHistory();

  const routeChange = () => {
    let path = `receitas`;
    history.push(path);
  };

  return (
    <FcCard onClick={routeChange} value={valor} description="Receitas">
      <CheckboxLabels
        setStateChecked={setStateChecked}
        stateChecked={stateChecked}
      />
    </FcCard>
  );
}
