import { Grid } from "@material-ui/core";
import FcDataGridFilters from "components/fc-datagrid/expense/fc-data-grid-filters";
import { FcDataGridExpense } from "./components/datagrid";
import { FcFormExpense } from "./components/form";

export default function CorpoDespesas() {
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
