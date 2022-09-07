import { useExpense } from "pages/expenses/hook/use-expense";
import { useDashValues } from "@hooks/use-dash-values";
import { useContext } from "react";
import { ContextAlert } from "Context";
import { useSpin } from "@hooks/use-spin";
import { setCreatedAlert } from "@common/AlertFuncoes";
import shallow from "zustand/shallow";
import { FcIconButtonFlagPayed } from "@components/fc-button";

export function FcColumnActionsExpense(props: any) {
  const { updateFlagPayed, expenses } = useExpense(
    (s) => ({ updateFlagPayed: s.updateFlagPayed, expenses: s.expenses }),
    shallow
  );
  const {
    addAmount,
    subAmount,
    addExpensesOpen,
    subExpensesPayed,
    addExpensesPayed,
    subExpensesOpen,
  } = useDashValues(
    (s) => ({
      addAmount: s.addAmount,
      subAmount: s.subAmount,
      addExpensesOpen: s.addExpensesOpen,
      addExpensesPayed: s.addExpensesPayed,
      subExpensesOpen: s.subExpensesOpen,
      subExpensesPayed: s.subExpensesPayed,
    }),
    shallow
  );
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  const onClick = async () => {
    try {
      setSpin(true);
      const { id } = row;

      const expense = expenses.find((expense) => {
        return expense.id === id;
      });

      if (!expense) {
        return;
      }
      const { pago, valor } = expense;

      const req = { pago: !pago };
      const { status, message, internalMessage } = await updateFlagPayed(
        id,
        req
      );
      if (req.pago) {
        addExpensesPayed(valor);
        subExpensesOpen(valor);
        subAmount(valor);
      } else {
        addExpensesOpen(valor);
        subExpensesPayed(valor);
        addAmount(valor);
      }

      setAlert(setCreatedAlert(status, message, internalMessage));
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };

  const {
    field: { row },
  } = props;
  return <FcIconButtonFlagPayed payed={row.payed} onClick={onClick} />;
}
