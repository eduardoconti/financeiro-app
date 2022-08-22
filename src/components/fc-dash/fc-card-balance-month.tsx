import { FcCard } from "@components/fc-cards";
import { useDashValues } from "@hooks/use-dash-values";
import { useTheme } from "@material-ui/core";

import { useHistory } from "react-router-dom";

export function FcCardBalanceMonth() {
  const theme = useTheme();

  const history = useHistory();

  const routeChange = () => {
    let path = `balanco`;
    history.push(path);
  };

  const valor = useDashValues((state) => state.balance);
  return (
    <FcCard
      onClick={routeChange}
      value={valor}
      color={
        theme.palette.type === "dark"
          ? theme.palette.info.light
          : theme.palette.info.dark
      }
    />
  );
}
