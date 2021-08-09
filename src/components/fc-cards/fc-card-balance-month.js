import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { ContextTotais } from "../../Context/TotaisContext";
import FcCard from "./fc-card";

export default function FcCardBalanceMonth() {
  const ctxTotais = useContext(ContextTotais);
  const valor = ctxTotais.stateTotais.balanco;

  const history = useHistory();

  const routeChange = () => {
    let path = `balanco`;
    history.push(path);
  };
  return <FcCard onClick={routeChange} value={valor} description="Balanço" />;
}
