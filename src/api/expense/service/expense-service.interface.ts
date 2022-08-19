import { SuccessResponseData } from "api/http-request/dto";
import { ExpenseFilter } from "Context";
import { ExpenseDTO, ExpenseResposeDTO } from "../dto";
import { emptyChecked } from "./expense-service";

export interface IExpenseService {
  getDespesas(
    stateCheckedDespesas: emptyChecked,
    stateAnoAtual: number,
    stateMesAtual: number,
    filter: ExpenseFilter
  ): Promise<SuccessResponseData<ExpenseResposeDTO[]>>;

  insert(expense: ExpenseDTO): Promise<SuccessResponseData<ExpenseResposeDTO>>
  update(id: number, expense: Partial<ExpenseDTO>): Promise<SuccessResponseData<ExpenseResposeDTO>>
}
