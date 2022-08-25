import { FcTextField } from "components/fc-forms/fc-fields/fc-text-field";
import { useFormCategory } from "pages/category/hook";

export default function FcTextFieldCategoryDescription(props: any) {
  const {
    state: { invalidFields = [], categoryDescription },
    dispatch,
  } = useFormCategory();

  const descriptionInvalid = invalidFields.filter((field) => {
    return field.name === "descricao";
  });
  return (
    <FcTextField
      id="category-description"
      required
      label="Categoria"
      invalidFields={descriptionInvalid}
      value={categoryDescription}
      onChange={(event) => {
        dispatch({
          type: "setCategoryDescription",
          categoryDescription: event.target.value,
        });
      }}
    />
  );
}
