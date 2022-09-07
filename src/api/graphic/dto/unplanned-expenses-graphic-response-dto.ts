import { ExpenseResponseDTO } from "@api/expense/dto";

export type UnplannedExpensesGraphicResponseDTO = {
  months: Months[];
  geral: Geral;
};

type Months = {
  month: string;
  total: number;
  totalOpen: number;
  totalPayed: number;
  quantity: number;
  data: ExpenseResponseDTO;
};

type Geral = {
  total: number;
  totalOpen: number;
  totalPayed: number;
  quantity: number;
};
