import { Grid, Typography } from "@material-ui/core";
import FcSurface from "components/fc-surface/fc-surface";

import FcFormIconButtonAddNextMonth from "@components/fc-forms/fc-form-button/fc-form-icon-button-add-next-month";
import { Money } from "@common/money";
import { EarningRequestDTO, EarningResponseDTO } from "@api/earning/dto";
import { FcIconButtonFlagPayed } from "@components/fc-button";
import { useSpin } from "@hooks/use-spin";
import { useContext } from "react";
import { ContextAlert } from "Context";
import { setCreatedAlert } from "@common/AlertFuncoes";
import FcFormIconButtonDelete from "@components/fc-forms/fc-form-button/fc-form-icon-button-delete";
import { useDashValues } from "@hooks/use-dash-values";
import { useCurrentTime } from "@hooks/use-current-time";
import shallow from "zustand/shallow";
import { EarningService, IEarningService } from "@api/earning/service";
import { HttpStatus } from "@common/enum";
import {
  useDataGridEarning,
  useEarning,
  useFormEarning,
} from "@pages/earning/hooks";
import { addMonth } from "@common/DateHelper";

export function FcSelectedRowsEarning() {
  const selectedRows = useDataGridEarning((s) => s.selectedRows);
  const earnings = useEarning((s) => s.earnings);
  const value = calculateSelectedRows(selectedRows, earnings);

  return (
    <FcSurface>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={9} sm={6}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <AddNextMonthButton />
            </Grid>
            <Grid item xs={3}>
              <FlagPayedButton payed={false} />
            </Grid>
            <Grid item xs={3}>
              <FlagPayedButton payed={true} />
            </Grid>
            <Grid item xs={3}>
              <DeleteEarningButton />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} sm={6}>
          <Typography variant="subtitle1" align="right">
            {Money.format(value)}
          </Typography>
        </Grid>
      </Grid>
    </FcSurface>
  );
}

function calculateSelectedRows(
  selectedRows: number[],
  earnings: EarningResponseDTO[]
): number {
  const total = earnings.reduce(
    (value: number, earning: EarningResponseDTO): number => {
      if (selectedRows.includes(earning.id)) {
        return value + earning.valor;
      }
      return value;
    },
    0
  );
  return total;
}

function FlagPayedButton(props: { payed: boolean }) {
  const { payed } = props;
  const selectedRows = useDataGridEarning((s) => s.selectedRows);
  const setSpin = useSpin((s) => s.setSpin);
  const { setAlert } = useContext(ContextAlert);
  const { year, month } = useCurrentTime();
  const { calculate } = useDashValues(
    (s) => ({
      calculate: s.calculate,
    }),
    shallow
  );
  const fetch = useEarning((s) => s.fetchEarnings);
  const onClick = async () => {
    try {
      setSpin(true);
      const earningService: IEarningService = new EarningService();
      await Promise.all(selectedRows.map((id) =>
        earningService.updateFlagPayed(id, { pago: payed })
      ));
      await Promise.all([
        fetch({ year, month }),
        calculate(year, month)
      ])
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
    setAlert(
      setCreatedAlert(
        HttpStatus.OK,
        "Success",
        "Receitas alteradas com sucesso"
      )
    );
  };
  return <FcIconButtonFlagPayed size="large" payed={payed} onClick={onClick} />;
}

function DeleteEarningButton(props: any) {
  const selectedRows = useDataGridEarning((s) => s.selectedRows);
  const fetch = useEarning((s) => s.fetchEarnings);
  const clearAllFields = useFormEarning((s) => s.clearAllFields);
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  const { year, month } = useCurrentTime();
  const calculate = useDashValues((s) => s.calculate);
  const checkEarnings = useDashValues((s) => s.checkEarnings);

  const onClick = async () => {
    try {
      setSpin(true);
      const earningService: IEarningService = new EarningService();
      await Promise.all(selectedRows.map((id) =>
        earningService.delete(id)
      ));
      await Promise.all([
        fetch({ year, month, checked: checkEarnings }),
        calculate(year, month)
      ])
      clearAllFields();
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
    setAlert(
      setCreatedAlert(
        HttpStatus.OK,
        "Success",
        "Receitas excluidas com sucesso"
      )
    );
  };

  return <FcFormIconButtonDelete description="delete" onClick={onClick} />;
}

function AddNextMonthButton() {
  const selectedRows = useDataGridEarning((s) => s.selectedRows);
  const { insertEarningNextMonth, earnings } = useEarning(
    (s) => ({
      insertEarningNextMonth: s.insertEarningNextMonth,
      earnings: s.earnings,
    }),
    shallow
  );
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  const onClick = async () => {
    try {
      setSpin(true);
      await Promise.all(selectedRows.map((id) => {
        const earning = earnings.find((e) => e.id === id);
        if (!earning) return null;
        const { carteira, pagamento, ...rest } = earning;
        const requestDto = EarningRequestDTO.build({
          ...rest,
          carteiraId: carteira.id,
          pagamento: addMonth(pagamento),
        });

        return insertEarningNextMonth(requestDto);
      }));
      setAlert(
        setCreatedAlert(
          HttpStatus.OK,
          "Success",
          "Receitas inseridas com sucesso"
        )
      );
    } catch (error: any) {
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return <FcFormIconButtonAddNextMonth onClick={onClick} />;
}
