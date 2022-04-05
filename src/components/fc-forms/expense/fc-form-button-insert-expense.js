import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { insereDespesa } from "../../../common/DepesaFuncoes";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
import FcFormIconButtonAdd from "../fc-form-button/fc-form-icon-button-add";
import { dateIso8601 } from "../../../common/DateHelper";

export default function FcFormButtonInsertExpense() {
  const ctxForm = useContext(ContextForm);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {

        const { form } = ctxForm

        form.user = getUserIdFromToken();
        form.valor = parseFloat(form.valor);
        form.vencimento = dateIso8601(form.vencimento);

        let despesa = {
          ...ctxForm.form,
          userId: getUserIdFromToken(),
          valor: parseFloat(ctxForm.form.valor),
          vencimento: new Date(ctxForm.form.vencimento + ':').toISOString(),
        }

        let response = await insereDespesa(despesa);

        ctxAlert.setAlert(
          setCreatedAlert(
            response.statusCode,
            response.message,
            response.internalMessage
          )
        );
        if ([200, 201].includes(response.statusCode)) {
          ctxTotais.setStateTotais(
            await calculaTotais(
              ctxChecked.stateCheckedDespesas,
              ctxChecked.stateCheckedReceitas,
              ctxAnoMes.stateAnoAtual,
              ctxAnoMes.stateMesAtual
            )
          );
          ctxForm.setForm(
            emptyFormularioDespesa(
              ctxAnoMes.stateAnoAtual,
              ctxAnoMes.stateMesAtual
            )
          );
        }
      }}
    />
  );
}
