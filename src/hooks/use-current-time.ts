import { getMonth, getYear } from "@common/DateHelper";
import create from "zustand";
import shallow from "zustand/shallow";

export interface IUseCurrentTime {
  year: number;
  setYear: (year: number) => void;
  month: number;
  setMonth: (month: number) => void;
}

export const useCurrentTime = create<IUseCurrentTime>((set, get) => ({
  year: getYear(),
  setYear: (year: number) => set((s) => ({ ...s, year: year })),
  month: getMonth(),
  setMonth: (month: number) => set((s) => ({ ...s, month: month })),
}));

export const useGetCurrentTime = () => {
  const { year, month } = useCurrentTime(
    (state) => ({
      year: state.year,
      month: state.month,
    }),
    shallow
  );
  return { year, month };
};
