import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core";
import { useDashValues } from "hooks";
import { CheckboxLabelsEarning } from "@components/fc-dash/fc-check-box-earning";
import { FcCard } from "@components/fc-cards";
import shallow from "zustand/shallow";
import { useMemo } from "react";

export function FcCardEarning() {
  const {
    palette: { type, success },
  } = useTheme();
  const { push } = useHistory();
  const { earningsOpen, earningsPayed, checked } = useDashValues((state) => ({
    earningsOpen: state.earningsOpen,
    earningsPayed: state.earningsPayed,
    checked: state.checkEarnings
  }), shallow);

  const value = useMemo(() => {
    console.log('memo')
    let value = 0;
    if (checked.open) {
      value += earningsOpen;
    }
    if (checked.payed) {
      value += earningsPayed
    }
    return value
  }, [checked.open, checked.payed, earningsOpen, earningsPayed])

  const routeChange = () => {
    push(`receitas`);
  };

  return (
    <FcCard
      onClick={routeChange}
      value={value}
      color={type === "dark" ? success.light : success.dark}
    >
      <CheckboxLabelsEarning />
    </FcCard>
  );
}
