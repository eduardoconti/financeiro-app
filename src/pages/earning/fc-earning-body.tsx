import { Grid } from "@material-ui/core";
import { FcDataGridEarning } from "./components/datagrid";
import { FcFormEarning } from "./components/form";

export function EarningBody() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FcDataGridEarning />
      </Grid>
      <Grid item xs={12}>
        <FcFormEarning />
      </Grid>
    </Grid>
  );
}
