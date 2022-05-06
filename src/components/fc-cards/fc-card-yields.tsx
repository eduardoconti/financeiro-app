import { useContext } from "react";

import FcCard from "./fc-card";
import { useHistory } from "react-router-dom";
import { ContextChecked, ContextTotais } from "Context";
import CheckboxLabels from "components/CheckBox";
import { useTheme } from "@material-ui/core";

export default function FcCardYeld() {
  const theme = useTheme();
  const {
    stateTotais: { totalReceitas },
  } = useContext(ContextTotais);
  const { stateCheckedReceitas, setStateCheckedReceitas } = useContext(
    ContextChecked
  );

  const history = useHistory();

  const routeChange = () => {
    let path = `receitas`;
    history.push(path);
  };

  return (
    <FcCard onClick={routeChange} value={totalReceitas} color={theme.palette.secondary.main}>
      <CheckboxLabels
        setStateChecked={setStateCheckedReceitas}
        stateChecked={stateCheckedReceitas}
      />
    </FcCard>
  );
}
