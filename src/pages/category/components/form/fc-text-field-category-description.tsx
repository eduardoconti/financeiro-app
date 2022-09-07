import { FcTextField } from "components/fc-forms/fc-fields/fc-text-field";
import { useFormCategory } from "pages/category/hook";
import shallow from "zustand/shallow";

export default function FcTextFieldCategoryDescription(props: any) {
  const { invalidFields, setDescription, description } = useFormCategory(
    (s) => ({
      invalidFields: s.invalidFields,
      setDescription: s.setDescription,
      description: s.description,
    }),
    shallow
  );

  const descriptionInvalid = invalidFields?.filter((field) => {
    return field.name === "descricao";
  });
  return (
    <FcTextField
      id="category-description"
      required
      label="Categoria"
      invalidFields={descriptionInvalid}
      value={description}
      onChange={(event) => {
        setDescription(event.target.value);
      }}
    />
  );
}
