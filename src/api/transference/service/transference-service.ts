import { HttpRequestService } from "@api/http-request";
import { SuccessResponseData } from "@api/http-request/dto";
import { firstDayOfMonth, lastDayOfMonth } from "@common/DateHelper";
import {
  TransferenceDeleteResponseDTO,
  TransferenceRequestDTO,
  TransferenceResponseDTO,
} from "../dto";
import { ITransferenceService } from "./transference-service.interface";

const ENDPOINT = "transference";

export class TransferenceService implements ITransferenceService {
  private url!: URL;
  private httpRequestService: HttpRequestService;
  constructor() {
    this.httpRequestService = new HttpRequestService();
  }
  async getTransference(
    year?: number,
    month?: number
  ): Promise<SuccessResponseData<TransferenceResponseDTO[]>> {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    if (typeof year !== "undefined" && typeof month !== "undefined") {
      this.url.searchParams.append("start", firstDayOfMonth(year, month));
      this.url.searchParams.append("end", lastDayOfMonth(year, month));
    }

    const data = await this.httpRequestService.get<TransferenceResponseDTO[]>(
      this.url.toString()
    );
    return data;
  }

  async insert(
    Transference: TransferenceRequestDTO
  ): Promise<SuccessResponseData<TransferenceResponseDTO>> {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    const data = await this.httpRequestService.post<TransferenceResponseDTO>(
      this.url.toString(),
      Transference
    );
    return data;
  }

  async update(
    id: number,
    Transference: Partial<TransferenceRequestDTO>
  ): Promise<SuccessResponseData<TransferenceResponseDTO>> {
    this.url = new URL(
      (process.env.REACT_APP_API_HOST + ENDPOINT + "/" + id) as string
    );
    const data = await this.httpRequestService.put<TransferenceResponseDTO>({
      url: this.url.toString(),
      body: Transference,
    });
    return data;
  }

  async delete(
    id: number
  ): Promise<SuccessResponseData<TransferenceDeleteResponseDTO>> {
    this.url = new URL(
      (process.env.REACT_APP_API_HOST + ENDPOINT + "/" + id) as string
    );
    const data = await this.httpRequestService.delete<TransferenceDeleteResponseDTO>(
      { url: this.url.toString() }
    );
    return data;
  }

  async updateFlagPayed(
    id: number,
    patchFlag: Pick<TransferenceRequestDTO, "pago">
  ): Promise<SuccessResponseData<TransferenceResponseDTO>> {
    this.url = new URL(
      (process.env.REACT_APP_API_HOST + ENDPOINT + "/" + id) as string
    );
    const data = await this.httpRequestService.patch<TransferenceResponseDTO>(
      this.url.toString(),
      patchFlag
    );
    return data;
  }
}
