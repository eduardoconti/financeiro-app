import API from "./Api";
import {
  firstDayOfMonth,
  lastDayOfMonth,
} from "./DateHelper";
const ENDPOINT = "earning";

export async function getReceitas(
  stateCheckedReceitas,
  stateAnoAtual,
  stateMesAtual
) {
  try {
    let res;

    if (
      (stateCheckedReceitas.payed &&
        stateCheckedReceitas.open) ||
      (!stateCheckedReceitas.payed && !stateCheckedReceitas.open)
    ) {
      res = await API.get(
        ENDPOINT +
          "?start=" +
          firstDayOfMonth(stateAnoAtual, stateMesAtual) +
          "&end=" +
          lastDayOfMonth(stateAnoAtual, stateMesAtual)
      );
    } else if (stateCheckedReceitas.payed) {
      res = await API.get(
        ENDPOINT +
          "?start=" +
          firstDayOfMonth(stateAnoAtual, stateMesAtual) +
          "&end=" +
          lastDayOfMonth(stateAnoAtual, stateMesAtual) +
          "&pago=true"
      );
    } else if (stateCheckedReceitas.open) {
      res = await API.get(
        ENDPOINT +
          "?start=" +
          firstDayOfMonth(stateAnoAtual, stateMesAtual) +
          "&end=" +
          lastDayOfMonth(stateAnoAtual, stateMesAtual) +
          "&pago=false"
      );
    }

    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaReceitasAgrupadasPorCarteiraChecked(
  stateCheckedReceitas,
  stateAnoAtual,
  stateMesAtual
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
      stateCheckedReceitas.payed &&
      stateCheckedReceitas.open
    ) {
    } else if (stateCheckedReceitas.payed) {
      endpoint += char + "pago=true";
    } else if (stateCheckedReceitas.open) {
      endpoint += char + "pago=false";
    }
    const { data } = await API.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalReceitas(stateAnoAtual, stateMesAtual) {
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

export async function retornaReceitasAgrupadasPorCarteira(
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
    errorResponse(error);
  }
}

function errorResponse(error) {
  return error.response.data;
}
