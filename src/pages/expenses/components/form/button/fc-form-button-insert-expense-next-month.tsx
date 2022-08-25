import { setCreatedAlert } from "@common/AlertFuncoes";
import { addMonth } from "@common/DateHelper";
import FcFormIconButtonAddNextMonth from "@components/fc-forms/fc-form-button/fc-form-icon-button-add-next-month";
import { useSpin } from "@hooks/use-spin";
import { useExpense, useFormExpense } from "@pages/expenses/hook";
import { ContextAlert } from "Context";
import { useContext } from "react";
import shallow from "zustand/shallow";

export function FcFormButtonInsertExpenseNextMonth() {
  const { id, setInvalidFields, clearAllFields } = useFormExpense(
    (s) => ({
      id: s.id,
      invalidFields: s.invalidFields,
      setInvalidFields: s.setInvalidFields,
      clearAllFields: s.clearAllFields,
    }),
    shallow
  );

  const { insertExpenseNextMonth, expenses } = useExpense(
    (s) => ({
      insertExpenseNextMonth: s.insertExpenseNextMonth,
      expenses: s.expenses,
    }),
    shallow
  );

  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  const onClick = async () => {
    try {
      setSpin(true);
      const expense = expenses.find((e) => e.id === id);
      if (!expense) return;

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
      const { status, message, internalMessage } = await insertExpenseNextMonth(
        {
          ...rest,
          id: undefined,
          carteiraId: carteira.id,
          categoriaId: categoria.id,
          subCategoryId: subCategory.id,
          vencimento: nextDate,
          descricao: newDescription,
          pago: false,
          pagamento: undefined,
        }
      );
      setAlert(setCreatedAlert(status, message, internalMessage));
      clearAllFields();
    } catch (error: any) {
      setInvalidFields(error);
      setAlert(setCreatedAlert(error.status, error.detail, error.title));
    } finally {
      setSpin(false);
    }
  };
  return (
    <FcFormIconButtonAddNextMonth
      description="next-month-expense"
      disabled={id === 0}
      onClick={onClick}
    />
  );
}
