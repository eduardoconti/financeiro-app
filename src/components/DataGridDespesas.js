import React, { useState, useEffect, useContext } from "react";
import DataGrid from "./DataGrid";

import {
  getDespesas,
  deletaDespesa,
  alteraFlagPago,
  formataDadosParaLinhasDataGrid,
  formataDadosParaFormulario,
  retornaDespesaPorId,
  insereDespesa,
} from "../common/DepesaFuncoes";
import { Box } from "@material-ui/core";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { SpinContext } from "../Context/SpinContext";
import { ContextForm } from "../Context/FormContext";
import { FcColumnDescription } from "./fc-datagrid/fc-column-description";
import { getUserIdFromToken, isAuthenticated } from "../common/Auth";
import ActionFlagButon from "./fc-datagrid/fc-column-actions-flag-button";
import ActionUpdateButon from "./fc-datagrid/fc-column-actions-update-button";
import ActionDeleteButon from "./fc-datagrid/fc-column-actions-delete-button";
import { FcColumnCategory } from "./fc-datagrid/fc-column-category";
import { FcColumnWallet } from "./fc-datagrid/fc-column-wallet";
import { FcColumnDueDate } from "./fc-datagrid/fc-column-duedate";
import { FcColumnValue } from "./fc-datagrid/fc-column-value";
import ActionReplicateButon from "./fc-datagrid/fc-column-actions-replicate-button";

export default function DataGridDespesas() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
  const ctxForm = useContext(ContextForm);
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;
  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  const [rows, setRows] = useState([]);
  let columns = [FcColumnDescription];

  if (window.innerWidth >= 960) {
    columns.push(FcColumnCategory, FcColumnWallet, FcColumnDueDate);
  }
  columns.push(FcColumnValue, {
    field: "operacoes",
    headerName: "Operacoes",
    width: 150,
    sortable: false,
    renderCell: function operacoes(field) {
      return (
        <Box >
          <ActionFlagButon
            payed={field.row.pago}
            onClick={async () => {
              const { id, pago } = field.row;
              const despesa = {
                id: id,
                pago: !pago,
              };

              const res = await alteraFlagPago(despesa);
              await pegaDespesas();
              return res;
            }}
          />
          <ActionUpdateButon
            onClick={async () => {
              const { data: formulario } = await retornaDespesaPorId(
                field.row.id
              );
              ctxForm.setForm(formataDadosParaFormulario(formulario));
            }}
          />
          <ActionDeleteButon
            onClick={async () => {
              const response = await deletaDespesa(field.row.id);
              await pegaDespesas();
              return response;
            }}
          />
          <ActionReplicateButon
            onClick={async () => {
              let res = await retornaDespesaPorId(field.row.id);
              if (res.statusCode === 200) {
                let { data: despesa } = res;
                const nextDate = new Date(
                  stateAnoAtual,
                  stateMesAtual,
                  10
                ).toISOString();

                despesa.id = 0;
                despesa.vencimento = nextDate;
                despesa.dataPagamento = nextDate;
                despesa.pago = false;
                despesa.user = getUserIdFromToken();

                res = await insereDespesa(formataDadosParaFormulario(despesa));

                if (res.statusCode === 200) {
                  await pegaDespesas();
                }

                return res;
              }
            }}
          />
        </Box>
      );
    },
  });

  async function pegaDespesas() {
    ctxSpin.setSpin(true);
    if (isAuthenticated()) {
      let despesas = await getDespesas(
        stateCheckedDespesas,
        stateAnoAtual,
        stateMesAtual
      );

      if (despesas.statusCode === 200) {
        setRows(formataDadosParaLinhasDataGrid(despesas.data));
      }
    }
    ctxSpin.setSpin(false);
  }

  useEffect(() => {
    pegaDespesas(); // eslint-disable-next-line
  }, [stateCheckedDespesas, stateTotais, stateAnoAtual, stateMesAtual]);

  return (
    <Box>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
