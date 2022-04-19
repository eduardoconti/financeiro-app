import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import {
  insereDespesa,
  retornaDespesaPorId,
} from "../../../common/DepesaFuncoes";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioDespesa } from "../../../common/EmptyStates";
import FcFormIconButtonAddNextMonth from "../fc-form-button/fc-form-icon-button-add-next-month";
import { addMonth } from "../../../common/DateHelper";
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
        if (res.status === 200) {
          let {
            data: {
              carteira: { id: carteiraId },
              categoria:{ id: categoriaId },
              descricao,
              ...despesa
            },
          } = res;
          const nextDate = addMonth(despesa.vencimento);
          const split = descricao.split("/");
          if (split.length === 2) {
            descricao = parseInt(split[0]) + 1 + "/" + split[1];
          }

          despesa.vencimento = nextDate;
          despesa.dataPagamento = nextDate;
          despesa.pago = false;

          res = await insereDespesa({
            id: 0,
            descricao,
            carteiraId,
            categoriaId,
            ...despesa,
          });

          ctxAlert.setAlert(
            setCreatedAlert(res.status, res.message, res.internalMessage)
          );
          if ([200, 201].includes(res.status)) {
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
