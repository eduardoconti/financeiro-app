import ActionFlagButon from "../fc-column-actions-flag-button";

import { useExpense } from "pages/expenses/hook/use-expense";
import { useDashValues } from "@hooks/use-dash-values";
import { useContext } from "react";
import { ContextAlert } from "Context";
import { useSpin } from "@hooks/use-spin";
import { setCreatedAlert } from "@common/AlertFuncoes";
import { Money } from "@common/money";

export default function FcColumnActionsExpense(props: any) {
  const { updateFlagPayed } = useExpense();
  const { amount, setAmount } = useDashValues();
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useSpin();
  const {
    field: { row },
  } = props;
  return ActionFlagButon({
    payed: row.payed,
    onClick: async () => {
      try {
        setSpin(true);
        const { id, payed, value } = row;
        const req = { pago: !payed };
        const { status, message, internalMessage } = await updateFlagPayed(
          id,
          req
        );
        setAmount(
          req.pago
            ? amount - Money.formatToNumber(value)
            : amount + Money.formatToNumber(value)
        );
        setAlert(setCreatedAlert(status, message, internalMessage));
      } catch (error: any) {
        setAlert(setCreatedAlert(error.status, error.detail, error.title));
      } finally {
        setSpin(false);
      }
    },
  });
}
