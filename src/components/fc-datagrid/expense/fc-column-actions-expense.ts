import { useContext } from "react";
import ActionFlagButon from "../fc-column-actions-flag-button";

import { ExpenseService } from "api/expense/service";
import {
  ContextAnoMes,
  ContextChecked,
  ContextDataGrid,
  ContextExpenseFilter,
  ExpenseFilterContextType,
  SpinContext,
} from "Context";
import { formataDadosParaLinhasDataGrid, isAuthenticated } from "common";
export default function FcColumnActionsExpense(props: any) {
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
  const ctxDataGrid = useContext(ContextDataGrid);
  const { filter} = useContext(ContextExpenseFilter) as ExpenseFilterContextType;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  async function pegaDespesas() {
    ctxSpin.setSpin(true);
    if (isAuthenticated()) {
      let despesas = await new ExpenseService().getDespesas(
        stateCheckedDespesas,
        stateAnoAtual,
        stateMesAtual,
        filter
      );

      if (despesas.status === 200) {
        ctxDataGrid.setRows(formataDadosParaLinhasDataGrid(despesas.data));
      }
    }
    ctxSpin.setSpin(false);
  }

  const { field } = props;
  return ActionFlagButon({
    payed: field.row.pago,
    onClick: async () => {
      const { id, pago } = field.row;
      const despesa = {
        id: id,
        pago: !pago,
      };

      const res = await new ExpenseService().alteraFlagPago(despesa);
      await pegaDespesas();
      return res;
    },
  });
}
