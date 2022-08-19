import { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { insereReceita } from "../../../common/ReceitaFuncoes";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioReceita } from "../../../common/EmptyStates";

import { dateIso8601, Money } from "common";
import { FcFormIconButtonAdd } from "../fc-form-button";
export default function FcFormButtonInsertYeld() {
  const { form, setForm } = useContext(ContextForm);
  const { stateAnoAtual, stateMesAtual } = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {
        form.pagamento = dateIso8601(form.pagamento);
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
        } = await insereReceita({
          ...form,
          valor: Money.toInteger(form.valor),
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
      }}
    />
  );
}
