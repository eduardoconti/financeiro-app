import { EarningResponseDTO } from "@api/earning/dto";
import { formatDateToDataGrid, formatDateToForm } from "@common/DateHelper";
import { Money } from "@common/money";
import FcColumnDescription from "@components/fc-datagrid/fc-column-description";
import { FcColumnPaymentDate } from "@components/fc-datagrid/fc-column-payment-date";
import { FcColumnValue } from "@components/fc-datagrid/fc-column-value";
import { FcColumnWallet } from "@components/fc-datagrid/fc-column-wallet";
import FcDataGrid from "@components/fc-datagrid/fc-datagrid";
import { GridColumns, GridRowParams } from "@material-ui/data-grid";
import { useEarning, useFormEarning } from "@pages/earning/hooks";
import { IEarningRow, useDataGridEarning } from "@pages/earning/hooks/use-datagrid-earning";
import { useEffect } from "react";
import shallow from "zustand/shallow";
import { FcColumnActionsEarning } from "./fc-column-actions-earning";

export function FcDataGridEarning() {

  const { rows, setRows } = useDataGridEarning((state) => ({ rows: state.rows, setRows: state.setRows }), shallow);
  const earnings = useEarning((state) => state.earnings);
  const { setId, setDescription, setValue, setPaymentDate, setPayed, setWalletId } = useFormEarning((state) => ({
    setId: state.setId,
    setDescription: state.setDescription,
    setValue: state.setValue,
    setPaymentDate: state.setPaymentDate,
    setPayed: state.setPayed,
    setWalletId: state.setWalletId,
  }))

  useEffect(() => {
    setRows(earningToDataGrid(earnings));
  }, [earnings, setRows])
  let columns: GridColumns = [FcColumnDescription()];

  if (window.innerWidth >= 960) {
    columns.push(FcColumnWallet, FcColumnPaymentDate);
  }

  columns.push(FcColumnValue, {
    field: "payed",
    headerName: "Pago",
    width: 120,
    sortable: false,
    renderCell: function operacoes(field) {
      return <FcColumnActionsEarning field={field} />;
    },
  });

  return (
    <FcDataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      rowClick={(gridRowParams: GridRowParams) => {
        const { row } = gridRowParams;
        const earning = earnings.find((e) => e.id === (row as IEarningRow).id);
        if (!earning) return;
        setId(earning.id);
        setDescription(earning.descricao);
        setValue(Money.toFloat(earning.valor).toString());
        setPaymentDate(formatDateToForm(earning.pagamento));
        setPayed(earning.pago);
        setWalletId(earning.carteira.id);
      }}
    />
  );
}

function earningToDataGrid(earnings: EarningResponseDTO[]): IEarningRow[] {
  return earnings.map((earning) => {
    const {
      id,
      descricao,
      pago,
      valor,
      pagamento,
      carteira,
    } = earning;
    return {
      id: id,
      description: descricao,
      payed: pago,
      walletId: carteira.descricao,
      value: Money.format(valor),
      paymentDate: pagamento ? formatDateToDataGrid(pagamento) : undefined,
    };
  });
}