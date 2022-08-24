import { EarningRequestDTO } from "@api/earning/dto";
import { dateIso8601 } from "@common/DateHelper";
import { Money } from "@common/money";

import { IEarningForm } from "../hooks";

export function formToRequest(form: IEarningForm): EarningRequestDTO {
  const { description, value, walletId, payed, paymentDate } = form;
  return EarningRequestDTO.build({
    descricao: description,
    valor: Money.toInteger(parseFloat(value)),
    carteiraId: walletId,
    pago: payed,
    pagamento: dateIso8601(paymentDate),
  })




}