import { useContext } from "react";

import FcCard from "./fc-card";
import { useHistory } from "react-router-dom";
import { ContextChecked, ContextTotais } from "Context";
import CheckboxLabels from "components/CheckBox";
import { useTheme } from "@material-ui/core";

export default function FcCardExpense() {
  const theme = useTheme();
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
    <FcCard
      onClick={routeChange}
      value={valor}
      color={
        theme.palette.type === "dark"
          ? theme.palette.error.light
          : theme.palette.error.dark
      }
    >
      <CheckboxLabels
        setStateChecked={setStateCheckedDespesas}
        stateChecked={stateCheckedDespesas}
      />
    </FcCard>
  );
}
