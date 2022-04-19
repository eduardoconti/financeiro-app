import React, { useEffect, useContext } from "react";

import { SpinContext } from "../../../Context/SpinContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import FcColumnDescription from "../fc-column-description";
import FcDataGrid from "../fc-datagrid";

import { isAuthenticated } from "../../../common/Auth";
import { retornaCarteiras } from "../../../common/CarteiraFuncoes";
import FcColumnActionsWallet from "./fc-columns-actions-wallet";

export default function FcDataGridWallet() {
  const ctxDataGrid = useContext(ContextDataGrid);
  const ctxSpin = useContext(SpinContext);
  const rows = ctxDataGrid.rows;

  let columns = [new FcColumnDescription()];

  columns.push({
    field: "actions",
    headerName: "Operação",
    width: 140,
    sortable: false,
    renderCell: function operacoes(field) {
      return <FcColumnActionsWallet field={field} />;
    },
  });

  async function setRowsDataGrid() {
    ctxSpin.setSpin(true);
    if (isAuthenticated()) {
      let { data } = await retornaCarteiras();

      /*if (categories.status === 200) {
        ctxDataGrid.setRows(categories.data);
      }*/
      ctxDataGrid.setRows(data);
    }
    ctxSpin.setSpin(false);
  }

  useEffect(() => {
    setRowsDataGrid(); // eslint-disable-next-line
  }, []);

  return <FcDataGrid rows={rows} columns={columns} />;
}
