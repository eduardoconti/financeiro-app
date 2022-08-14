import * as React from "react";
import { Dispatch } from "react";

export const ContextFormCategory = React.createContext<FormCategoryContextType | null>(
  null
);
export type CategoryFormType = {
  categoryId: number;
  categoryDescription: string;
  subCategoryId: number;
  subCategoryDescription: string;
  invalidFields: InvalidField[];
};
export type InvalidField = {
  name: string;
  reason: string;
};
export type FormCategoryContextType = {
  state: CategoryFormType;
  dispatch: Dispatch<Action>;
};

type Props = {
  children: React.ReactNode; // 👈️ added type for children
};

type Action = {
  type:
    | "setCategoryId"
    | "setCategoryDescription"
    | "setSubCategoryId"
    | "setSubCategoryDescription"
    | "clearAll"
    | "setInvalidFields";
} & Partial<CategoryFormType>;

const emptyState = {
  categoryId: 0,
  categoryDescription: "",
  subCategoryId: 0,
  subCategoryDescription: "",
  invalidFields: [],
};
const reducer = (state: CategoryFormType, action: Action): CategoryFormType => {
  switch (action.type) {
    case "setCategoryId":
      return { ...state, categoryId: action.categoryId as number };
    case "setCategoryDescription":
      return {
        ...state,
        categoryDescription: action.categoryDescription as string,
      };
    case "setSubCategoryId":
      return { ...state, subCategoryId: action.subCategoryId as number };
    case "setSubCategoryDescription":
      return {
        ...state,
        subCategoryDescription: action.subCategoryDescription as string,
      };
    case "clearAll":
      return emptyState;
    case "setInvalidFields":
      return {
        ...state,
        invalidFields: action.invalidFields as InvalidField[],
      };
    default:
      throw new Error("unexpected action type");
  }
};
const FormCategoryProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, emptyState);

  return (
    <ContextFormCategory.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ContextFormCategory.Provider>
  );
};

export default FormCategoryProvider;
