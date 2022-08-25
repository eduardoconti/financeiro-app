import { ExpenseDTO, ExpenseResposeDTO } from "@api/expense/dto";
import { dateIso8601, formatDateToDataGrid } from "@common/DateHelper";
import { Money } from "@common/money";
import { CheckedValues } from "@hooks/use-dash-values";
import { ExpenseFormType, IDataGridRow } from "../context";

export function formToRequest(
  expenseForm: Omit<ExpenseFormType, "invalidFields">
): ExpenseDTO {
  return ExpenseDTO.build({
    id: expenseForm.id,
    descricao: expenseForm.description,
    categoriaId: expenseForm.categoryId,
    carteiraId: expenseForm.walletId,
    subCategoryId: expenseForm.subCategoryId,
    valor: Money.toInteger(parseFloat(expenseForm.value)),
    instalment: expenseForm.installments,
    vencimento: dateIso8601(expenseForm.dueDate),
    pagamento: expenseForm.paymentDate
      ? dateIso8601(expenseForm.paymentDate)
      : undefined,
    pago: expenseForm.payed,
  });
}

export function expenseToDataGrid(
  expenses: ExpenseResposeDTO[],
  checked?: CheckedValues
): IDataGridRow[] {
  const dataGridRows: IDataGridRow[] = [];
  expenses.forEach((expense) => {
    const {
      id,
      descricao,
      pago,
      valor,
      vencimento,
      pagamento,
      categoria,
      carteira,
      subCategory,
    } = expense;

    if (checked) {
      if (!checked.open && !pago) {
        return;
      }

      if (!checked.payed && pago) {
        return;
      }
    }
    dataGridRows.push({
      id: id,
      description: descricao,
      subCategoryId: subCategory.description,
      categoryId: categoria.descricao,
      payed: pago,
      walletId: carteira.descricao,
      dueDate: formatDateToDataGrid(vencimento),
      value: Money.format(valor),
      paymentDate: pagamento ? formatDateToDataGrid(pagamento) : undefined,
    });
  });
  return dataGridRows;
}
