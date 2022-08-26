import { setCreatedAlert } from "@common/AlertFuncoes";
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { useSpin } from "@hooks/use-spin";
import { SubCategoryRequestDTO } from "api/sub-category/dto";
import { ContextAlert } from "Context";

import { useCategory, useFormSubCategory } from "pages/category/hook";
import { useContext } from "react";

export default function FcFormButtonInsertSubCategory(props: any) {
  const insertSubCategory  = useCategory((s)=>s.insertSubCategory);
  const {
    formSubCategory: { subCategoryDescription, categoryId },
    clearAllFields,
    setInvalidFields,
  } = useFormSubCategory();
  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {
        try {
          setSpin(true)
          const { status, message, internalMessage } = await insertSubCategory(
            SubCategoryRequestDTO.build({
              description: subCategoryDescription,
              categoryId: categoryId,
            })
          );
          setAlert(setCreatedAlert(status, message, internalMessage));
          clearAllFields();
        } catch (error: any) {
          setInvalidFields(error);
          setAlert(setCreatedAlert(error.status, error.detail, error.title));
        }finally{
          setSpin(false)
        }

      }}
      {...props}
    />
  );
}
