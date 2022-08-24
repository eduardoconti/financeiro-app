import { setCreatedAlert } from "@common/AlertFuncoes";
import { Money } from "@common/money";
import ActionFlagButon from "@components/fc-datagrid/fc-column-actions-flag-button";
import { useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { Grid } from "@material-ui/core";
import { GridCellParams } from "@material-ui/data-grid";
import { useEarning } from "@pages/earning/hooks";
import { ContextAlert } from "Context";
import { useContext } from "react";

export function FcColumnActionsEarning(props: { field: GridCellParams }) {
  const { field } = props;
  const update = useEarning((state) => state.updateFlagPayed);

  const { amount, setAmount, setEarningsOpen, setEarningsPayed, earningsOpen, earningsPayed } = useDashValues((s) => ({
    amount: s.amount,
    setAmount: s.setAmount,
    setEarningsOpen: s.setEarningsOpen,
    setEarningsPayed: s.setEarningsPayed,
    earningsOpen: s.earningsOpen,
    earningsPayed: s.earningsPayed,
  }));
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  const onClick = async () => {
    try {
      setSpin(true);
      const { id, payed, value } = field.row;
      const receita = {
        pago: !payed,
      };

      const { status, message, internalMessage } = await update(id, receita);
      setAlert(setCreatedAlert(status, message, internalMessage));
      const valueFormated = Money.formatToNumber(value);
      if (receita.pago) {
        setAmount(amount + valueFormated);
        setEarningsOpen(earningsOpen - valueFormated)
        setEarningsPayed(earningsPayed + valueFormated)
      } else {
        setAmount(amount - valueFormated);
        setEarningsOpen(earningsOpen + valueFormated)
        setEarningsPayed(earningsPayed - valueFormated)
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
