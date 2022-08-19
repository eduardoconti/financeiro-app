
import { Grid } from "@material-ui/core";
import { FcDataGridWallet } from "./components/datagrid";
import { FcFormWallet } from "./components/form";

export default function CorpoCarteiras() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={8}>
        <FcDataGridWallet />
      </Grid>

      <Grid item xs={12} md={4}>
        <FcFormWallet />
      </Grid>
    </Grid>
  );
}
