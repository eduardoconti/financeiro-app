export function emptyFormularioDespesa() {
  return {
    descricao: "",
    categoria: "",
    carteira: "",
    valor: 0,
    pago: false,
    pagamento: new Date().toISOString().slice(0, 10),
    vencimento: new Date().toISOString().slice(0, 10),
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

export function emptyFormularioReceita() {
  return {
    descricao: "",
    carteira: "",
    valor: 0,
    pago: false,
    pagamento: new Date().toISOString().slice(0, 10),
    id: 0,
  };
}

export const emptyAlertState = {
  isOpen: false,
  message: "",
  type: "",
  title: "",
};

export function emptyFormularioTransferencia() {
  return {
    id: 0,
    carteiraOrigem: "",
    carteiraDestino: "",
    valor: 0,
    pago: false,
    dataTransferencia: new Date().toISOString().slice(0, 10),
  };
}
