import React, { useEffect, useContext } from "react";

import { SpinContext } from "../../../Context/SpinContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";

import FcDataGrid from "../fc-datagrid";

import { isAuthenticated } from "../../../common/Auth";
import { retornaCategorias } from "../../../common/CategoriaFuncoes";
import FcColumnActionsCategory from "./fc-columns-actions-category";
import FcColumnDescription from "../fc-column-description";

export default function FcDataGridCategory() {
  const { rows, setRows } = useContext(ContextDataGrid);
  const { setSpin } = useContext(SpinContext);

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

  useEffect(() => {
    async function setRowsDataGrid() {
      setSpin(true);
      if (isAuthenticated()) {
        let categories = await retornaCategorias();
        setRows(categories);
      }
      setSpin(false);
    }
    setRowsDataGrid();
  }, [setRows, setSpin]);

  return <FcDataGrid rows={rows} columns={columns} />;
}
