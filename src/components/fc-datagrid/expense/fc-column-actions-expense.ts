import ActionFlagButon from "../fc-column-actions-flag-button";

import { ExpenseService } from "api/expense/service";
import { useExpense } from "pages/expenses/hook/use-expense";

export default function FcColumnActionsExpense(props: any) {
  const { fetchExpenses } = useExpense();

  const { field } = props;
  return ActionFlagButon({
    payed: field.row.payed,
    onClick: async () => {
      const { id, payed } = field.row;
      const despesa = {
        id: id,
        pago: !payed,
      };

      await new ExpenseService().alteraFlagPago(despesa);
      await fetchExpenses();
    },
  });
}
