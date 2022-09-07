import { setCreatedAlert } from "@common/AlertFuncoes";
import { FcFormIconButtonAdd } from "@components/fc-forms/fc-form-button";
import { useSpin } from "@hooks/use-spin";
import { SubCategoryRequestDTO } from "api/sub-category/dto";
import { ContextAlert } from "Context";

import { useCategory, useFormSubCategory } from "pages/category/hook";
import { useContext } from "react";
import shallow from "zustand/shallow";

export default function FcFormButtonInsertSubCategory(props: any) {
  const insertSubCategory = useCategory((s) => s.insertSubCategory);
  const {
    categoryId,
    description,
    setDescription,
    setInvalidFields,
    setId,
  } = useFormSubCategory(
    (s) => ({
      categoryId: s.categoryId,
      description: s.description,
      setDescription: s.setDescription,
      setInvalidFields: s.setInvalidFields,
      setId: s.setId,
    }),
    shallow
  );

  const { setAlert } = useContext(ContextAlert);
  const setSpin = useSpin((s) => s.setSpin);
  return (
    <FcFormIconButtonAdd
      description="cadastrar"
      onClick={async () => {
        try {
          setSpin(true);
          const { status, message, internalMessage } = await insertSubCategory(
            SubCategoryRequestDTO.build({
              description,
              categoryId,
            })
          );
          setAlert(setCreatedAlert(status, message, internalMessage));
          setDescription("");
          setId(0);
        } catch (error: any) {
          setInvalidFields(error?.invalidFields);
          setAlert(setCreatedAlert(error.status, error.detail, error.title));
        } finally {
          setSpin(false);
        }
      }}
      {...props}
    />
  );
}
