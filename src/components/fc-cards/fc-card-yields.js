import React, { useContext } from "react";
import CheckboxLabels from "../CheckBox";

import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import FcCard from "./fc-card";

export default function FcCardYeld({ setStateCurrentBody }) {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const valor = ctxTotais.stateTotais.totalReceitas;
  const stateChecked = ctxChecked.stateCheckedReceitas;
  const setStateChecked = ctxChecked.setStateCheckedReceitas;

  const onClick = () => {
    setStateCurrentBody();
  };

  return (
    <FcCard onClick={onClick} value={valor} description="Receitas">
      <CheckboxLabels
        setStateChecked={setStateChecked}
        stateChecked={stateChecked}
      />
    </FcCard>
  );
}
