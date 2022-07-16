import { SuccessResponseData } from "api/http-request/dto";
import { ExpenseFilter } from "Context";
import { ExpenseDTO, ExpenseResposeDTO } from "../dto";
import { emptyChecked } from "./expense-service";

export interface IExpenseService {
  getDespesas(
    stateCheckedDespesas: emptyChecked,
    stateAnoAtual: number,
    stateMesAtual: number,
    filter: ExpenseFilter,
  ): Promise<SuccessResponseData<ExpenseResposeDTO[]>>;

  //insereDespesa(despesa: ExpenseDTO): Promise<ExpenseResposeDTO>;
}
