import FcSurface from "@components/fc-surface/fc-surface";
import { Grid } from "@material-ui/core";
import { useFormTransference } from "@pages/transference/hooks";
import {
  FcFormButtonClearTransference,
  FcFormButtonDeleteTransference,
  FcFormButtonInsertTransference,
  FcFormButtonUpdateTransference,
} from "./button";
import {
  FcSelectFieldTransferencePayed,
  FcSelectFieldTransferenceWalletDestiny,
  FcSelectFieldTransferenceWalletOrigin,
  FcTextFieldTransferenceDate,
  FcTextFieldTransferenceValue,
} from "./fields";

export function FcFormTransference() {
  const id = useFormTransference((s) => s.id);
  return (
    <FcSurface>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={3}>
          <FcSelectFieldTransferenceWalletOrigin />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FcSelectFieldTransferenceWalletDestiny />
        </Grid>
        <Grid item xs={6} sm={2}>
          <FcTextFieldTransferenceValue />
        </Grid>
        <Grid item xs={6} sm={2}>
          <FcTextFieldTransferenceDate />
        </Grid>
        <Grid item xs={12} sm={2}>
          <FcSelectFieldTransferencePayed />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={4} sm={4}>
              {id === 0 ? (
                <FcFormButtonInsertTransference />
              ) : (
                <FcFormButtonUpdateTransference />
              )}
            </Grid>
            <Grid item xs={4} sm={4}>
              <FcFormButtonDeleteTransference />
            </Grid>
            <Grid item xs={4} sm={4}>
              <FcFormButtonClearTransference />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FcSurface>
  );
}
