import API from "./Api";
import {
  firstDayOfMonth,
  formatDateToDataGrid,
  formatDateToForm,
  lastDayOfMonth,
} from "./DateHelper";
import { Money } from "./money";
const ENDPOINT = "earning";

export async function getReceitas(
  stateCheckedReceitas,
  stateAnoAtual,
  stateMesAtual
) {
  try {
    let res;

    if (
      (stateCheckedReceitas.checkedPago &&
        stateCheckedReceitas.checkedAberto) ||
      (!stateCheckedReceitas.checkedPago && !stateCheckedReceitas.checkedAberto)
    ) {
      res = await API.get(
        ENDPOINT +
        "?start=" +
        firstDayOfMonth(stateAnoAtual, stateMesAtual) +
        "&end=" +
        lastDayOfMonth(stateAnoAtual, stateMesAtual)
      );
    } else if (stateCheckedReceitas.checkedPago) {
      res = await API.get(
        ENDPOINT +
        "?start=" +
        firstDayOfMonth(stateAnoAtual, stateMesAtual) +
        "&end=" +
        lastDayOfMonth(stateAnoAtual, stateMesAtual) +
        "&pago=true"
      );
    } else if (stateCheckedReceitas.checkedAberto) {
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
      stateCheckedReceitas.checkedPago &&
      stateCheckedReceitas.checkedAberto
    ) {
    } else if (stateCheckedReceitas.checkedPago) {
      endpoint += char + "pago=true";
    } else if (stateCheckedReceitas.checkedAberto) {
      endpoint += char + "pago=false";
    }
    const { data } = await API.get(endpoint);
    return data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function deletaReceita(id) {
  try {
    const res = await API.delete(ENDPOINT + "/" + id);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function insereReceita(receita) {
  try {
    const res = await API.post(ENDPOINT, receita);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function alteraReceita(receita) {
  try {
    const res = await API.put(ENDPOINT + "/" + receita.id, receita);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function alteraFlagPago(receita) {
  try {
    const res = await API.patch(ENDPOINT + "/" + receita.id, receita);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalReceitas(stateAnoAtual, stateMesAtual) {
  try {
    const query =
      (
        typeof stateAnoAtual !== "undefined" &&
        typeof stateMesAtual !== "undefined"
      )
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

export async function retornaReceitaPorId(id) {
  try {
    const res = await API.get(ENDPOINT + "/" + id);
    return res.data;
  } catch (error) {
    errorResponse(error);
  }
}

export function formataDadosParaLinhasDataGrid(receita) {
  return receita.map((receita) => {
    const { id, descricao, pago, valor } = receita;
    return {
      id: id,
      descricao: descricao,
      pago: pago,
      carteiraId: receita.carteira.descricao,
      pagamento: formatDateToDataGrid(receita.pagamento),
      valor: Money.format(valor),
    };
  });
}

export function formataDadosParaFormulario(receita) {
  const { id, descricao, pago, valor } = receita;
  return {
    valor: Money.toFloat(valor),
    id: id,
    descricao: descricao,
    pago: pago,
    carteiraId: receita.carteira.id,
    pagamento: formatDateToForm(receita.pagamento),
  };
}
export async function getYieldById(id) {
  try {
    const res = await API.get(ENDPOINT + "/" + id);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}
function errorResponse(error) {
  return error.response.data;
}
