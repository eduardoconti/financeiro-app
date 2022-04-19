function stateAlert(title, message, type) {
  return {
    isOpen: true,
    title: title,
    message: message,
    type: type,
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
