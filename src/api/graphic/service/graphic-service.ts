import { HttpRequestService } from "api/http-request";
import { SuccessResponseData } from "api/http-request/dto";
import { GeneralGraphicResponseDTO } from "../dto/general-graphic-response-dto";
import { UnplannedExpensesGraphicResponseDTO } from "../dto/unplanned-expenses-graphic-response-dto";
import { IGraphicService } from "./graphic-service.interface";

const ENDPOINT = "graphic";

export class GraphicService implements IGraphicService {
  private url: URL;
  private httpRequestService: HttpRequestService;

  constructor() {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    this.httpRequestService = new HttpRequestService();
  }

  async unplannedExpenses(): Promise<SuccessResponseData<UnplannedExpensesGraphicResponseDTO>> {
    const data = await this.httpRequestService.get<UnplannedExpensesGraphicResponseDTO>(
      this.url.toString() + "/expenses/unplanned"
    );
    return data;
  }

  async general(): Promise<SuccessResponseData<GeneralGraphicResponseDTO>> {
    const data = await this.httpRequestService.get<GeneralGraphicResponseDTO>(
      this.url.toString() + "/general"
    );
    return data;
  }
}
