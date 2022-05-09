import {
  alteraDespesa,
  calculaTotais,
  emptyFormularioDespesa,
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
        } = await alteraDespesa(form);

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
