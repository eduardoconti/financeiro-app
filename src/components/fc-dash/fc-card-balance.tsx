import { FcCard } from "@components/fc-cards";
import { useTheme } from "@material-ui/core";
import { useDashValues } from "hooks";
import { useHistory } from "react-router-dom";

export function FcCardBalance() {
  const theme = useTheme();
  const history = useHistory();

  const routeChange = () => {
    let path = `saldo`;
    history.push(path);
  };

  const valor = useDashValues((state) => state.amount);

  return (
    <FcCard
      onClick={routeChange}
      value={valor}
      color={
        theme.palette.type === "dark"
          ? theme.palette.warning.light
          : theme.palette.warning.dark
      }
    />
  );
}
