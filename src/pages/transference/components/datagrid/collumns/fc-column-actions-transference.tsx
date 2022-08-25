import { setCreatedAlert } from "@common/AlertFuncoes";
import ActionFlagButon from "@components/fc-datagrid/fc-column-actions-flag-button";
import { useSpin } from "@hooks/use-spin";
import { Grid } from "@material-ui/core";
import { ITransferenceRow, useTransference } from "@pages/transference/hooks";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";
export function FcColumnActionsTransfer(props: {
  field: {
    row: ITransferenceRow;
  };
}) {
  const { update, transferences } = useTransference(
    (s) => ({
      update: s.updateFlagPayed,
      transferences: s.transferences,
    }),
    shallow
  );

  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  const onClick = async () => {
    try {
      setSpin(true);
      const { id } = field.row;

      const transference = transferences.find((element) => {
        return element.id === id;
      });
      if (!transference) return;

      const { pago } = transference;
      const receita = {
        pago: !pago,
      };

      const { status, message, internalMessage } = await update(id, receita);
      setAlert(setCreatedAlert(status, message, internalMessage));
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  const { field } = props;
  return (
    <Grid>
      <ActionFlagButon payed={field.row.payed} onClick={onClick} />
    </Grid>
  );
}
