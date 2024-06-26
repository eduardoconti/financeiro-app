import API from "./Api";
import { firstDayOfMonth, lastDayOfMonth } from "./DateHelper";

const ENDPOINT = "expense";

export async function getValorDespesasPorCategoria(
  stateCheckedDespesas,
  stateAnoAtual,
  stateMesAtual
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

    if (!stateCheckedDespesas.payed) {
      endpoint += char + "pago=false";
    }
    if (!stateCheckedDespesas.open) {
      endpoint += char + "pago=true";
    }
    const { data } = await API.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalDespesas(stateAnoAtual, stateMesAtual) {
  try {
    const query =
      typeof stateAnoAtual !== "undefined" &&
      typeof stateMesAtual !== "undefined"
        ? "?start=" +
          firstDayOfMonth(stateAnoAtual, stateMesAtual) +
          "&end=" +
          lastDayOfMonth(stateAnoAtual, stateMesAtual)
        : "";
    const endpoint = ENDPOINT + "/values" + query;
    const res = await API.get(endpoint);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaDespesasAgrupadasPorCarteira(
  stateAnoAtual,
  stateMesAtual,
  pago
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
    const { data } = await API.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error) {
  return error.response.data;
}
