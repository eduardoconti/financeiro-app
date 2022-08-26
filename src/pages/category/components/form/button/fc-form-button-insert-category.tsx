import { setCreatedAlert } from "@common/AlertFuncoes";
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { useSpin } from "@hooks/use-spin";
import { CategoryRequestDTO } from "api/category/dto";
import { ContextAlert } from "Context";

import { useCategory } from "pages/category/hook";
import { useFormCategory } from "pages/category/hook/use-form-category";
import { useContext } from "react";

export default function FcFormButtonInsertCategory() {
  const { insertCategory } = useCategory();
  const { state, clearAllFields, setInvalidFields } = useFormCategory();
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  const categoryRequest = CategoryRequestDTO.build({
    id: state.categoryId,
    descricao: state.categoryDescription,
  });

  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {
        try {
          const { status, message, internalMessage } = await insertCategory(categoryRequest);
          setAlert(setCreatedAlert(status, message, internalMessage));
          clearAllFields();
        } catch (error: any) {
          setInvalidFields(error);
          setAlert(setCreatedAlert(error.status, error.detail, error.title));
        } finally {
          setSpin(false)
        }
      }}
    />
  );
}
