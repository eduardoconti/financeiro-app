import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { ContextTotais } from "../../Context/TotaisContext";
import FcCard from "./fc-card";

export default function FcCardBalance() {
  const ctxTotais = useContext(ContextTotais);
  const valor = ctxTotais.stateTotais.saldo;

  const history = useHistory();

  const routeChange = () => {
    let path = `saldo`;
    history.push(path);
  };

  return <FcCard onClick={routeChange} value={valor} description="Saldo" />;
}
