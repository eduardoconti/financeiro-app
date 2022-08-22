import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core";
import { useDashValues } from "hooks";
import { FcCard } from "@components/fc-cards";
import { CheckboxLabelsExpense } from "./fc-check-box-expense";

export function FcCardExpense() {
  const {
    palette: { type, error },
  } = useTheme();

  const value = useDashValues((state) => state.expenses);

  const history = useHistory();

  const routeChange = async () => {
    history.push(`despesas`);
  };

  return (
    <FcCard
      onClick={routeChange}
      value={value}
      color={type === "dark" ? error.light : error.dark}
    >
      <CheckboxLabelsExpense />
    </FcCard>
  );
}
