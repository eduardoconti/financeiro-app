import { ValidationErrorDTO } from "api/http-request/dto";
import * as React from "react";

export const ContextFormSubCategory = React.createContext<FormSubCategoryContextType | null>(
  null
);
export type SubCategoryFormType = {
  categoryId: number;
  subCategoryId: number;
  subCategoryDescription: string;
  invalidFields: ValidationErrorDTO[];
};

export type FormSubCategoryContextType = {
  formSubCategory: SubCategoryFormType;
  dispatch: React.Dispatch<Action>;
};

type Props = {
  children: React.ReactNode; // 👈️ added type for children
};

type Action = {
  type: "setFormSubCategory" | "clearAll" | "setInvalidFields";
  payload?: Partial<SubCategoryFormType>;
};

const emptyState = {
  categoryId: 0,
  subCategoryId: 0,
  subCategoryDescription: "",
  invalidFields: [],
};

const reducer = (
  state: SubCategoryFormType,
  action: Action
): SubCategoryFormType => {
  const { type, payload } = action;
  switch (type) {
    case "setFormSubCategory":
      return { ...state, ...payload };
    case "clearAll":
      return emptyState;
    case "setInvalidFields":
      return {
        ...state,
        invalidFields: payload?.invalidFields as ValidationErrorDTO[],
      };

    default:
      throw new Error("unexpected action type");
  }
};

const FormSubCategoryProvider: React.FC<Props> = ({ children }) => {
  const [formSubCategory, dispatch] = React.useReducer(reducer, emptyState);

  return (
    <ContextFormSubCategory.Provider
      value={{
        formSubCategory,
        dispatch,
      }}
    >
      {children}
    </ContextFormSubCategory.Provider>
  );
};

export default FormSubCategoryProvider;
