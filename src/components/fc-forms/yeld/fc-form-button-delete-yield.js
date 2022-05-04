import React, { useContext } from "react";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextChecked } from "../../../Context/CheckedContext";
import { ContextTotais } from "../../../Context/TotaisContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { calculaTotais } from "../../../common/Funcoes";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import { emptyFormularioReceita } from "../../../common/EmptyStates";
import FcFormIconButtonDelete from "../fc-form-button/fc-form-icon-button-delete";
import { deletaReceita } from "../../../common/ReceitaFuncoes";
export default function FcFormButtonDeleteYield() {
  const { form, setForm } = useContext(ContextForm);
  const { stateAnoAtual, stateMesAtual } = useContext(ContextAnoMes);
  const ctxTotais = useContext(ContextTotais);
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const ctxAlert = useContext(ContextAlert);

  return (
    <FcFormIconButtonDelete
      description="delete"
      disabled={form.id === 0}
      onClick={async () => {
        const {
          status,
          message,
          internalMessage,
          title,
          detail,
        } = await deletaReceita(form.id);

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
