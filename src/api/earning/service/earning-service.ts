import { HttpRequestService } from "@api/http-request";
import { SuccessResponseData } from "@api/http-request/dto";
import { firstDayOfMonth, lastDayOfMonth } from "@common/DateHelper";
import { CheckedValues } from "@hooks/use-dash-values";
import {
  EarningDeleteResponseDTO,
  EarningRequestDTO,
  EarningResponseDTO,
} from "../dto";
import { IEarningService } from "./earning-service.interface";

const ENDPOINT = "earning";

export class EarningService implements IEarningService {
  private url!: URL;
  private httpRequestService: HttpRequestService;
  constructor() {
    this.httpRequestService = new HttpRequestService();
  }
  async getEarning(
    stateCheckedEarning?: CheckedValues,
    stateAnoAtual?: number,
    stateMesAtual?: number
  ): Promise<SuccessResponseData<EarningResponseDTO[]>> {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    if (
      typeof stateAnoAtual !== "undefined" &&
      typeof stateMesAtual !== "undefined"
    ) {
      this.url.searchParams.append(
        "start",
        firstDayOfMonth(stateAnoAtual, stateMesAtual)
      );
      this.url.searchParams.append(
        "end",
        lastDayOfMonth(stateAnoAtual, stateMesAtual)
      );
    }

    if (stateCheckedEarning) {
      if (!stateCheckedEarning.payed) {
        this.url.searchParams.append("pago", "false");
      }
      if (!stateCheckedEarning.open) {
        this.url.searchParams.append("pago", "true");
      }
    }

    const data = await this.httpRequestService.get<EarningResponseDTO[]>(
      this.url.toString()
    );
    return data;
  }

  async insert(
    Earning: EarningRequestDTO
  ): Promise<SuccessResponseData<EarningResponseDTO>> {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    const data = await this.httpRequestService.post<EarningResponseDTO>(
      this.url.toString(),
      Earning
    );
    return data;
  }

  async update(
    id: number,
    Earning: Partial<EarningRequestDTO>
  ): Promise<SuccessResponseData<EarningResponseDTO>> {
    this.url = new URL(
      (process.env.REACT_APP_API_HOST + ENDPOINT + "/" + id) as string
    );
    const data = await this.httpRequestService.put<EarningResponseDTO>({
      url: this.url.toString(),
      body: Earning,
    });
    return data;
  }

  async delete(
    id: number
  ): Promise<SuccessResponseData<EarningDeleteResponseDTO>> {
    this.url = new URL(
      (process.env.REACT_APP_API_HOST + ENDPOINT + "/" + id) as string
    );
    const data = await this.httpRequestService.delete<EarningDeleteResponseDTO>(
      { url: this.url.toString() }
    );
    return data;
  }

  async updateFlagPayed(
    id: number,
    patchFlag: Pick<EarningRequestDTO, "pago">
  ): Promise<SuccessResponseData<EarningResponseDTO>> {
    this.url = new URL(
      (process.env.REACT_APP_API_HOST + ENDPOINT + "/" + id) as string
    );
    const data = await this.httpRequestService.patch<EarningResponseDTO>(
      this.url.toString(),
      patchFlag
    );
    return data;
  }
}
