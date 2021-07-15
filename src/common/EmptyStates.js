export function emptyFormularioDespesa(stateAnoAtual, stateMesAtual) {
  let dia = new Date().getDate();

  return {
    descricao: "",
    categoria: 0,
    carteira: 0,
    valor: 0,
    pago: false,
    pagamento: new Date(stateAnoAtual, stateMesAtual - 1, dia)
      .toISOString()
      .slice(0, 10),
    vencimento: new Date(stateAnoAtual, stateMesAtual - 1, dia)
      .toISOString()
      .slice(0, 10),
    id: 0,
  };
}

export function emptyFormularioTransferencia(stateAnoAtual, stateMesAtual) {
  let dia = new Date().getDate();

  return {
    id: 0,
    carteiraOrigem: "",
    carteiraDestino: "",
    valor: 0,
    pago: false,
    transferencia: new Date(stateAnoAtual, stateMesAtual - 1, dia)
      .toISOString()
      .slice(0, 10),
  };
}

export function emptyFormularioReceita(stateAnoAtual, stateMesAtual) {
  let dia = new Date().getDate();

  return {
    descricao: "",
    carteira: "",
    valor: 0,
    pago: false,
    pagamento: new Date(stateAnoAtual, stateMesAtual - 1, dia)
      .toISOString()
      .slice(0, 10),
    id: 0,
  };
}

export const emptyFormularioCategoria = {
  descricao: "",
  id: 0,
};

export const emptyFormularioCarteira = {
  descricao: "",
  id: 0,
};
export const emptyTotais = {
  totalDespesas: 0,
  totalReceitas: 0,
  saldo: 0,
  balanco: 0,
};

export const emptyChecked = {
  checkedPago: true,
  checkedAberto: true,
};

export const emptyAlertState = {
  isOpen: false,
  message: "",
  type: "",
  title: "",
};
