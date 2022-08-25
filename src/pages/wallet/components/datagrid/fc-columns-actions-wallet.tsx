import { setCreatedAlert } from "@common/AlertFuncoes";
import ActionDeleteButon from "@components/fc-datagrid/fc-column-actions-delete-button";
import ActionUpdateButon from "@components/fc-datagrid/fc-column-actions-update-button";
import { Grid } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { IWalletRow, useWallet } from "@pages/wallet/hooks";
import { useFormWallet } from "@pages/wallet/hooks/use-form-wallet";
import { ContextAlert, SpinContext } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";
export function FcColumnActionsWallet(props: { field: GridCellParams }) {
  const { setForm } = useFormWallet(
    (state) => ({ setForm: state.setForm }),
    shallow
  );
  const deleteWallet = useWallet((state) => state.deleteWallet);
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useContext(SpinContext);
  const { field } = props;
  const onClickUpdate = () => {
    setForm(field.row as IWalletRow);
  };

  const onClickDelete = async () => {
    try {
      const { status, message, internalMessage } = await deleteWallet(
        field.row.id
      );
      setAlert(setCreatedAlert(status, message, internalMessage));
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };

  return (
    <Grid>
      <ActionUpdateButon onClick={onClickUpdate} />
      <ActionDeleteButon onClick={onClickDelete} />
    </Grid>
  );
}
