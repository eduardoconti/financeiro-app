import React, { useContext } from "react";

import { ContextTotais } from "../../Context/TotaisContext";
import FcCard from "./fc-card";

export default function FcCardBalanceMonth({ setStateCurrentBody }) {
  const ctxTotais = useContext(ContextTotais);
  const valor = ctxTotais.stateTotais.balanco;
  function onClick() {
    setStateCurrentBody();
  }

  return <FcCard onClick={onClick} value={valor} description="Balanço" />;
}
