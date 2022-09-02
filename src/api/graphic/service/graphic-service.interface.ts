import { SuccessResponseData } from "api/http-request/dto";
import { GeneralGraphicResponseDTO } from "../dto/general-graphic-response-dto";

export interface IGraphicService {
  unplannedExpenses(): Promise<SuccessResponseData<any>>;
  general(): Promise<SuccessResponseData<GeneralGraphicResponseDTO>>
}
