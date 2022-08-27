import create from "zustand";

export interface IDataGridExpenseRow {
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
export interface IUseDatagridExpense {
  rows: IDataGridExpenseRow[];
  setRows: (rows: IDataGridExpenseRow[]) => void;
  selectedRows: number[];
  setSelectedRows: (rows: number[]) => void;
  addSelectedRows: (rowId: number) => void;
}
export const useDataGridExpense= create<IUseDatagridExpense>((set) => ({
  rows: [],
  setRows: (rows: IDataGridExpenseRow[]) => set((s) => ({ ...s, rows: rows })),
  selectedRows: [],
  setSelectedRows: (rows: number[]) => set({selectedRows: rows }),
  addSelectedRows: (rowId: number) => set((s) => ({ ...s, selectedRows: [rowId, ...s.selectedRows] }))
}));
