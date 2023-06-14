import FcSurface from "@components/fc-surface/fc-surface";
import { Grid } from "@material-ui/core";
import { useFormWallet } from "@pages/wallet/hooks/use-form-wallet";
import { FcFormButtonInsertWallet } from "./button";
import FcFormButtonClearWallet from "./button/fc-form-button-clear";
import FcFormButtonUpdateWallet from "./button/fc-form-button-update-wallet";
import { FcTextFieldWalletDescription } from "./fields/fc-text-field-wallet-description";
import { FcCheckboxWalletStatus } from "./fields/fc-chekbox-wallet-status";

export function FcFormWallet() {
  const { id } = useFormWallet((state) => state.form);
  return (
    <FcSurface>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FcTextFieldWalletDescription />
        </Grid>
        <Grid item xs={12}>
          <FcCheckboxWalletStatus />
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              {id === 0 ? (
                <FcFormButtonInsertWallet />
              ) : (
                <FcFormButtonUpdateWallet />
              )}
            </Grid>

            <Grid item xs={6}>
              <FcFormButtonClearWallet />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </FcSurface>
  );
}
