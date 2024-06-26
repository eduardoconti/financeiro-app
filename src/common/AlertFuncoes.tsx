function stateAlert(title: string, message: string, type: string) {
  return {
    isOpen: true,
    title: title,
    message: message,
    type: type,
  };
}

export function setCreatedAlert(
  status: number,
  message: string,
  title: string
) {
  let type;

  if ([200, 201, 204].includes(status)) {
    type = "success";
  } else {
    type = "error";
  }

  return stateAlert(title, message, type);
}
