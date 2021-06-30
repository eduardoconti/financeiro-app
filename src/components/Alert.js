import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

export default function AlertComponent(props) {
  const { alert, setAlert } = props;

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
