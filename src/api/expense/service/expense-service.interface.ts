import { CheckedValues } from "@hooks/use-dash-values";
import { SuccessResponseData } from "api/http-request/dto";
import { ExpenseFilter } from "Context";
import {
  ExpenseDeleteResponseDTO,
  ExpenseDTO,
  ExpenseResposeDTO,
} from "../dto";
export interface IExpenseService {
  getDespesas(
    stateCheckedDespesas: CheckedValues,
    stateAnoAtual: number,
    stateMesAtual: number,
    filter?: ExpenseFilter
  ): Promise<SuccessResponseData<ExpenseResposeDTO[]>>;

  insert(expense: ExpenseDTO): Promise<SuccessResponseData<ExpenseResposeDTO>>;
  update(
    id: number,
    expense: Partial<ExpenseDTO>
  ): Promise<SuccessResponseData<ExpenseResposeDTO>>;
  delete(id: number): Promise<SuccessResponseData<ExpenseDeleteResponseDTO>>;
  updateFlagPayed(
    id: number,
    patchFlag: Pick<ExpenseDTO, "pago">
  ): Promise<SuccessResponseData<ExpenseResposeDTO>>;
}
