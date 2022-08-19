import { SuccessResponseData } from "@api/http-request/dto";
import { EarningDeleteResponseDTO, EarningRequestDTO, EarningResponseDTO } from "../dto";


export interface IEarningService {
  getEarning(
    stateCheckedEarnings: EmptyChecked,
    stateYear: number,
    stateMonth: number,
  ): Promise<SuccessResponseData<EarningResponseDTO[]>>;

  insert(Earning: EarningRequestDTO): Promise<SuccessResponseData<EarningResponseDTO>>
  update(id: number, Earning: Partial<EarningRequestDTO>): Promise<SuccessResponseData<EarningResponseDTO>>
  delete(id: number): Promise<SuccessResponseData<EarningDeleteResponseDTO>>
  updateFlagPayed(id: number, patchFlag: Pick<EarningRequestDTO, 'pago'>): Promise<SuccessResponseData<EarningResponseDTO>>
}

export type EmptyChecked = {
  checkedPago: true;
  checkedAberto: true;
};
