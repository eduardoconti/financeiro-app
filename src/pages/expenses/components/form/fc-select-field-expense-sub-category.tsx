import FcSelectFieldSubCategory from "components/fc-forms/fc-fields/fc-select-field-sub-category";
import { useFormExpense } from "@pages/expenses/hook/use-form-expense";
import shallow from "zustand/shallow";

export function FcSelectFieldExpenseSubCategory() {
  const {
    categoryId,
    invalidFields,
    subCategoryId,
    setSubCategoryId,
  } = useFormExpense(
    (s) => ({
      categoryId: s.categoryId,
      invalidFields: s.invalidFields,
      subCategoryId: s.subCategoryId,
      setSubCategoryId: s.setSubCategoryId,
    }),
    shallow
  );

  const invalidFieldMessage = invalidFields?.filter((field) => {
    return field.name === "subCategoryId";
  });
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategoryId(parseInt(event.target.value));
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
}
