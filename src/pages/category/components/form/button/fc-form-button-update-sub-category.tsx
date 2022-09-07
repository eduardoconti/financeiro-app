import FcFormIconButtonUpdate from "components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { SubCategoryRequestDTO } from "api/sub-category/dto";
import { useCategory, useFormSubCategory } from "pages/category/hook";
import { useContext } from "react";
import { ContextAlert } from "Context";
import { useSpin } from "@hooks/use-spin";
import { setCreatedAlert } from "@common/AlertFuncoes";
import shallow from "zustand/shallow";

export default function FcFormButtonUpdateSubCategory() {
  const updateSubCategory = useCategory((s) => s.updateSubCategory);
  const {
    id,
    description,
    categoryId,
    clearAllFields,
    setInvalidFields,
  } = useFormSubCategory(
    (s) => ({
      id: s.id,
      description: s.description,
      categoryId: s.categoryId,
      clearAllFields: s.clearAllFields,
      setInvalidFields: s.setInvalidFields,
    }),
    shallow
  );
  const update = SubCategoryRequestDTO.build({
    id,
    description,
    categoryId: categoryId,
  });
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {
        try {
          setSpin(true);
          const { status, message, internalMessage } = await updateSubCategory(
            update
          );
          setAlert(setCreatedAlert(status, message, internalMessage));
          clearAllFields();
        } catch (error: any) {
          setInvalidFields(error?.invalidFields);
          setAlert(setCreatedAlert(error.status, error.detail, error.title));
        } finally {
          setSpin(false);
        }
      }}
    />
  );
}
