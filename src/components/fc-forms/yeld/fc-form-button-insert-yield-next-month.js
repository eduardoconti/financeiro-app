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
import { addMonth } from "../../../common/DateHelper";
export default function FcFormButtonInsertYieldNextMonth() {
  const { form, setForm } = useContext(ContextForm);
  const { stateAnoAtual, stateMesAtual } = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonAddNextMonth
      description="nextMonth"
      disabled={form.id === 0}
      onClick={async () => {
        const res = await getYieldById(form.id);
        if (res.status === 200) {
          const {
            data: {
              carteira: { id: carteiraId },
              ...receita
            },
          } = res;
          const nextDate = addMonth(receita.pagamento);

          const {
            status,
            message,
            internalMessage,
            title,
            detail,
          } = await insereReceita({
            id: 0,
            carteiraId,
            pago: false,
            pagamento: nextDate,
            vencimento: nextDate,
            ...receita,
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
            setForm(emptyFormularioReceita(stateAnoAtual, stateMesAtual));
          }
        }
      }}
    />
  );
}
