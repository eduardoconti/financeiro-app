import create from "zustand";

export interface ITransferenceRow {
  id: number;
  walletOrigin: string;
  walletDestiny: string;
  value: string;
  payed: boolean;
  transferenceDate?: string;
}
export interface IUseDatagridTransference {
  rows: ITransferenceRow[];
  setRows: (rows: ITransferenceRow[]) => void;
}
export const useDataGridTransference = create<IUseDatagridTransference>(
  (set) => ({
    rows: [],
    setRows: (rows: ITransferenceRow[]) => set({ rows: rows }),
  })
);
