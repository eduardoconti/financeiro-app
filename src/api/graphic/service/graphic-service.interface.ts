import { SuccessResponseData } from "api/http-request/dto";

export interface IGraphicService {
  unplannedExpenses(): Promise<SuccessResponseData<any>>;

  //insereDespesa(despesa: ExpenseDTO): Promise<ExpenseResposeDTO>;
}
