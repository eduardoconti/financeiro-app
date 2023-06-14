import { HttpRequestService } from "api/http-request";
import { SuccessResponseData } from "api/http-request/dto";

import { WalletRequestDTO, WalletResponseDTO } from "../dto";
import { IWalletService } from "./wallet.service.interface";
import { UpdateWalletRequestDTO } from "../dto/update-wallet-request.dto";

const ENDPOINT = "wallet";

export class WalletService implements IWalletService {
  private url: URL;
  private httpRequestService: HttpRequestService;
  constructor() {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    this.httpRequestService = new HttpRequestService();
  }
  async getAll(): Promise<SuccessResponseData<WalletResponseDTO[]>> {
    return await this.httpRequestService.get<WalletResponseDTO[]>(
      this.url.toString()
    );
  }

  async delete(id: number): Promise<any> {
    return await this.httpRequestService.delete<any>({
      url: this.url.toString() + "/" + id,
    });
  }

  async insert(
    body: WalletRequestDTO
  ): Promise<SuccessResponseData<WalletResponseDTO>> {
    return await this.httpRequestService.post<WalletResponseDTO>(
      this.url.toString(),
      body
    );
  }

  async update(
    body: UpdateWalletRequestDTO
  ): Promise<SuccessResponseData<WalletResponseDTO>> {
    const data = await this.httpRequestService.put<WalletResponseDTO>({
      url: this.url.toString() + "/" + body.id,
      body,
    });
    return data;
  }
}
