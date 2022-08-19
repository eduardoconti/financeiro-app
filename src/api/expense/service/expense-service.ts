import { HttpRequestService } from "api/http-request";
import { SuccessResponseData } from "api/http-request/dto";
import {
  firstDayOfMonth,
  formatDateToDataGrid,
  formatDateToForm,
  lastDayOfMonth,
  Money,
} from "common";
import api from "common/Api";
import { ExpenseFilter } from "Context";
import { ExpenseDTO } from "../dto";
import { ExpenseResposeDTO } from "../dto/expense-response.dto";
import { IExpenseService } from "./expense-service.interface";

const ENDPOINT = "expense";

export type emptyChecked = {
  checkedPago: true;
  checkedAberto: true;
};
export class ExpenseService implements IExpenseService {
  private url!: URL;
  private httpRequestService: HttpRequestService;
  constructor() {
    this.httpRequestService = new HttpRequestService();
  }
  async getDespesas(
    stateCheckedDespesas: emptyChecked,
    stateAnoAtual: number,
    stateMesAtual: number,
    filter: ExpenseFilter
  ): Promise<SuccessResponseData<ExpenseResposeDTO[]>> {
    try {
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

      if (!stateCheckedDespesas.checkedPago) {
        this.url.searchParams.append("pago", "false");
      }
      if (!stateCheckedDespesas.checkedAberto) {
        this.url.searchParams.append("pago", "true");
      }
      const { dateField, categoryId, walletId } = filter;

      if (dateField) {
        this.url.searchParams.append("dateField", dateField);
      }

      if (categoryId) {
        this.url.searchParams.append("categoryId", categoryId.toString());
      }

      if (walletId) {
        this.url.searchParams.append("walletId", walletId.toString());
      }

      const data = await this.httpRequestService.get<ExpenseResposeDTO[]>(
        this.url.toString()
      );
      return data;
    } catch (error: any) {
      return errorResponse(error);
    }
  }

  async alteraFlagPago(
    despesa: Partial<ExpenseDTO>
  ): Promise<SuccessResponseData<ExpenseResposeDTO>> {
    try {
      this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
      const data = await this.httpRequestService.patch<ExpenseResposeDTO>(
        this.url.toString() + "/flag/" + despesa.id,
        despesa
      );
      return data;
    } catch (error: any) {
      return errorResponse(error);
    }
  }

  async getExpenseById(
    id: number
  ): Promise<SuccessResponseData<ExpenseResposeDTO>> {
    try {
      const data = await this.httpRequestService.get<ExpenseResposeDTO>(
        this.url.toString() + "/" + id
      );
      return data;
    } catch (error) {
      return errorResponse(error);
    }
  }

  async insert(expense: ExpenseDTO): Promise<SuccessResponseData<ExpenseResposeDTO>> {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT) as string);
    const data = await this.httpRequestService.post<ExpenseResposeDTO>(this.url.toString(), expense);
    return data;
  }

  async update(id: number, expense: Partial<ExpenseDTO>): Promise<SuccessResponseData<ExpenseResposeDTO>> {
    this.url = new URL((process.env.REACT_APP_API_HOST + ENDPOINT + '/' + id) as string);
    const data = await this.httpRequestService.put<ExpenseResposeDTO>({ url: this.url.toString(), body: expense });
    return data;
  }

}

export async function getValorDespesasPorCategoria(
  stateCheckedDespesas: emptyChecked,
  stateAnoAtual: number,
  stateMesAtual: number
) {
  try {
    let endpoint;
    let char = "?";
    endpoint = ENDPOINT + "/values/category";

    if (
      typeof stateAnoAtual !== "undefined" &&
      typeof stateMesAtual !== "undefined"
    ) {
      endpoint +=
        "?start=" +
        firstDayOfMonth(stateAnoAtual, stateMesAtual) +
        "&end=" +
        lastDayOfMonth(stateAnoAtual, stateMesAtual);
      char = "&";
    }

    if (!stateCheckedDespesas.checkedPago) {
      endpoint += char + "pago=false";
    }
    if (!stateCheckedDespesas.checkedAberto) {
      endpoint += char + "pago=true";
    }
    const { data } = await api.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function getValorDespesasPorCarteira(
  stateCheckedDespesas: emptyChecked,
  stateAnoAtual: number,
  stateMesAtual: number
) {
  try {
    let endpoint;
    let char = "?";
    endpoint = ENDPOINT + "/values/wallet";

    if (
      typeof stateAnoAtual !== "undefined" &&
      typeof stateMesAtual !== "undefined"
    ) {
      endpoint +=
        "?start=" +
        firstDayOfMonth(stateAnoAtual, stateMesAtual) +
        "&end=" +
        lastDayOfMonth(stateAnoAtual, stateMesAtual);
      char = "&";
    }
    if (
      stateCheckedDespesas.checkedPago &&
      stateCheckedDespesas.checkedAberto
    ) {
    } else if (stateCheckedDespesas.checkedPago) {
      endpoint += char + "pago=true";
    } else if (stateCheckedDespesas.checkedAberto) {
      endpoint += char + "pago=false";
    }
    const { data } = await api.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function deletaDespesa(id: number) {
  try {
    const res = await api.delete(ENDPOINT + "/" + id);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function alteraFlagPago(despesa: ExpenseDTO) {
  try {
    const res = await api.patch(ENDPOINT + "/flag/" + despesa.id, despesa);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function alteraDespesa(despesa: ExpenseDTO) {
  try {
    const res = await api.put(ENDPOINT + "/" + despesa.id, despesa);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalDespesas(
  stateAnoAtual: number,
  stateMesAtual: number
) {
  try {
    const query =
      stateAnoAtual && stateMesAtual
        ? "?start=" +
        firstDayOfMonth(stateAnoAtual, stateMesAtual) +
        "&end=" +
        lastDayOfMonth(stateAnoAtual, stateMesAtual)
        : "";
    const endpoint = ENDPOINT + "/values" + query;
    const res = await api.get(endpoint);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaDespesasAgrupadasPorCarteira(
  stateAnoAtual: number,
  stateMesAtual: number,
  pago: boolean
) {
  try {
    let endpoint;
    let char = "?";
    endpoint = ENDPOINT + "/values/wallet";

    if (
      typeof stateAnoAtual !== "undefined" &&
      typeof stateMesAtual !== "undefined"
    ) {
      endpoint +=
        "?start=" +
        firstDayOfMonth(stateAnoAtual, stateMesAtual) +
        "&end=" +
        lastDayOfMonth(stateAnoAtual, stateMesAtual);
      char = "&";
    }
    if (typeof pago !== "undefined") {
      endpoint += char + "pago=" + pago;
    }
    const { data } = await api.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaDespesaPorId(id: number) {
  try {
    const despesa = await api.get(ENDPOINT + "/" + id);
    return despesa.data;
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error: any) {
  console.log(error);
  return error.response.data;
}
