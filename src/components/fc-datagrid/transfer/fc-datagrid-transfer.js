import React, { useEffect, useContext } from "react";

import { ContextAnoMes } from "../../../Context/AnoMesContext";
import { SpinContext } from "../../../Context/SpinContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import { FcColumnValue } from "../fc-column-value";
import FcDataGrid from "../fc-datagrid";

import { isAuthenticated } from "../../../common/Auth";
import FcColumnActionsTransfer from "./fc-column-actions-transfer";
import {
  getTransferencias,
  formataDadosParaLinhasDataGrid,
} from "../../../common/TransferenciaFuncoes";
import  FcColumnWalletDestiny  from "./fc-column-wallet-destiny";
import  FcColumnWalletOrigin  from "./fc-column-wallet-origin";

export default function FcDataGridTransfer() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxDataGrid = useContext(ContextDataGrid);
  const ctxSpin = useContext(SpinContext);

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const rows = ctxDataGrid.rows;

  let columns = [new FcColumnWalletOrigin()];

  columns.push(new FcColumnWalletDestiny());

  columns.push(FcColumnValue, {
    field: "actions",
    headerName: "Operação",
    width: 140,
    sortable: false,
    renderCell: function operacoes(field) {
      return <FcColumnActionsTransfer field={field} />;
    },
  });

  async function setRowsDataGrid() {
    ctxSpin.setSpin(true);
    if (isAuthenticated()) {
      let transferencias = await getTransferencias(
        stateAnoAtual,
        stateMesAtual
      );

      if (transferencias.statusCode === 200) {
        ctxDataGrid.setRows(
          formataDadosParaLinhasDataGrid(transferencias.data)
        );
      }
    }
    ctxSpin.setSpin(false);
  }
  useEffect(() => {
    setRowsDataGrid(); // eslint-disable-next-line
  }, [stateAnoAtual, stateMesAtual]);

  return <FcDataGrid rows={rows} columns={columns} />;
}
