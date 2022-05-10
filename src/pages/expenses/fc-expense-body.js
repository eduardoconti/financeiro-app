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
  alteraFlagPago,
  calculaTotais,
  deletaDespesa,
  getUserIdFromToken,
  insereDespesa,
  retornaDespesaPorId,
  setCreatedAlert,
} from "common";

export default function CorpoDespesas() {
  const { setAlert } = useContext(ContextAlert);
  const { setStateTotais } = useContext(ContextTotais);
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const { stateMesAtual, stateAnoAtual } = useContext(ContextAnoMes);

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
                  data: {
                    id,
                    descricao,
                    categoria,
                    carteira,
                    instalmentId,
                    ...expense
                  },
                } = res;

                if (instalmentId) {
                  return;
                }

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
                setAlert(
                  setCreatedAlert(
                    insertRes.status,
                    insertRes.message,
                    insertRes.internalMessage
                  )
                );
              });
            }}
            onDeleted={async (data) => {
              data.forEach(async (element) => {
                const deleted = await deletaDespesa(element);

                setAlert(
                  setCreatedAlert(
                    deleted.status,
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
            onClickFlag={async (data, pago) => {
              data.forEach(async (element) => {
                const res = await retornaDespesaPorId(element);

                const {
                  data: { id },
                } = res;

                const {
                  status,
                  message,
                  internalMessage,
                  title,
                  detail,
                } = await alteraFlagPago({ id, pago });
                setAlert(
                  setCreatedAlert(
                    status,
                    message ?? detail,
                    internalMessage ?? title
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
