import { firstDayOfMonth, lastDayOfMonth } from "@common/DateHelper";
import { HttpRequestService } from "api/http-request";
import { SuccessResponseData } from "api/http-request/dto";
import { GetDashBoardValuesType } from "../dto";
import {
  IDashBoardParams,
  IDashBoardService,
} from "./dashboard-service.interface";

const ENDPOINT = "dashboard";

export class DashBoardService implements IDashBoardService {
  private url!: URL;
  private httpRequestService: HttpRequestService;

  constructor() {
    this.httpRequestService = new HttpRequestService();
  }

  async getValues(
    params: IDashBoardParams
  ): Promise<SuccessResponseData<GetDashBoardValuesType>> {
    this.url = new URL(
      (process.env.REACT_APP_API_HOST + ENDPOINT + "/values") as string
    );
    const { year, month } = params;
    this.url.searchParams.append("start", firstDayOfMonth(year, month));
    this.url.searchParams.append("end", lastDayOfMonth(year, month));
    const data = await this.httpRequestService.get<GetDashBoardValuesType>(
      this.url.toString()
    );
    return data;
  }
}
