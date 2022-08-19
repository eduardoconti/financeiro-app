
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { CategoryRequestDTO } from "api/category/dto";

import { useCategory } from "pages/category/hook";
import { useFormCategory } from "pages/category/hook/use-form-category";

export default function FcFormButtonInsertCategory() {
  const { insertCategory } = useCategory();
  const { state, clearAllFields, setInvalidFields } = useFormCategory();

  const categoryRequest = CategoryRequestDTO.build({
    id: state.categoryId,
    descricao: state.categoryDescription,
  });

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {
        try {
          await insertCategory(categoryRequest);
          clearAllFields();
        } catch (error: any) {
          setInvalidFields(error);
        }
      }}
    />
  );
}
