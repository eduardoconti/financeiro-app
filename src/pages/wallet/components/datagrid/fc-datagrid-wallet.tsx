import FcColumnDescription from "@components/fc-datagrid/fc-column-description";
import FcDataGrid from "@components/fc-datagrid/fc-datagrid";
import { GridColumns } from "@material-ui/data-grid";
import { useDataGridWallet, useWallet } from "@pages/wallet/hooks";
import { useEffect } from "react";
import shallow from "zustand/shallow";
import { FcColumnActionsWallet } from "./fc-columns-actions-wallet";
import FcColumnStatus from "@components/fc-datagrid/fc-column-status";

export function FcDataGridWallet() {
  const { rows, setRows } = useDataGridWallet(
    (state) => ({ rows: state.rows, setRows: state.setRows }),
    shallow
  );
  const wallets = useWallet((state) => state.wallets);
  let columns: GridColumns = [FcColumnDescription(), FcColumnStatus()];

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
      setRows(
        wallets.map((wallet) => {
          return {
            id: wallet.id,
            description: wallet.descricao,
            active: wallet.active,
          };
        })
      );
    }
    setRowsDataGrid();
  }, [setRows, wallets]);
  return <FcDataGrid rows={rows} columns={columns} />;
}
