import FcSelectFieldCategory from "components/fc-forms/fc-fields/fc-select-field-category";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import shallow from "zustand/shallow";
export function FcSelectFieldExpenseCategory() {
  const { categoryId, invalidFields, setCategoryId } = useFormExpense(
    (s) => ({
      categoryId: s.categoryId,
      invalidFields: s.invalidFields,
      setCategoryId: s.setCategoryId,
    }),
    shallow
  );

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "categoriaId";
  });

  const onChange = (event: any) => {
    setCategoryId(parseInt(event.target.value));
  };
  return (
    <FcSelectFieldCategory
      id="select-field-category"
      label="Categoria"
      value={categoryId}
      onChange={onChange}
      invalidFields={invalidFieldMessage}
      required
    />
  );
}
