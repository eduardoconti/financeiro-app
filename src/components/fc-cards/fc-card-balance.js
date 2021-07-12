import React, { useContext } from "react";

import { ContextTotais } from "../../Context/TotaisContext";
import FcCard from "./fc-card";

export default function FcCardBalance({ setStateCurrentBody }) {
  const ctxTotais = useContext(ContextTotais);
  const valor = ctxTotais.stateTotais.saldo;
  function onClick() {
    setStateCurrentBody();
  }

  return <FcCard onClick={onClick} value={valor} description="Saldo" />;
}
