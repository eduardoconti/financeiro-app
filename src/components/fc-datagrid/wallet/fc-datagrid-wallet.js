import React, { useEffect, useContext } from "react";

import { SpinContext } from "../../../Context/SpinContext";
import { ContextDataGrid } from "../../../Context/DataGridContext";
import FcColumnDescription from "../fc-column-description";
import FcDataGrid from "../fc-datagrid";

import { isAuthenticated } from "../../../common/Auth";
import { retornaCarteiras } from "../../../common/CarteiraFuncoes";
import FcColumnActionsWallet from "./fc-columns-actions-wallet";

export default function FcDataGridWallet() {
  const { rows, setRows } = useContext(ContextDataGrid);
  const { setSpin } = useContext(SpinContext);

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

  useEffect(() => {
    async function setRowsDataGrid() {
      setSpin(true);
      if (isAuthenticated()) {
        let { data } = await retornaCarteiras();
        setRows(data);
      }
      setSpin(false);
    }
    setRowsDataGrid();
  }, [setRows, setSpin]);

  return <FcDataGrid rows={rows} columns={columns} />;
}
