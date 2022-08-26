import { CheckedValues } from "@hooks/use-dash-values";
import { SuccessResponseData } from "api/http-request/dto";
import { ExpenseFilter } from "Context";
import {
  ExpenseDeleteResponseDTO,
  ExpenseDTO,
  ExpenseResponseDTO,
} from "../dto";
export interface IExpenseService {
  getDespesas(
    stateCheckedDespesas: CheckedValues,
    stateAnoAtual: number,
    stateMesAtual: number,
    filter?: ExpenseFilter
  ): Promise<SuccessResponseData<ExpenseResponseDTO[]>>;

  insert(expense: ExpenseDTO): Promise<SuccessResponseData<ExpenseResponseDTO>>;
  update(
    id: number,
    expense: Partial<ExpenseDTO>
  ): Promise<SuccessResponseData<ExpenseResponseDTO>>;
  delete(id: number): Promise<SuccessResponseData<ExpenseDeleteResponseDTO>>;
  updateFlagPayed(
    id: number,
    patchFlag: Pick<ExpenseDTO, "pago">
  ): Promise<SuccessResponseData<ExpenseResponseDTO>>;
}
