import FcSelectFieldCategory from "components/fc-forms/fc-fields/fc-select-field-category";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import { useMemo } from "react";
export function FcSelectFieldExpenseCategory() {
  const {
    formExpense: { categoryId },
    dispatch,
  } = useFormExpense();

  return useMemo(() => {
    const onChange = (event: any) => {
      dispatch({
        type: "setFormExpense",
        payload: { categoryId: event.target.value },
      });
    };
    return (
      <FcSelectFieldCategory
        id="select-field-category"
        label="Categoria"
        value={categoryId}
        onChange={onChange}
      />
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);
}
