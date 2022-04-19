import React, { useEffect, useContext } from "react";

import { SpinContext } from "../../../Context/SpinContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";

import FcDataGrid from "../fc-datagrid";

import { isAuthenticated } from "../../../common/Auth";
import { retornaCategorias } from "../../../common/CategoriaFuncoes";
import FcColumnActionsCategory from "./fc-columns-actions-category";
import FcColumnDescription from "../fc-column-description";

export default function FcDataGridCategory() {
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
      return <FcColumnActionsCategory field={field} />;
    },
  });

  async function setRowsDataGrid() {
    ctxSpin.setSpin(true);
    if (isAuthenticated()) {
      let categories = await retornaCategorias();

      /*if (categories.status === 200) {
        ctxDataGrid.setRows(categories.data);
      }*/
      ctxDataGrid.setRows(categories);
    }
    ctxSpin.setSpin(false);
  }

  useEffect(() => {
    setRowsDataGrid(); // eslint-disable-next-line
  }, []);

  return <FcDataGrid rows={rows} columns={columns} />;
}
