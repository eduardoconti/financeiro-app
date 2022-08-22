import { getMonth, getYear } from "@common/DateHelper";
import create from "zustand";

export interface IUseCurrentTime {
  year: number;
  setYear: (year: number) => void;
  month: number;
  setMonth: (month: number) => void;
}

export const useCurrentTime = create<IUseCurrentTime>((set, get) => ({
  year: getYear(),
  setYear: (year: number) => set({ year: year }),
  month: getMonth(),
  setMonth: (month: number) => set({ month: month }),
}));

export const useGetCurrentTime = () => {
  const { year, month } = useCurrentTime();
  return { year, month };
};
