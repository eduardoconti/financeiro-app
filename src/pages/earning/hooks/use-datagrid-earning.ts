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
}
export const useDataGridEarning = create<IUseDatagridEarning>((set) => ({
  rows: [],
  setRows: (rows: IEarningRow[]) => set({ rows: rows }),
}));
