import { EarningResponseDTO } from "@api/earning/dto";
import { formatDateToDataGrid, formatDateToForm } from "@common/DateHelper";
import { Money } from "@common/money";
import FcColumnDescription from "@components/fc-datagrid/fc-column-description";
import { FcColumnPaymentDate } from "@components/fc-datagrid/fc-column-payment-date";
import { FcColumnValue } from "@components/fc-datagrid/fc-column-value";
import { FcColumnWallet } from "@components/fc-datagrid/fc-column-wallet";
import FcDataGrid from "@components/fc-datagrid/fc-datagrid";
import { useCurrentTime } from "@hooks/use-current-time";
import { CheckedValues, useDashValues } from "@hooks/use-dash-values";
import { useSpin } from "@hooks/use-spin";
import { Grid } from "@material-ui/core";
import { GridColumns, GridSelectionModel } from "@material-ui/data-grid";
import { useEarning, useFormEarning } from "@pages/earning/hooks";
import { IEarningRow, useDataGridEarning } from "@pages/earning/hooks/use-datagrid-earning";
import React, { useEffect } from "react";
import shallow from "zustand/shallow";
import { FcColumnActionsEarning } from "./fc-column-actions-earning";
import { FcSelectedRowsEarning } from "./fc-selected-rows-earning";

export function FcDataGridEarning() {
  const { earnings, initEarnings } = useEarning((state) => ({
    earnings: state.earnings,
    initEarnings: state.fetchEarnings,
  }), shallow);
  const {
    setId,
    setDescription,
    setValue,
    setPaymentDate,
    setPayed,
    setWalletId,
    clear
  } = useFormEarning((state) => ({
    setId: state.setId,
    setDescription: state.setDescription,
    setValue: state.setValue,
    setPaymentDate: state.setPaymentDate,
    setPayed: state.setPayed,
    setWalletId: state.setWalletId,
    clear: state.clearAllFields
  }));
  const { checkEarnings } = useDashValues(
    (state) => ({
      checkEarnings: state.checkEarnings,
    }),
    shallow
  );
  const { year, month } = useCurrentTime();
  const setSpin = useSpin((s) => s.setSpin);
  const rows = React.useMemo(() => {
    return earningToDataGrid(earnings, checkEarnings);
  }, [earnings, checkEarnings]);

  useEffect(() => {
    async function start() {
      try {
        setSpin(true);
        initEarnings({ month: month, year: year });
      } catch (error) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    }
    start();
  }, [initEarnings, month, setSpin, year]);
  let columns: GridColumns = [FcColumnDescription()];

  if (window.innerWidth >= 960) {
    columns.push(FcColumnWallet, FcColumnPaymentDate);
  }

  columns.push(FcColumnValue, {
    field: "payed",
    headerName: "Pago",
    type: "boolean",
    width: 120,
    sortable: false,
    renderCell: function operacoes(field) {
      return <FcColumnActionsEarning field={field} />;
    },
  });

  const { setSelectedRows, selectedRows } = useDataGridEarning((s) => ({ selectedRows: s.selectedRows, setSelectedRows: s.setSelectedRows }), shallow);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FcDataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          onSelectionModelChange={(gridSelectionModel: GridSelectionModel) => {
            const id = gridSelectionModel[0]
            const earning = earnings.find((e) => e.id === id);
            if (!earning){
              clear()
              setSelectedRows([])
              return;             
            } 
            setId(earning.id);
            setDescription(earning.descricao);
            setValue(Money.toFloat(earning.valor).toString());
            setPaymentDate(formatDateToForm(earning.pagamento));
            setPayed(earning.pago);
            setWalletId(earning.carteira.id);
            setSelectedRows(gridSelectionModel as number[]);
          }}
        />
      </Grid>
      {(selectedRows && selectedRows.length > 0) ?
        (<Grid item xs={12}>
          <FcSelectedRowsEarning />
        </Grid>) : null
      }

    </Grid>
  );
}

function earningToDataGrid(
  earnings: EarningResponseDTO[],
  checked?: CheckedValues
): IEarningRow[] {
  const earningRows: IEarningRow[] = [];

  earnings.forEach((earning) => {
    const { id, descricao, pago, valor, pagamento, carteira } = earning;

    if (checked) {
      if (!checked.open && !pago) {
        return;
      }

      if (!checked.payed && pago) {
        return;
      }
    }
    earningRows.push({
      id: id,
      description: descricao,
      payed: pago,
      walletId: carteira.descricao,
      value: Money.format(valor),
      paymentDate: pagamento ? formatDateToDataGrid(pagamento) : undefined,
    });
  });
  return earningRows;
}
