import API from "./Api";
import {
  firstDayOfMonth,
  formatDateToDataGrid,
  formatDateToForm,
  lastDayOfMonth,
} from "./DateHelper";
import { Money } from "./money";

const ENDPOINT = "expense";

export async function getDespesas(
  stateCheckedDespesas,
  stateAnoAtual,
  stateMesAtual
) {
  try {
    let endpoint = ENDPOINT;
    let char = "?";
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

    const { data } = await API.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

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

    if (!stateCheckedDespesas.checkedPago) {
      endpoint += char + "pago=false";
    }
    if (!stateCheckedDespesas.checkedAberto) {
      endpoint += char + "pago=true";
    }
    const { data } = await API.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function getValorDespesasPorCarteira(
  stateCheckedDespesas,
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
      stateCheckedDespesas.checkedPago &&
      stateCheckedDespesas.checkedAberto
    ) {
    } else if (stateCheckedDespesas.checkedPago) {
      endpoint += char + "pago=true";
    } else if (stateCheckedDespesas.checkedAberto) {
      endpoint += char + "pago=false";
    }
    const { data } = await API.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function deletaDespesa(id) {
  try {
    const res = await API.delete(ENDPOINT + "/" + id);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function insereDespesa(despesa) {
  try {
    const res = await API.post(ENDPOINT, despesa);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function alteraFlagPago(despesa) {
  try {
    const res = await API.patch(ENDPOINT + "/flag/" + despesa.id, despesa);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function alteraDespesa(despesa) {
  try {
    const res = await API.put(ENDPOINT + "/" + despesa.id, despesa);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalDespesas(stateAnoAtual, stateMesAtual) {
  try {
    const query =
      stateAnoAtual && stateMesAtual
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

export async function retornaDespesaPorId(id) {
  try {
    const despesa = await API.get(ENDPOINT + "/" + id);
    return despesa.data;
  } catch (error) {
    return errorResponse(error);
  }
}
export function formataDadosParaLinhasDataGrid(despesas) {
  return despesas.map((despesa) => {
    const { id, descricao, pago, valor, vencimento, pagamento } = despesa;
    return {
      id: id,
      descricao: descricao,
      pago: pago,
      valor: Money.format(valor),
      categoriaId: despesa.categoria.descricao,
      carteiraId: despesa.carteira.descricao,
      vencimento: formatDateToDataGrid(vencimento),
      pagamento: pagamento ? formatDateToDataGrid(pagamento) : undefined,
    };
  });
}

export async function getExpenseById(id) {
  try {
    const res = await API.get(ENDPOINT + "/" + id);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export function buildParams(
  stateAnoAtual,
  stateMesAtual,
  stateCheckedDespesas
) {
  let endpoint = "";
  let char = "";
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
  return endpoint;
}

function errorResponse(error) {
  return error.response.data;
}
