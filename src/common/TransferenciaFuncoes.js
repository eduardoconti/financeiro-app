import API from "./Api";

const ENDPOINT = "transferencias/";
const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};
export async function getTransferencias(stateAnoAtual, stateMesAtual) {
  var res = new Array(0);

  res = await API.get(
    ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual,
    headers
  );

  return res.data;
}
export async function getTransferenciaPorId(id) {
  var res = new Array(0);

  res = await API.get(ENDPOINT + "id/" + id, headers);

  return res.data;
}

export async function deletaTransferencia(id) {
  try {
    const res = await API.delete(ENDPOINT + id, headers);
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Deletado Transferencia",
    };
  } catch (error) {
    return error.response.data;
  }
}

export async function insereTransferencia(transferencia) {
  try {
    const res = await API.post(ENDPOINT, transferencia, headers);
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Inserido Transferencia",
    };
  } catch (error) {
    return error.response.data;
  }
}
export async function alteraTransferencia(transferencia) {
  try {
    const res = await API.put(
      ENDPOINT + transferencia.id,
      transferencia,
      headers
    );
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Alterado Transferencia",
    };
  } catch (error) {
    return error.response.data;
  }
}
export async function alteraFlagPago(transferencia) {
  try {
    const res = await API.patch(
      ENDPOINT + "flag/" + transferencia.id,
      transferencia,
      headers
    );
    return {
      statusCode: res.status.valueOf(),
      data: res.data,
      message: "Alterado Flag Pago Transferencia",
    };
  } catch (error) {
    return error.response.data;
  }
}
export function formataDadosParaLinhasDataGrid(transferencia) {
  return transferencia.map((transferencia) => {
    return {
      ...transferencia,
      transferencia: new Date(transferencia.transferencia)
        .toISOString()
        .slice(0, 10),
      valor: transferencia.valor.toFixed(2),
      carteiraOrigem: transferencia.carteiraOrigem.descricao,
      carteiraDestino: transferencia.carteiraDestino.descricao,
    };
  });
}

export function formataDadosParaFormulario(transferencia) {
  return {
    ...transferencia,
    transferencia: new Date(transferencia.transferencia)
      .toISOString()
      .slice(0, 10),
    carteiraOrigem: transferencia.carteiraOrigem.id,
    carteiraDestino: transferencia.carteiraDestino.id,
  };
}

export async function retornaValoresTransferenciasOrigem(
  stateAnoAtual,
  stateMesAtual,
  pago
) {
  try {
    let ep =
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/valor/origem";
    if (typeof pago !== "undefined") {
      ep += "/?pago=" + pago;
    }
    const total = await API.get(ep, headers);
    return total.data;
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
    let ep =
      ENDPOINT + stateAnoAtual + "/mes/" + stateMesAtual + "/valor/destino";
    if (typeof pago !== "undefined") {
      ep += "/?pago=" + pago;
    }
    const total = await API.get(ep, headers);
    return total.data;
  } catch (error) {
    return error.response.status;
  }
}
