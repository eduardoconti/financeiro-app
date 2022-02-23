import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import {
  insereDespesa,
  retornaDespesaPorId,
} from "../../../common/DepesaFuncoes";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
import FcFormIconButtonAddNextMonth from "../fc-form-button/fc-form-icon-button-add-next-month";
export default function FcFormButtonInsertExpenseNextMonth() {
  const ctxForm = useContext(ContextForm);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonAddNextMonth
      description="next-month-expense"
      disabled={ctxForm.form.id === 0}
      onClick={async () => {
        let res = await retornaDespesaPorId(ctxForm.form.id);
        if (res.statusCode === 200) {
          let { data: despesa } = res;
          const nextDate = new Date(
            ctxAnoMes.stateAnoAtual,
            ctxAnoMes.stateMesAtual,
            10
          ).toISOString();

          res = await insereDespesa({
            id: 0,
            userId: getUserIdFromToken(),
            descricao: despesa.descricao,
            valor: despesa.valor,
            vencimento: nextDate,
            dataPagamento: nextDate,
            pago: false,
            carteiraId: despesa.carteira.id,
            categoriaId: despesa.categoria.id,
          });

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
              emptyFormularioDespesa(
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
