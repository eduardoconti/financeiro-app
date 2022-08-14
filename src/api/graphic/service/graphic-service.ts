import { HttpRequestService } from "api/http-request";
import { SuccessResponseData } from "api/http-request/dto";
import { IGraphicService } from "./graphic-service.interface";

const ENDPOINT = "graphic";

export class GraphicService implements IGraphicService {
  private url: URL;
  private httpRequestService: HttpRequestService;
  constructor() {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    this.httpRequestService = new HttpRequestService();
  }
  async unplannedExpenses(): Promise<SuccessResponseData<any>> {
    try {
      const data = await this.httpRequestService.get<any[]>(
        this.url.toString() + "/expenses/unplanned"
      );
      return data;
    } catch (error: any) {
      return errorResponse(error);
    }
  }
}

function errorResponse(error: any) {
  return error.response.data;
}
