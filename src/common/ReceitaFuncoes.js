import API from "./Api";

const ENDPOINT = "receitas/";
const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function getReceitas(
  stateCheckedReceitas,
  stateAnoAtual,
  stateMesAtual
) {
  var res = new Array(0);

  if (
    (stateCheckedReceitas.checkedPago && stateCheckedReceitas.checkedAberto) ||
    (!stateCheckedReceitas.checkedPago && !stateCheckedReceitas.checkedAberto)
  ) {
    res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual,
      headers
    );
  } else if (stateCheckedReceitas.checkedPago) {
    res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/?pago=true",
      headers
    );
  } else if (stateCheckedReceitas.checkedAberto) {
    res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/?pago=false",
      headers
    );
  }

  return res.data;
}

export async function retornaReceitasAgrupadasPorCarteiraChecked(
  stateCheckedReceitas,
  stateAnoAtual,
  stateMesAtual
) {
  var res = new Array(0);

  if (
    (stateCheckedReceitas.checkedPago && stateCheckedReceitas.checkedAberto) ||
    (!stateCheckedReceitas.checkedPago && !stateCheckedReceitas.checkedAberto)
  ) {
    res = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/carteira/valor",
      headers
    );
  } else if (stateCheckedReceitas.checkedPago) {
    res = await API.get(
      ENDPOINT +
        stateAnoAtual +
        "/mes/" +
        stateMesAtual +
        "/carteira/valor?pago=true",
      headers
    );
  } else if (stateCheckedReceitas.checkedAberto) {
    res = await API.get(
      ENDPOINT +
        stateAnoAtual +
        "/mes/" +
        stateMesAtual +
        "/carteira/valor?pago=false",
      headers
    );
  }

  return res.data;
}

export async function deletaReceita(id) {
  try {
    const res = await API.delete(ENDPOINT + id, headers);
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Deletado Receita",
    };
  } catch (error) {
    return error.response.data;
  }
}

export async function insereReceita(receita) {
  try {
    const res = await API.post(ENDPOINT, receita, headers);
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Inserido Receita",
    };
  } catch (error) {
    return errorResponse(error.response.data);
  }
}
export async function alteraReceita(receita) {
  try {
    const res = await API.put(ENDPOINT + receita.id, receita, headers);
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Alterado Receita",
    };
  } catch (error) {
    return errorResponse(error.response.data);
  }
}
export async function alteraFlagPago(receita) {
  try {
    const res = await API.patch(
      ENDPOINT + "flag/" + receita.id,
      receita,
      headers
    );
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Alterado Flag Pago Receita",
    };
  } catch (error) {
    return error.response.data;
  }
}
export async function retornaTotalReceitas(stateAnoAtual, stateMesAtual) {
  try {
    const total = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total",
      headers
    );
    return total.data;
  } catch (error) {
    return error.response.status;
  }
}

export async function retornaTotalReceitasPagas(stateAnoAtual, stateMesAtual) {
  try {
    const total = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total/?pago=true",
      headers
    );
    if (!total.data) {
      return 0;
    }
    return total.data;
  } catch (error) {
    return error.response.status;
  }
}

export async function retornaTotalGeralReceitasPagas() {
  try {
    const total = await API.get(ENDPOINT + "total/?pago=true", headers);
    if (!total.data) {
      return 0;
    }
    return total.data;
  } catch (error) {
    return error.response.status;
  }
}

export async function retornaTotalReceitasAbertas(
  stateAnoAtual,
  stateMesAtual
) {
  try {
    const total = await API.get(
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/total/?pago=false",
      headers
    );
    if (!total.data) {
      return 0;
    }
    return total.data;
  } catch (error) {
    return error.response.status;
  }
}

export async function retornaReceitasAgrupadasPorCarteira(
  stateAnoAtual,
  stateMesAtual,
  pago
) {
  try {
    const total = await API.get(
      ENDPOINT +
        stateAnoAtual +
        "/mes/" +
        stateMesAtual +
        "/carteira/valor/?pago=" +
        pago,
      headers
    );
    return total.data;
  } catch (error) {
    return error.response.status;
  }
}

export async function retornaReceitaPorId(id) {
  var res = new Array(0);
  res = await API.get(ENDPOINT + "id/" + id, headers);
  return res.data;
}

export async function rertornaReceitasAgrupadasPorMes(stateAnoAtual, pago) {
  try {
    const total = await API.get(ENDPOINT + stateAnoAtual + "/mes/", headers);
    return total.data;
  } catch (error) {
    return error.response.status;
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
  return {
    statusCode: error.statusCode,
    data: error.response,
    message: error.response.message,
  };
}
