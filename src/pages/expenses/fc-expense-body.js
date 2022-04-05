import React, { useContext } from "react";
import { Grid } from "@material-ui/core";

import FcDataGridExpense from "../../components/fc-datagrid/expense/fc-datagrid-expense";
import FcFormExpense from "../../components/fc-forms/expense/fc-form-expense";
import FcSelectedRows from "../../components/fc-datagrid/fc-selected-rows";

import {
  ContextAlert,
  ContextAnoMes,
  ContextChecked,
  ContextTotais,
  DataGridProvider,
} from "Context";
import {
  addMonth,
  calculaTotais,
  deletaDespesa,
  getUserIdFromToken,
  insereDespesa,
  retornaDespesaPorId,
  setCreatedAlert,
} from "common";

export default function CorpoDespesas() {
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
          <FcDataGridExpense />
        </Grid>
        <Grid item xs={12}>
          <FcSelectedRows
            onClick={async (data) => {
              data.forEach(async (element) => {
                const res = await retornaDespesaPorId(element);

                let {
                  data: { id, descricao, categoria, carteira, ...expense },
                } = res;

                const split = descricao.split("/");
                if (split.length === 2) {
                  descricao = parseInt(split[0]) + 1 + "/" + split[1];
                }

                const insertRes = await insereDespesa({
                  ...expense,
                  id: null,
                  descricao,
                  userId: getUserIdFromToken(),
                  vencimento: addMonth(expense.vencimento),
                  carteiraId: carteira.id,
                  categoriaId: categoria.id,
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
                const deleted = await deletaDespesa(element);

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
          <FcFormExpense />
        </Grid>
      </Grid>
    </DataGridProvider>
  );
}
