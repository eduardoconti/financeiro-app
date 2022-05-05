import { getDay } from "./DateHelper";

export function emptyFormularioDespesa(
  stateAnoAtual: number,
  stateMesAtual: number
) {

  return {
    descricao: "",
    categoriaId: undefined,
    carteiraId: undefined,
    valor: 0,
    pago: false,
    pagamento: new Date(stateAnoAtual, stateMesAtual, getDay())
      .toISOString()
      .slice(0, 10),
    vencimento: new Date(stateAnoAtual, stateMesAtual, getDay())
      .toISOString()
      .slice(0, 10),
    id: 0,
  };
}

export function emptyFormularioTransferencia(
  stateAnoAtual = 0,
  stateMesAtual = 0
) {

  return {
    id: 0,
    carteiraOrigemId: "",
    carteiraDestinoId: "",
    valor: 0,
    pago: false,
    transferencia: new Date(stateAnoAtual, stateMesAtual, getDay())
      .toISOString()
      .slice(0, 10),
  };
}

export function emptyFormularioReceita(
  stateAnoAtual: number,
  stateMesAtual: number
) {

  return {
    descricao: "",
    carteiraId: "",
    valor: 0,
    pago: false,
    pagamento: new Date(stateAnoAtual, stateMesAtual, getDay())
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
  reason: "",
  type: "",
  title: "",
};
