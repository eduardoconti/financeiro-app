import React from "react";

export type DataGridExpenseContextType = {
  rows: IDataGridRow[];
  setRows: (rows: IDataGridRow[]) => void;
  setSelectedRows: (rows: number[]) => void;
  selectedRows?: number[];
};
const ContextDataGridExpense = React.createContext<DataGridExpenseContextType | null>(
  null
);

type Props = {
  children: React.ReactNode; // 👈️ added type for children
};

export interface IDataGridRow {
  id: number;
  description: string;
  categoryId: string;
  subCategoryId: string;
  walletId: string;
  dueDate: string;
  payed: boolean;
  value: string;
  paymentDate?: string;
}

const DataGridExpenseProvider: React.FC<Props> = ({ children }) => {
  const [rows, setRows] = React.useState<IDataGridRow[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  return (
    <ContextDataGridExpense.Provider
      value={{
        rows,
        setRows,
        selectedRows,
        setSelectedRows,
      }}
    >
      {children}
    </ContextDataGridExpense.Provider>
  );
};

export { ContextDataGridExpense, DataGridExpenseProvider };
