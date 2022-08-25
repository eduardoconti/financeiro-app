import { TransferenceResponseDTO } from "@api/transference/dto";
import { formatDateToDataGrid } from "@common/DateHelper";
import { Money } from "@common/money";

import { ITransferenceRow } from "../hooks";

export function transferenceToDataGrid(
  transferences: TransferenceResponseDTO[]
): ITransferenceRow[] {
  const dataGridRows: ITransferenceRow[] = [];

  transferences.forEach((element) => {
    const { id, carteiraDestino, carteiraOrigem, valor, pago } = element;
    dataGridRows.push({
      id: id,
      walletDestiny: carteiraDestino.descricao,
      walletOrigin: carteiraOrigem.descricao,
      value: Money.format(valor),
      transferenceDate: formatDateToDataGrid(),
      payed: pago,
    });
  });

  return dataGridRows;
}
