import { FcTextField } from "components/fc-forms/fc-fields/fc-text-field";
import { useFormSubCategory } from "pages/category/hook";
import shallow from "zustand/shallow";

export default function FcTextFieldSubCategoryDescription() {
  const { invalidFields, description, setDescription } = useFormSubCategory(
    (s) => ({
      invalidFields: s.invalidFields,
      description: s.description,
      setDescription: s.setDescription,
    }),
    shallow
  );

  const descriptionInvalid = invalidFields?.filter((field) => {
    return field.name === "description";
  });

  return (
    <FcTextField
      id="sub-category-description"
      label="Sub Categoria"
      required
      value={description}
      invalidFields={descriptionInvalid}
      onChange={(event) => {
        setDescription(event.target.value);
      }}
    />
  );
}
