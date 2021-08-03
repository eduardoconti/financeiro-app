import React, { useContext } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { ContextAlert } from "../Context/AlertContext";
export default function AlertComponent() {
  const ctxAlert = useContext(ContextAlert);
  const alert = ctxAlert.alert,
    setAlert = ctxAlert.setAlert;

  const handleClose = () => {
    setAlert({
      ...alert,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={alert.isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={4000}
    >
      <Alert variant="filled" severity={alert.type} onClose={handleClose}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
