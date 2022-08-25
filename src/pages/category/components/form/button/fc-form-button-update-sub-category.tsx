import FcFormIconButtonUpdate from "components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { SubCategoryRequestDTO } from "api/sub-category/dto";
import { useFormCategory } from "pages/category/hook/use-form-category";
import { useCategory } from "pages/category/hook";

export default function FcFormButtonUpdateSubCategory() {
  const { updateSubCategory } = useCategory();
  const { state, clearAllFields, setInvalidFields } = useFormCategory();
  const update = SubCategoryRequestDTO.build({
    id: state.categoryId,
    description: state.subCategoryDescription,
    categoryId: state.categoryId,
  });

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {
        try {
          await updateSubCategory(update);
          clearAllFields();
        } catch (error: any) {
          setInvalidFields(error);
        }
      }}
    />
  );
}
