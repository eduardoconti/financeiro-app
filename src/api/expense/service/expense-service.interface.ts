import { SuccessResponseData } from "api/http-request/dto";
import { ExpenseResposeDTO } from "../dto";
import { emptyChecked } from "./expense-service";

export interface IExpenseService {
  getDespesas(
    stateCheckedDespesas: emptyChecked,
    stateAnoAtual: number,
    stateMesAtual: number
  ): Promise<SuccessResponseData<ExpenseResposeDTO[]>>;
}
