import create from "zustand";

export interface IEarningRow {
  id: number;
  description: string;
  walletId: string;
  value: string;
  payed: boolean;
  paymentDate?: string;
}
export interface IUseDatagridEarning {
  rows: IEarningRow[];
  setRows: (rows: IEarningRow[]) => void;
  selectedRows: number[];
  setSelectedRows: (rows: number[]) => void;
  addSelectedRows: (rowId: number) => void;
}
export const useDataGridEarning = create<IUseDatagridEarning>((set) => ({
  rows: [],
  setRows: (rows: IEarningRow[]) => set({ rows: rows }),
  selectedRows: [],
  setSelectedRows: (rows: number[]) => set((s) => ({ ...s, selectedRows: rows })),
  addSelectedRows: (rowId: number) => set((s) => ({ ...s, selectedRows: [rowId, ...s.selectedRows] }))

}));
