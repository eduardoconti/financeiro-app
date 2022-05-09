import { useContext } from "react";
import FcFormButton from "../fc-form-button/fc-form-button";
import { ContextForm } from "../../../Context/FormContext";
import { ContextAlert } from "../../../Context/AlertContext";
import { getUserIdFromToken } from "../../../common/Auth";
import { setCreatedAlert } from "../../../common/AlertFuncoes";
import {
  alteraTransferencia,
  formataDadosParaLinhasDataGrid,
  getTransferencias,
} from "../../../common/TransferenciaFuncoes";
import { emptyFormularioTransferencia } from "../../../common/EmptyStates";
import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import { formatDateToForm } from "common";
import { HttpStatus } from "common/enum";

export default function FcFormButtonUpdateTransfer() {
  const { form, setForm } = useContext(ContextForm);
  const ctxAlert = useContext(ContextAlert);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxDataGrid = useContext(ContextDataGrid);

  return (
    <FcFormButton
      description="alterar"
      onClick={async () => {
        form.valor = parseFloat(form.valor);
        form.transferencia = formatDateToForm();

        const {
          status,
          message,
          internalMessage,
          detail,
          title,
        } = await alteraTransferencia(form);

        ctxAlert.setAlert(
          setCreatedAlert(status, message ?? detail, internalMessage ?? title)
        );

        if ([HttpStatus.CREATED, HttpStatus.OK].includes(status)) {
          setForm(
            emptyFormularioTransferencia(
              ctxAnoMes.stateAnoAtual,
              ctxAnoMes.stateMesAtual
            )
          );

          let { data } = await getTransferencias(
            ctxAnoMes.stateAnoAtual,
            ctxAnoMes.stateMesAtual
          );
          ctxDataGrid.setRows(formataDadosParaLinhasDataGrid(data));
        }
      }}
    />
  );
}
