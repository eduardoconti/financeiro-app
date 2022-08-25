import create from "zustand";

export interface IUseSpin {
  spin: boolean;
  setSpin: (spin: boolean) => void;
}

export const useSpin = create<IUseSpin>((set) => ({
  spin: false,
  setSpin: (spin: boolean) => set({ spin: spin }),
}));
