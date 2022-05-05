import { ContextTotais } from "Context";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import FcCard from "./fc-card";

export default function FcCardBalance() {
  const {
    stateTotais: { saldo },
  } = useContext(ContextTotais);
  const history = useHistory();

  const routeChange = () => {
    let path = `saldo`;
    history.push(path);
  };

  return <FcCard onClick={routeChange} value={saldo} description="Saldo" />;
}
