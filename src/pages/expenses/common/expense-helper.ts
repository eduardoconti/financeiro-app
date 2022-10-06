import { ExpenseDTO, ExpenseResponseDTO } from "@api/expense/dto";
import {
  addMonth,
  dateIso8601,
  formatDateToDataGrid,
} from "@common/DateHelper";
import { Money } from "@common/money";
import { CheckedValues } from "@hooks/use-dash-values";
import { ExpenseFilter, IExpenseForm } from "../hook";
import { IDataGridExpenseRow } from "../hook/use-data-grid-expense";

export function formToRequest(
  expenseForm: Omit<IExpenseForm, "invalidFields">
): ExpenseDTO {
  return ExpenseDTO.build({
    id: expenseForm.id,
    descricao: expenseForm.description,
    categoriaId: expenseForm.categoryId,
    carteiraId: expenseForm.walletId,
    subCategoryId: expenseForm.subCategoryId,
    valor: Money.toInteger(parseFloat(expenseForm.value)),
    instalment: parseInt(expenseForm.installments),
    vencimento: dateIso8601(expenseForm.dueDate),
    pagamento: expenseForm.paymentDate
      ? dateIso8601(expenseForm.paymentDate)
      : undefined,
    pago: expenseForm.payed,
  });
}

export function expenseToDataGrid(
  expenses: ExpenseResponseDTO[],
  checked?: CheckedValues,
  filter?: ExpenseFilter
): IDataGridExpenseRow[] {
  const dataGridRows: IDataGridExpenseRow[] = [];
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

    if (filter) {
      const { categoryId, walletId, subCategoryId } = filter;
      if (
        categoryId &&
        categoryId.length > 0 &&
        !categoryId.includes(categoria.id)
      )
        return;
      if (walletId && walletId.length > 0 && !walletId.includes(carteira.id))
        return;
      if (
        subCategoryId &&
        subCategoryId.length > 0 &&
        !subCategoryId.includes(subCategory.id)
      )
        return;
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

export function expenseToRequest(expense: ExpenseResponseDTO): ExpenseDTO {
  const {
    carteira,
    categoria,
    subCategory,
    vencimento,
    descricao,
    ...rest
  } = expense;
  const nextDate = addMonth(vencimento);
  const split = descricao.split("/");
  let newDescription = descricao;
  if (split.length === 2) {
    newDescription = parseInt(split[0]) + 1 + "/" + split[1];
  }
  return {
    ...rest,
    id: undefined,
    carteiraId: carteira.id,
    categoriaId: categoria.id,
    subCategoryId: subCategory.id,
    vencimento: nextDate,
    descricao: newDescription,
    pago: false,
    pagamento: undefined,
  };
}
