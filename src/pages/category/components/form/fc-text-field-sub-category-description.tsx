import { useMemo } from "react";

import { FcTextField } from "components/fc-forms/fc-fields/fc-text-field";
import { useFormSubCategory } from "pages/category/hook";

export default function FcTextFieldSubCategoryDescription() {
  const {
    formSubCategory: { subCategoryDescription, invalidFields = [] },
    setFormSubCategory,
  } = useFormSubCategory();
  return useMemo(() => {
    const descriptionInvalid = invalidFields.filter((field) => {
      return field.name === "description";
    });
    return (
      <FcTextField
        id="sub-category-description"
        label="Sub Categoria"
        required
        value={subCategoryDescription}
        invalidFields={descriptionInvalid}
        onChange={(event) => {
          setFormSubCategory({
            subCategoryDescription: event.target.value,
          });
        }}
      />
    );
  }, [invalidFields, subCategoryDescription, setFormSubCategory]);
}
