import { useContext } from "react";
import { ContextFormCategory, FormCategoryContextType } from "../context";

type UseFormCategoryHook = {
  setInvalidFields: (error?: any) => void;
  clearAllFields: () => void;
};

export function useFormCategory(): FormCategoryContextType &
  UseFormCategoryHook {
  const context = useContext(ContextFormCategory) as FormCategoryContextType;

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  const setInvalidFields = (error?: any) => {
    context.dispatch({
      type: "setInvalidFields",
      invalidFields: error?.invalidFields ?? [],
    });
  };

  const clearAllFields = () => {
    context.dispatch({ type: "clearAll" });
  };
  return { ...context, setInvalidFields, clearAllFields };
}
