import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core";
import { useDashValues } from "hooks";
import { CheckboxLabelsEarning } from "@components/fc-dash/fc-check-box-earning";
import { FcCard } from "@components/fc-cards";

export function FcCardEarning() {
  const {
    palette: { type, success },
  } = useTheme();
  const { push } = useHistory();
  const value = useDashValues((state) => state.earnings);

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
