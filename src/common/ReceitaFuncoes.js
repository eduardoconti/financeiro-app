import API from "./Api";
const ENDPOINT = "receitas/";

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
      res = await API.get(ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual);
    } else if (stateCheckedReceitas.checkedPago) {
      res = await API.get(
        ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/?pago=true"
      );
    } else if (stateCheckedReceitas.checkedAberto) {
      res = await API.get(
        ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/?pago=false"
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
    let res, endpoint;
    endpoint =
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/carteira/valor";
    if (
      stateCheckedReceitas.checkedPago &&
      stateCheckedReceitas.checkedAberto
    ) {
    } else if (stateCheckedReceitas.checkedPago) {
      endpoint += "?pago=true";
    } else if (stateCheckedReceitas.checkedAberto) {
      endpoint += "?pago=false";
    }
    res = await API.get(endpoint);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function deletaReceita(id) {
  try {
    const res = await API.delete(ENDPOINT + id);
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
    const res = await API.put(ENDPOINT + receita.id, receita);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function alteraFlagPago(receita) {
  try {
    const res = await API.patch(ENDPOINT + "flag/" + receita.id, receita);
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalReceitas(stateAnoAtual, stateMesAtual) {
  try {
    const res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total"
    );
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalReceitasPagas(stateAnoAtual, stateMesAtual) {
  try {
    const res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total/?pago=true"
    );

    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalGeralReceitasPagas() {
  try {
    const res = await API.get(ENDPOINT + "total/?pago=true");
    return res.data;
  } catch (error) {
    return errorResponse(error);
  }
}

export async function retornaTotalReceitasAbertas(
  stateAnoAtual,
  stateMesAtual
) {
  try {
    const res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total/?pago=false"
    );
    return res.data;
  } catch (error) {
    errorResponse(error);
  }
}

export async function retornaReceitasAgrupadasPorCarteira(
  stateAnoAtual,
  stateMesAtual,
  pago
) {
  try {
    let ep =
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/carteira/valor/";

    if (typeof pago !== "undefined") {
      ep += "?pago=" + pago;
    }
    const res = await API.get(ep);
    return res.data;
  } catch (error) {
    errorResponse(error);
  }
}

export async function retornaReceitaPorId(id) {
  try {
    const res = await API.get(ENDPOINT + "id/" + id);
    return res.data;
  } catch (error) {
    errorResponse(error);
  }
}

export async function rertornaReceitasAgrupadasPorMes(stateAnoAtual, pago) {
  try {
    const res = await API.get(ENDPOINT + stateAnoAtual + "/mes/");
    return res.data;
  } catch (error) {
    errorResponse(error);
  }
}

export function formataDadosParaLinhasDataGrid(receita) {
  return receita.map((receita) => {
    return {
      ...receita,
      carteira: receita.carteira.descricao,
      pagamento: new Date(receita.pagamento).toUTCString().slice(5, 12),
      valor: receita.valor.toFixed(2),
    };
  });
}

export function formataDadosParaFormulario(receita) {
  return {
    ...receita,
    carteira: receita.carteira.id,
    pagamento: new Date(receita.pagamento).toISOString().slice(0, 10),
  };
}

function errorResponse(error) {
  return error.response.data;
}
