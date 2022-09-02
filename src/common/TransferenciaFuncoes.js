import API from "./Api";
import {
  firstDayOfMonth,
  lastDayOfMonth,
} from "./DateHelper";

const ENDPOINT = "transference";
const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function retornaValoresTransferenciasOrigem(
  stateAnoAtual,
  stateMesAtual,
  pago
) {
  try {
    let endpoint;
    let char = "?";
    endpoint = ENDPOINT + "/values/origin";

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
    const { data } = await API.get(endpoint, headers);
    return data;
  } catch (error) {
    return error.response.status;
  }
}

export async function retornaValoresTransferenciasDestino(
  stateAnoAtual,
  stateMesAtual,
  pago
) {
  try {
    let endpoint;
    let char = "?";
    endpoint = ENDPOINT + "/values/destiny";

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
    const { data } = await API.get(endpoint, headers);
    return data;
  } catch (error) {
    return error.response.status;
  }
}
