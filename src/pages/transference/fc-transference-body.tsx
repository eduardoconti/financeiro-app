import { Grid } from "@material-ui/core";
import { FcDataGridTransference } from "./components/datagrid";
import { FcFormTransference } from "./components/form";

export function FcTransferenceBody() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FcDataGridTransference />
      </Grid>

      <Grid item xs={12}>
        <FcFormTransference />
      </Grid>
    </Grid>
  );
}
