import { CategoryRequestDTO } from "api/category/dto";

import FcFormIconButtonUpdate from "components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { useFormCategory } from "pages/category/hook/use-form-category";
import { useCategory } from "pages/category/hook";

export default function FcFormButtonUpdateCategory() {
  const { updateCategory } = useCategory();
  const { state, clearAllFields, setInvalidFields } = useFormCategory();
  const update = CategoryRequestDTO.build({
    id: state.categoryId,
    descricao: state.categoryDescription,
  });

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {
        try {
          await updateCategory(update);
          clearAllFields();
        } catch (error: any) {
          setInvalidFields(error);
        }
      }}
    />
  );
}
