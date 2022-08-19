import create from 'zustand'

export interface IWalletRow {
  id: number
  description: string
}
export interface IUseDatagridWallet {
  rows: IWalletRow[]
  setRows: (rows: IWalletRow[]) => void
}
export const useDataGridWallet = create<IUseDatagridWallet>((set) => ({
  rows: [],
  setRows: (rows: IWalletRow[]) => set({ rows: rows }),
}))
