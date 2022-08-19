import { setCreatedAlert } from "@common/AlertFuncoes";
import ActionFlagButon from "@components/fc-datagrid/fc-column-actions-flag-button";
import { Grid } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { useEarning } from "@pages/earning/hooks";
import { ContextAlert, SpinContext } from "Context";
import { useContext } from "react";

export function FcColumnActionsEarning(props: {
  field: GridCellParams
}) {

  const update = useEarning((state) => state.updateFlagPayed)
  const { setAlert } = useContext(ContextAlert);
  const { setSpin } = useContext(SpinContext);
  const { field } = props;
  const onClick = async () => {
    try {
      setSpin(true);
      const { id, payed } = field.row;
      const receita = {
        pago: !payed,
      };
      const { status, message, internalMessage } = await update(id, receita);
      setAlert(setCreatedAlert(status, message, internalMessage));
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  }
  return (
    <Grid>
      <ActionFlagButon
        payed={field.row.payed}
        onClick={onClick}
      />
    </Grid>
  );
}
