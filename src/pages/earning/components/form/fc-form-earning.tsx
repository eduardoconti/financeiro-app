import FcSurface from "@components/fc-surface/fc-surface";
import { Grid } from "@material-ui/core";
import { useFormEarning } from "@pages/earning/hooks";
import {
  FcFormButtonDeleteEarning,
  FcFormButtonInsertEarningNextMonth,
  FcFormButtonInsertEarning,
  FcFormButtonUpdateEarning,
} from "./button";
import FcFormButtonClearEarning from "./button/fc-form-button-clear";
import {
  FcSelectFieldEarningPayed,
  FcSelectFieldEarningWallet,
  FcTextFiealEarningDescription,
  FcTextFieldEarningPaymentDate,
  FcTextFieldEarningValue,
} from "./fields";

export function FcFormEarning() {
  const id = useFormEarning((state) => state.id);
  return (
    <FcSurface>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FcTextFiealEarningDescription />
        </Grid>

        <Grid item xs={6} sm={4}>
          <FcSelectFieldEarningWallet />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FcTextFieldEarningValue />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FcTextFieldEarningPaymentDate />
        </Grid>
        <Grid item xs={6} sm={4}>
          <FcSelectFieldEarningPayed />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              {id === 0 ? (
                <FcFormButtonInsertEarning />
              ) : (
                <FcFormButtonUpdateEarning />
              )}
            </Grid>
            <Grid item xs={3}>
              <FcFormButtonDeleteEarning />
            </Grid>
            <Grid item xs={3}>
              <FcFormButtonInsertEarningNextMonth />
            </Grid>
            <Grid item xs={3}>
              <FcFormButtonClearEarning />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FcSurface>
  );
}
