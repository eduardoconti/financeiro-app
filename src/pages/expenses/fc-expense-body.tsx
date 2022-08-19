import { Grid } from "@material-ui/core";
import { useWallet } from "@pages/wallet/hooks";
import FcDataGridFilters from "components/fc-datagrid/expense/fc-data-grid-filters";
import { useEffect } from "react";
import { FcDataGridExpense } from "./components/datagrid";
import { FcFormExpense } from "./components/form";

export default function CorpoDespesas() {
  const init = useWallet((state) => state.fetchWallets);
  useEffect(() => {
    async function start() {
      await init();
    }
    start();
  }, [init]);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FcDataGridFilters />
      </Grid>
      <Grid item xs={12}>
        <FcDataGridExpense />
      </Grid>
      <Grid item xs={12}>
        <FcFormExpense />
      </Grid>
    </Grid>
  );
}
