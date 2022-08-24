import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core";
import { useDashValues } from "hooks";
import { FcCard } from "@components/fc-cards";
import { CheckboxLabelsExpense } from "./fc-check-box-expense";
import { useMemo } from "react";
import shallow from "zustand/shallow";

export function FcCardExpense() {
  const {
    palette: { type, error },
  } = useTheme();

  const { expensesOpen, expensesPayed, checked } = useDashValues((state) => ({
    expensesOpen: state.expensesOpen,
    expensesPayed: state.expensesPayed,
    checked: state.checkExpenses
  }), shallow);

  const value = useMemo(()=>{
    let value = 0;
    if(checked.open){
      value += expensesOpen;
    }
    if(checked.payed){
      value += expensesPayed
    }
    return value
  },[checked.open, checked.payed, expensesOpen, expensesPayed])

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
