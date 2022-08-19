import { ValidationErrorDTO } from "api/http-request/dto";
import * as React from "react";

export const ContextFormExpense = React.createContext<FormExpenseContextType | null>(
  null
);
export type ExpenseFormType = {
  id: number;
  description: string;
  categoryId: number;
  subCategoryId: number;
  walletId: number;
  dueDate: string;
  payed: boolean;
  value: string;
  installments: number;
  paymentDate?: string;
  invalidFields?: ValidationErrorDTO[];
};

export type FormExpenseContextType = {
  formExpense: ExpenseFormType;
  dispatch: React.Dispatch<Action>;
};

type Props = {
  children: React.ReactNode; // 👈️ added type for children
};

type Action = {
  type: "setFormExpense" | "clearAll" | "setInvalidFields";
  payload?: Partial<ExpenseFormType>;
};

const emptyState = {
  id: 0,
  description: "",
  categoryId: 0,
  subCategoryId: 0,
  walletId: 0,
  dueDate: "",
  payed: false,
  value: "0",
  paymentDate: "",
  installments: 1,
  invalidFields: [],
};

const reducer = (state: ExpenseFormType, action: Action): ExpenseFormType => {
  const { type, payload } = action;
  switch (type) {
    case "setFormExpense":
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

const FormExpenseProvider: React.FC<Props> = ({ children }) => {
  const [formExpense, dispatch] = React.useReducer(reducer, emptyState);

  return (
    <ContextFormExpense.Provider
      value={{
        formExpense,
        dispatch,
      }}
    >
      {children}
    </ContextFormExpense.Provider>
  );
};

export default FormExpenseProvider;
