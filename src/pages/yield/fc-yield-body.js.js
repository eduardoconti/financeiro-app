import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { DataGridProvider } from "../../Context/DataGridContext";
import FcDataGridYeld from "../../components/fc-datagrid/yeld/fc-datagrid-yeld";
import FcFormYeld from "../../components/fc-forms/yeld/fc-form-yeld";
import FcSelectedRows from "../../components/fc-datagrid/fc-selected-rows";
import {
  deletaReceita,
  insereReceita,
  retornaReceitaPorId,
} from "../../common/ReceitaFuncoes";
import { addMonth } from "../../common/DateHelper";
import { setCreatedAlert } from "../../common/AlertFuncoes";
import { getUserIdFromToken } from "../../common/Auth";
import { calculaTotais } from "../../common/Funcoes";
import {
  ContextAlert,
  ContextAnoMes,
  ContextChecked,
  ContextTotais,
} from "Context";

export default function CorpoReceitas() {
  const ctxAlert = useContext(ContextAlert);
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);

  const setStateTotais = ctxTotais.setStateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  return (
    <DataGridProvider>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <FcDataGridYeld />
        </Grid>
        <Grid item xs={12}>
          <FcSelectedRows
            onClick={async (data) => {
              data.forEach(async (element) => {
                const res = await retornaReceitaPorId(element);

                let {
                  data: { id, carteira, ...earning },
                } = res;
                const insertRes = await insereReceita({
                  ...earning,
                  userId: getUserIdFromToken(),
                  pagamento: addMonth(earning.pagamento),
                  carteiraId: carteira.id,
                  pago: false,
                });
                ctxAlert.setAlert(
                  setCreatedAlert(
                    insertRes.statusCode,
                    insertRes.message,
                    insertRes.internalMessage
                  )
                );
              });
            }}
            onDeleted={async (data) => {
              data.forEach(async (element) => {
                const deleted = await deletaReceita(element);

                ctxAlert.setAlert(
                  setCreatedAlert(
                    deleted.statusCode,
                    deleted.message,
                    deleted.internalMessage
                  )
                );
              });
              setStateTotais(
                await calculaTotais(
                  stateCheckedDespesas,
                  stateCheckedReceitas,
                  stateAnoAtual,
                  stateMesAtual
                )
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FcFormYeld />
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
