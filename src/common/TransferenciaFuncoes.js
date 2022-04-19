import API from "./Api";
import { firstDayOfMonth, lastDayOfMonth } from "./DateHelper";

const ENDPOINT = "transference";
const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};
export async function getTransferencias(stateAnoAtual, stateMesAtual) {
  var res = new Array(0);

  res = await API.get(
    ENDPOINT + "?start=" +
    firstDayOfMonth(stateAnoAtual, stateMesAtual) +
    "&end=" +
    lastDayOfMonth(stateAnoAtual, stateMesAtual),
    headers
  );

  return res.data;
}
export async function getTransferenciaPorId(id) {
  var res = new Array(0);

  res = await API.get(ENDPOINT + "/" + id, headers);

  return res.data;
}

export async function deletaTransferencia(id) {
  try {
    const { data } = await API.delete(ENDPOINT + "/" + id, headers);
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function insereTransferencia(transferencia) {
  try {
    const { data } = await API.post(ENDPOINT, transferencia, headers);
    return data;
  } catch (error) {
    return error.response.data;
  }
}
export async function alteraTransferencia(transferencia) {
  try {
    const { data } = await API.put(
      ENDPOINT + transferencia.id,
      transferencia,
      headers
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}
export async function alteraFlagPago(transferencia) {
  try {
    const { data } = await API.patch(
      ENDPOINT + "/flag/" + transferencia.id,
      transferencia,
      headers
    );
    return data;
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
    let endpoint;
    let char = "?";
    endpoint =
      ENDPOINT + "/values/origin"

    if (typeof stateAnoAtual !== 'undefined' && typeof stateMesAtual !== 'undefined') {
      endpoint += "?start=" +
        firstDayOfMonth(stateAnoAtual, stateMesAtual) +
        "&end=" +
        lastDayOfMonth(stateAnoAtual, stateMesAtual);
      char = "&"
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
    endpoint =
      ENDPOINT + "/values/destiny"

    if (typeof stateAnoAtual !== 'undefined' && typeof stateMesAtual !== 'undefined') {
      endpoint += "?start=" +
        firstDayOfMonth(stateAnoAtual, stateMesAtual) +
        "&end=" +
        lastDayOfMonth(stateAnoAtual, stateMesAtual);
      char = "&"
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
