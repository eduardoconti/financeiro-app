import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioReceita } from "../../../common/EmptyStates";
import FcFormIconButtonAddNextMonth from "../fc-form-button/fc-form-icon-button-add-next-month";
import { getYieldById, insereReceita } from "../../../common/ReceitaFuncoes";
export default function FcFormButtonInsertYieldNextMonth() {
  const ctxForm = useContext(ContextForm);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonAddNextMonth
      description="nextMonth"
      disabled={ctxForm.form.id === 0}
      onClick={async () => {
        let res = await getYieldById(ctxForm.form.id);
        if (res.statusCode === 200) {
          let { data: receita } = res;
          const nextDate = new Date(
            ctxAnoMes.stateAnoAtual,
            ctxAnoMes.stateMesAtual,
            10
          ).toISOString();

          receita.id = 0;
          receita.pagamento = nextDate;
          receita.pago = false;
          receita.user = getUserIdFromToken();

          res = await insereReceita(receita);

          ctxAlert.setAlert(
            setCreatedAlert(res.statusCode, res.message, res.internalMessage)
          );
          if ([200, 201].includes(res.statusCode)) {
            ctxTotais.setStateTotais(
              await calculaTotais(
                ctxChecked.stateCheckedDespesas,
                ctxChecked.stateCheckedReceitas,
                ctxAnoMes.stateAnoAtual,
                ctxAnoMes.stateMesAtual
              )
            );
            ctxForm.setForm(
              emptyFormularioReceita(
                ctxAnoMes.stateAnoAtual,
                ctxAnoMes.stateMesAtual
              )
            );
          }

          return res;
        }
      }}
    />
  );
}
