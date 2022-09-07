import { CategoryRequestDTO } from "api/category/dto";

import FcFormIconButtonUpdate from "components/fc-forms/fc-form-button/fc-form-icon-button-update";
import { useFormCategory } from "pages/category/hook/use-form-category";
import { useCategory } from "pages/category/hook";
import { useContext } from "react";
import { useSpin } from "@hooks/use-spin";
import { ContextAlert } from "Context";
import { setCreatedAlert } from "@common/AlertFuncoes";
import shallow from "zustand/shallow";

export default function FcFormButtonUpdateCategory() {
  const updateCategory = useCategory((s) => s.updateCategory);
  const {
    id,
    description: descricao,
    clearAllFields,
    setInvalidFields,
  } = useFormCategory(
    (s) => ({
      id: s.id,
      description: s.description,
      clearAllFields: s.clearAllFields,
      setInvalidFields: s.setInvalidFields,
    }),
    shallow
  );
  const update = CategoryRequestDTO.build({
    id,
    descricao,
  });
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);

  return (
    <FcFormIconButtonUpdate
      description="alterar"
      onClick={async () => {
        try {
          setSpin(true);
          const { status, message, internalMessage } = await updateCategory(
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
