import { SuccessResponseData } from "api/http-request/dto";
import { GeneralGraphicResponseDTO } from "../dto/general-graphic-response-dto";
import { UnplannedExpensesGraphicResponseDTO } from "../dto/unplanned-expenses-graphic-response-dto";

export interface IGraphicService {
  unplannedExpenses(): Promise<SuccessResponseData<UnplannedExpensesGraphicResponseDTO>>;
  general(): Promise<SuccessResponseData<GeneralGraphicResponseDTO>>
}
