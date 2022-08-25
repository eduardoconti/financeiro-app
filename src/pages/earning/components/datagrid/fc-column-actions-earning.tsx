import { setCreatedAlert } from "@common/AlertFuncoes";
import ActionFlagButon from "@components/fc-datagrid/fc-column-actions-flag-button";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { Grid } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { useEarning } from "@pages/earning/hooks";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export function FcColumnActionsEarning(props: { field: GridCellParams }) {
  const { field } = props;
  const { update, earnings } = useEarning(
    (s) => ({
      update: s.updateFlagPayed,
      earnings: s.earnings,
    }),
    shallow
  );

  const {
    subAmount,
    addAmount,
    addEarningsOpen,
    addEarningsPayed,
    subEarningsOpen,
    subEarningsPayed,
  } = useDashValues(
    (s) => ({
      subAmount: s.subAmount,
      addAmount: s.addAmount,
      addEarningsOpen: s.addEarningsOpen,
      addEarningsPayed: s.addEarningsPayed,
      subEarningsOpen: s.subEarningsOpen,
      subEarningsPayed: s.subEarningsPayed,
    }),
    shallow
  );
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  const onClick = async () => {
    try {
      setSpin(true);
      const { id } = field.row;

      const earning = earnings.find((element) => {
        return element.id === id;
      });
      if (!earning) return;

      const { valor, pago } = earning;
      const receita = {
        pago: !pago,
      };

      const { status, message, internalMessage } = await update(id, receita);
      setAlert(setCreatedAlert(status, message, internalMessage));

      if (receita.pago) {
        addAmount(valor);
        subEarningsOpen(valor);
        addEarningsPayed(valor);
      } else {
        subAmount(valor);
        addEarningsOpen(valor);
        subEarningsPayed(valor);
      }
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return (
    <Grid>
      <ActionFlagButon payed={field.row.payed} onClick={onClick} />
    </Grid>
  );
}
