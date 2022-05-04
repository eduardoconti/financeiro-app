import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { alteraDespesa } from "../../../common/DepesaFuncoes";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
import FcFormIconButtonUpdate from "../fc-form-button/fc-form-icon-button-update";
import { dateIso8601 } from "../../../common/DateHelper";
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
        form.valor = parseFloat(form.valor);
        form.vencimento = dateIso8601(form.vencimento);

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
          setForm(emptyFormularioDespesa(stateAnoAtual, stateMesAtual));
        }
      }}
    />
  );
}
