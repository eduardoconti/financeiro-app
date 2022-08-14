import { useContext, useEffect } from "react";
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
import ExpenseFilterProvider from "Context/expense-filter-context";
import FcDataGridFilters from "components/fc-datagrid/expense/fc-data-grid-filters";
import {
  CategoryContextType,
  ContextCategory,
} from "pages/category/context/category-context";

export default function CorpoDespesas() {
  const { setAlert } = useContext(ContextAlert);
  const { setStateTotais } = useContext(ContextTotais);
  const { stateCheckedDespesas, stateCheckedReceitas } = useContext(
    ContextChecked
  );
  const { stateMesAtual, stateAnoAtual } = useContext(ContextAnoMes);
  const { fetchCategories } = useContext(
    ContextCategory
  ) as CategoryContextType;

  useEffect(() => {
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DataGridProvider>
      <ExpenseFilterProvider>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FcDataGridFilters />
          </Grid>
          <Grid item xs={12}>
            <FcDataGridExpense />
          </Grid>
          <Grid item xs={12}>
            <FcSelectedRows
              onClick={async (data: any) => {
                data.forEach(async (element: number) => {
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
              onDeleted={async (data: any) => {
                data.forEach(async (element: number) => {
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
              onClickFlag={async (data: any, pago: boolean) => {
                data.forEach(async (element: any) => {
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
      </ExpenseFilterProvider>
    </DataGridProvider>
  );
}
