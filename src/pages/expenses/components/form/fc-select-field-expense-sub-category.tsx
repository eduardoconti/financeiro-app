import FcSelectFieldSubCategory from "components/fc-forms/fc-fields/fc-select-field-sub-category";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import { useMemo } from "react";

export function FcSelectFieldExpenseSubCategory() {
  const {
    dispatch,
    formExpense: { categoryId, subCategoryId, invalidFields },
  } = useFormExpense();

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "subCategoryId";
  });
  return useMemo(() => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "setFormExpense",
        payload: { subCategoryId: parseInt(event.target.value) },
      });
    };

    return (
      <FcSelectFieldSubCategory
        id="subCategoryId"
        categoryId={categoryId}
        onChange={onChange}
        value={subCategoryId}
        invalidFields={invalidFieldMessage}
        required
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, subCategoryId, invalidFields]);
}
