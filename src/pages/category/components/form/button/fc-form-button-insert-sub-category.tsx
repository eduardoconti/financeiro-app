import { SubCategoryRequestDTO } from "api/sub-category/dto";

import FcFormIconButtonAdd from "components/fc-forms/fc-form-button/fc-form-icon-button-add";
import { useCategory, useFormSubCategory } from "pages/category/hook";

export default function FcFormButtonInsertSubCategory(props: any) {
  const { insertSubCategory } = useCategory();
  const {
    formSubCategory: { subCategoryDescription, categoryId },
    clearAllFields,
    setInvalidFields,
  } = useFormSubCategory();

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {
        try {
          await insertSubCategory(
            SubCategoryRequestDTO.build({
              description: subCategoryDescription,
              categoryId: categoryId,
            })
          );
          clearAllFields();
        } catch (error: any) {
          setInvalidFields(error);
        }
      }}
      {...props}
    />
  );
}
