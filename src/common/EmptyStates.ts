import { formatDateToForm } from "./DateHelper";

export function emptyFormularioDespesa() {
  return {
    descricao: "",
    categoriaId: "",
    carteiraId: "",
    subCategoryId: 0,
    valor: 0,
    pago: false,
    pagamento: undefined,
    vencimento: formatDateToForm(),
    instalment: 1,
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
    transferencia: formatDateToForm(),
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
    pagamento: formatDateToForm(),
    id: 0,
  };
}

export const emptyFormularioCategoria = {
  descricao: "",
  id: 0,
  subCategoryId: 0,
  subCategoryDescription: "",
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
  reason: "test",
  type: "",
  title: "",
};
