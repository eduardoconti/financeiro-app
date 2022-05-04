import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { deletaDespesa } from "../../../common/DepesaFuncoes";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
import FcFormIconButtonDelete from "../fc-form-button/fc-form-icon-button-delete";
export default function FcFormButtonDeleteExpense() {
  const ctxForm = useContext(ContextForm);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonDelete
      description="delete"
      disabled={ctxForm.form.id === 0}
      onClick={async () => {
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
        } = await deletaDespesa(ctxForm.form.id);

        ctxAlert.setAlert(
          setCreatedAlert(status, message ?? detail, internalMessage ?? title)
        );
        if ([200, 201].includes(status)) {
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
