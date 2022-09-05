import { Grid } from "@material-ui/core";
import FcDataGridFilters from "@pages/expenses/components/datagrid/fc-data-grid-filters";
import { FcDataGridExpense } from "./components/datagrid";
import { FcGraphicExpenseByCategory } from "./components/fc-graphic";
import { FcFormExpense } from "./components/form";

export function FcExpenseBody() {
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
      <Grid item xs={12}>
        <FcGraphicExpenseByCategory />
      </Grid>
    </Grid>
  );
}
