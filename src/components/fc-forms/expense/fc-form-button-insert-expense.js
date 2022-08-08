import React, { useContext, useEffect } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
import FcFormIconButtonAdd from "../fc-form-button/fc-form-icon-button-add";
import { dateIso8601 } from "../../../common/DateHelper";
import { insereDespesa } from "api/expense/service";

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
        const { form } = ctxForm;
        const despesa = {
          ...form,
          vencimento: dateIso8601(form.vencimento),
          pagamento: form.pagamento ? dateIso8601(form.pagamento) : undefined,
        };
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
        } = await insereDespesa(despesa);

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
          ctxForm.setForm(emptyFormularioDespesa());
        }
      }}
    />
  );
}
