import { ContextTotais } from "Context";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import FcCard from "./fc-card";

export default function FcCardBalanceMonth() {
  const {
    stateTotais: { balanco },
  } = useContext(ContextTotais);

  const history = useHistory();

  const routeChange = () => {
    let path = `balanco`;
    history.push(path);
  };
  return <FcCard onClick={routeChange} value={balanco} description="Balanço" />;
}
