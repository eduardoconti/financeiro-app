import API from "./Api";

const ENDPOINT = "despesas/";

export async function getDespesas(
  stateCheckedDespesas,
  stateAnoAtual,
  stateMesAtual
) {
  try {
    let res;
    if (
      stateCheckedDespesas.checkedPago &&
      stateCheckedDespesas.checkedAberto
    ) {
      res = await API.get(ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual);
    } else if (stateCheckedDespesas.checkedPago) {
      res = await API.get(
        ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/?pago=true"
      );
    } else if (stateCheckedDespesas.checkedAberto) {
      res = await API.get(
        ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/?pago=false"
      );
    }
    return res.data;
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
    let res;
    if (
      stateCheckedDespesas.checkedPago &&
      stateCheckedDespesas.checkedAberto
    ) {
      res = await API.get(
        ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/categoria/valor/"
      );
    } else if (stateCheckedDespesas.checkedPago) {
      res = await API.get(
        ENDPOINT +
          stateAnoAtual +
          "/mes/" +
          stateMesAtual +
          "/categoria/valor/?pago=true"
      );
    } else if (stateCheckedDespesas.checkedAberto) {
      res = await API.get(
        ENDPOINT +
          stateAnoAtual +
          "/mes/" +
          stateMesAtual +
          "/categoria/valor/?pago=false"
      );
    }

    return res.data;
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
    let res;
    if (
      stateCheckedDespesas.checkedPago &&
      stateCheckedDespesas.checkedAberto
    ) {
      res = await API.get(
        ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/carteira/valor/"
      );
    } else if (stateCheckedDespesas.checkedPago) {
      res = await API.get(
        ENDPOINT +
          stateAnoAtual +
          "/mes/" +
          stateMesAtual +
          "/carteira/valor/?pago=true"
      );
    } else if (stateCheckedDespesas.checkedAberto) {
      res = await API.get(
        ENDPOINT +
          stateAnoAtual +
          "/mes/" +
          stateMesAtual +
          "/carteira/valor/?pago=false"
      );
    }

    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function deletaDespesa(id) {
  try {
    const res = await API.delete(ENDPOINT + id);
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
    const res = await API.patch(ENDPOINT + "flag/" + despesa.id, despesa);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function alteraDespesa(despesa) {
  try {
    const res = await API.put(ENDPOINT + despesa.id, despesa);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalDespesas(stateAnoAtual, stateMesAtual) {
  try {
    const endpoint =
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total";
    const res = await API.get(endpoint);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalGeralDespesasPagas() {
  try {
    const total = await API.get(ENDPOINT + "total/?pago=true");
    return total.data;
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
    let ep =
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/carteira/valor";
    if (typeof pago !== "undefined") {
      ep += "?pago=" + pago;
    }
    const total = await API.get(ep);
    return total.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalDespesasPagas(stateAnoAtual, stateMesAtual) {
  try {
    const res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total/?pago=true"
    );
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalDespesasAbertas(
  stateAnoAtual,
  stateMesAtual
) {
  try {
    const res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total/?pago=false"
    );
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaDespesaPorId(id) {
  try {
    const despesa = await API.get(ENDPOINT + "id/" + id);
    return despesa.data;
  } catch (error) {
    return errorResponse(error);
  }
}
export function formataDadosParaLinhasDataGrid(despesas) {
  return despesas.map((despesa) => {
    return {
      ...despesa,
      categoria: despesa.categoria.descricao,
      carteira: despesa.carteira.descricao,
      vencimento: new Date(despesa.vencimento).toUTCString().slice(5, 12),
      valor: despesa.valor.toFixed(2),
    };
  });
}

export function formataDadosParaFormulario(despesa) {
  return {
    ...despesa,
    categoria: despesa.categoria.id,
    carteira: despesa.carteira.id,
    vencimento: new Date(despesa.vencimento).toISOString().slice(0, 10),
  };
}

export async function rertornaDespesasAgrupadasPorMes(stateAnoAtual, pago) {
  try {
    const total = await API.get(ENDPOINT + stateAnoAtual + "/mes/");
    return total.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function getExpenseById(id) {
  try {
    const res = await API.get(ENDPOINT + "id/" + id);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

function errorResponse(error) {
  return error.response.data;
}
