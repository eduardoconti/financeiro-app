import {
  alteraDespesa,
  calculaTotais,
  dateIso8601,
  emptyFormularioDespesa,
  Money,
  setCreatedAlert,
} from "common";
import {
  ContextAlert,
  ContextAnoMes,
  ContextChecked,
  ContextForm,
  ContextTotais,
} from "Context";
import { useContext } from "react";

import FcFormIconButtonUpdate from "../fc-form-button/fc-form-icon-button-update";
export default function FcFormButtonUpdateExpense() {
  const { form, setForm } = useContext(ContextForm);
  const { stateAnoAtual, stateMesAtual } = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const ctxAlert = useContext(ContextAlert);
  const { vencimento, valor, ...expense } = form;
  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
        } = await alteraDespesa({
          vencimento: dateIso8601(vencimento),
          valor: Money.toInteger(valor),
          ...expense,
        });

        ctxAlert.setAlert(
          setCreatedAlert(status, message ?? detail, internalMessage ?? title)
        );
        if ([200, 201].includes(status)) {
          ctxTotais.setStateTotais(
            await calculaTotais(
              stateCheckedDespesas,
              stateCheckedReceitas,
              stateAnoAtual,
              stateMesAtual
            )
          );
          setForm(emptyFormularioDespesa());
        }
      }}
    />
  );
}
