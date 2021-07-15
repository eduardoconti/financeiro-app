function stateAlert(title, message, type) {
  return {
    isOpen: true,
    title: title,
    message: message,
    type: type,
  };
}
export function retornaStateAlertAlteracaoFlagPago(
  codResponse,
  pago,
  tipo,
  error
) {
  let message = "";
  let type = "";
  let title = "";

  if (codResponse === 200) {
    title = "Alterado " + tipo + " para " + (pago ? "Pago" : "Aberto");
    type = "success";
  } else {
    title = "Falha ao alterar " + tipo;
    type = "error";
    message = "Erro: " + error;
  }

  return stateAlert(title, message, type);
}

export function retornaStateAlertExclusao(codResponse, tabela, error) {
  let message = "";
  let type = "";
  let title = "";

  if (codResponse === 200) {
    title = "Excluido " + tabela;
    type = "success";
  } else {
    title = "Falha ao Excluir ";
    type = "error";
    message = error;
  }

  return stateAlert(title, message, type);
}

export function retornaStateAlertCadastro(codResponse, tabela, error) {
  let message, type, title;

  if (codResponse === 200 || codResponse === 201) {
    title = (codResponse === 201 ? "Inserido " : "Alterado ") + tabela;
    type = "success";
  } else {
    title = "Falha ao Inserir/Alterar " + tabela;
    type = "error";
    message = " Erro: " + error;
  }

  return stateAlert(title, message, type);
}

export function AlertWarning(title, message) {
  return {
    isOpen: true,
    title: title,
    message: message,
    type: "warning",
  };
}

export function setExclusionAlert(codResponse, message, title) {
  let type;

  if (codResponse === 200) {
    type = "success";
  } else {
    type = "error";
  }

  return stateAlert(title, message, type);
}

export function setCreatedAlert(codResponse, message, title) {
  let type;

  if (codResponse === 200 || codResponse === 201) {
    type = "success";
  } else {
    type = "error";
  }

  return stateAlert(title, message, type);
}
