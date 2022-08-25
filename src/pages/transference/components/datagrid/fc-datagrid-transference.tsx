import { formatDateToForm } from "@common/DateHelper";
import { Money } from "@common/money";
import { FcColumnValue } from "@components/fc-datagrid/fc-column-value";
import FcDataGrid from "@components/fc-datagrid/fc-datagrid";
import { useCurrentTime } from "@hooks/use-current-time";
import { useSpin } from "@hooks/use-spin";
import { GridColumns, GridRowParams } from "@material-ui/data-grid";
import { transferenceToDataGrid } from "@pages/transference/common";
import {
  ITransferenceRow,
  useFormTransference,
  useTransference,
} from "@pages/transference/hooks";
import { useEffect, useMemo } from "react";
import shallow from "zustand/shallow";
import {
  FcColumnActionsTransfer,
  FcColumnTransferenceDate,
  FcColumnWalletDestiny,
  FcColumnWalletOrigin,
} from "./collumns";

export function FcDataGridTransference() {
  const { init, transferences } = useTransference(
    (s) => ({
      init: s.fetchTransferences,
      transferences: s.transferences,
    }),
    shallow
  );

  const {
    setId,
    setValue,
    setWalletOriginId,
    setWalletDestinyId,
    setTransferenceDate,
    setPayed,
  } = useFormTransference(
    (s) => ({
      setId: s.setId,
      setValue: s.setValue,
      setWalletOriginId: s.setWalletOriginId,
      setWalletDestinyId: s.setWalletDestinyId,
      setTransferenceDate: s.setTransferenceDate,
      setPayed: s.setPayed,
    }),
    shallow
  );

  const { year, month } = useCurrentTime();
  const setSpin = useSpin((s) => s.setSpin);

  useEffect(() => {
    async function start() {
      try {
        setSpin(true);
        await init({ year, month });
      } catch (error: any) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    }
    start();
  }, [init, month, setSpin, year]);

  const rows = useMemo(() => {
    return transferenceToDataGrid(transferences);
  }, [transferences]);
  let columns: GridColumns = [FcColumnWalletOrigin()];

  columns.push(
    FcColumnWalletDestiny(),
    FcColumnTransferenceDate,
    FcColumnValue,
    {
      field: "actions",
      headerName: "Pago",
      type: "boolean",
      width: 140,
      sortable: false,
      renderCell: function operacoes(field: any) {
        return <FcColumnActionsTransfer field={field} />;
      },
    }
  );
  return (
    <FcDataGrid
      rows={rows}
      columns={columns}
      checkboxSelection={true}
      rowClick={(gridRowParams: GridRowParams) => {
        const { row } = gridRowParams;
        const transference = transferences.find(
          (e) => e.id === (row as ITransferenceRow).id
        );
        if (!transference) return;

        setId(transference.id);
        setValue(Money.toFloat(transference.valor).toString());
        setTransferenceDate(formatDateToForm(transference.transferencia));
        setPayed(transference.pago);
        setWalletOriginId(transference.carteiraOrigem.id);
        setWalletDestinyId(transference.carteiraDestino.id);
      }}
    />
  );
}
