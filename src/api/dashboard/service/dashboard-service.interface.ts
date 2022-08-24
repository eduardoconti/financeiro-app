import { SuccessResponseData } from "api/http-request/dto";
import { GetDashBoardValuesType } from "../dto";

export interface IDashBoardService {
  getValues(params: IDashBoardParams): Promise<SuccessResponseData<GetDashBoardValuesType>>;
}

export interface IDashBoardParams {
  year: number
  month: number
}
