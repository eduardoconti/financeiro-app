import { useContext } from "react";
import {
  ContextFormSubCategory,
  FormSubCategoryContextType,
  SubCategoryFormType,
} from "../context/form-sub-category-context";

type UseFormSubCategoryHook = {
  clearAllFields: () => void;
  setFormSubCategory: (subCategoryForm: Partial<SubCategoryFormType>) => void;
  setInvalidFields: (error: any) => void;
};

export function useFormSubCategory(): FormSubCategoryContextType &
  UseFormSubCategoryHook {
  const context = useContext(
    ContextFormSubCategory
  ) as FormSubCategoryContextType;

  if (!context) {
    throw new Error(
      "useFormSubCategory must be used within a CategoryProvider"
    );
  }

  const clearAllFields = () => {
    context.dispatch({ type: "clearAll" });
  };

  const setFormSubCategory = (
    subCategoryForm: Partial<SubCategoryFormType>
  ) => {
    context.dispatch({
      type: "setFormSubCategory",
      payload: { ...context.formSubCategory, ...subCategoryForm },
    });
  };

  const setInvalidFields = (error: any) => {
    context.dispatch({
      type: "setInvalidFields",
      payload: {
        ...context.formSubCategory,
        invalidFields: error.invalidFields,
      },
    });
  };

  return { ...context, clearAllFields, setFormSubCategory, setInvalidFields };
}
