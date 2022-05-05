import { useContext } from "react";

import FcCard from "./fc-card";
import { useHistory } from "react-router-dom";
import { ContextChecked, ContextTotais } from "Context";
import CheckboxLabels from "components/CheckBox";

export default function FcCardYeld() {
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
    <FcCard onClick={routeChange} value={totalReceitas} description="Receitas">
      <CheckboxLabels
        setStateChecked={setStateCheckedReceitas}
        stateChecked={stateCheckedReceitas}
      />
    </FcCard>
  );
}
