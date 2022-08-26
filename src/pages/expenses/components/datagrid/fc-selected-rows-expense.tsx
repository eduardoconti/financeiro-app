import { Grid, Typography, useTheme } from "@material-ui/core";
import FcSurface from "components/fc-surface/fc-surface";
import { useDataGridExpense } from "pages/expenses/hook/use-data-grid-expense";
import FcFormIconButtonAddNextMonth from "@components/fc-forms/fc-form-button/fc-form-icon-button-add-next-month";
import { FcFormButtonDeleteExpense } from "../form/button";
import { Money } from "@common/money";
import { ExpenseResponseDTO } from "@api/expense/dto";
import { useExpense } from "@pages/expenses/hook";
import { FcIconButtonFlagPayed } from "@components/fc-button";
import { useSpin } from "@hooks/use-spin";
import { useContext } from "react";
import { ContextAlert } from "Context";
import { setCreatedAlert } from "@common/AlertFuncoes";

export function FcSelectedRowsExpense() {
  const theme = useTheme();
  const selectedRows = useDataGridExpense((s) => s.selectedRows)
  const expenses = useExpense(s => s.expenses)
  const value = calculateSelectedRows(selectedRows, expenses);
  return (
    <FcSurface>
      <Grid container spacing={1} alignItems="center" >
        <Grid item xs={10} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FcFormIconButtonAddNextMonth
                onClick={async () => {
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <FlagPayedButton payed={false} />
            </Grid>
            <Grid item xs={3}>
              <FlagPayedButton payed={true} />
            </Grid>
            <Grid item xs={3}>
              <FcFormButtonDeleteExpense />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} sm={6}>
          <Typography variant="subtitle1" align="right" style={{ marginRight: theme.spacing(11) }}>
            {Money.format(value)}
          </Typography>
        </Grid>
      </Grid>
    </FcSurface>

  );
}

function calculateSelectedRows(selectedRows: number[], expenses: ExpenseResponseDTO[]): number {
  const total = expenses.reduce((value: number, expense: ExpenseResponseDTO): number => {
    if (selectedRows.includes(expense.id)) {
      return value + expense.valor
    }
    return value
  }, 0)
  return total
}

function FlagPayedButton(props: {
  payed: boolean
}) {
  const { payed } = props
  const selectedRows = useDataGridExpense((s) => s.selectedRows)
  const update = useExpense(s => s.updateFlagPayed)
  const setSpin = useSpin(s => s.setSpin)
  const {setAlert} = useContext(ContextAlert)
  const onClick = (() => {
    selectedRows.forEach(async (id) => {
      try {
        setSpin(true)
        const {status, message, internalMessage } = await update(id, { pago: payed })
        setAlert(setCreatedAlert(status, message, internalMessage));
      } catch (error: any) {

      } finally {
        setSpin(false)
      }
    })
  })
  return (<FcIconButtonFlagPayed size="large" payed={payed} onClick={onClick} />)

}