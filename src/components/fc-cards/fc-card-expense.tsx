import { useContext } from "react";

import FcCard from "./fc-card";
import { useHistory } from "react-router-dom";
import { ContextChecked, ContextTotais } from "Context";
import CheckboxLabels from "components/CheckBox";

export default function FcCardExpense() {
  const ctxTotais = useContext(ContextTotais);
  const { stateCheckedDespesas, setStateCheckedDespesas } = useContext(
    ContextChecked
  );
  const valor = ctxTotais.stateTotais.totalDespesas;

  const history = useHistory();

  const routeChange = () => {
    let path = `despesas`;
    history.push(path);
  };

  return (
    <FcCard onClick={routeChange} value={valor} description="Despesas">
      <CheckboxLabels
        setStateChecked={setStateCheckedDespesas}
        stateChecked={stateCheckedDespesas}
      />
    </FcCard>
  );
}
