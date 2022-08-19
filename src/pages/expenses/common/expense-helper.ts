import { ExpenseDTO } from "@api/expense/dto";
import { dateIso8601 } from "@common/DateHelper";
import { Money } from "@common/money";
import { ExpenseFormType } from "../context";

export function formToRequest(expenseForm: ExpenseFormType): ExpenseDTO {

  return ExpenseDTO.build({
    id: expenseForm.id,
    descricao: expenseForm.description,
    categoriaId: expenseForm.categoryId,
    carteiraId: expenseForm.walletId,
    subCategoryId: expenseForm.subCategoryId,
    valor: Money.toInteger(parseFloat(expenseForm.value)),
    instalment: expenseForm.installments,
    vencimento: dateIso8601(expenseForm.dueDate),
    pagamento: expenseForm.paymentDate ? dateIso8601(expenseForm.paymentDate) : undefined,
    pago: expenseForm.payed,

  })
}