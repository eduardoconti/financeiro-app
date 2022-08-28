import { useContext } from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Snackbar, SnackbarOrigin, useTheme } from "@material-ui/core";
import { ContextAlert } from "../Context/AlertContext";

export default function AlertComponent() {
  const { alert, setAlert } = useContext(ContextAlert);
  const { breakpoints } = useTheme();
  const handleClose = () => {
    setAlert({
      ...alert,
      isOpen: false,
    });
  };

  const anchorOrigin: SnackbarOrigin = {
    vertical:
      window.innerWidth > breakpoints.values.sm ? "bottom" : "top",
    horizontal:
      window.innerWidth > breakpoints.values.sm ? "left" : "center",
  };
  return (
    <Snackbar
      open={alert.isOpen}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      autoHideDuration={4000}
    >
      <Alert variant="standard" severity={alert.type} onClose={handleClose}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.message}
        {alert.reason ? <p>{alert.reason}</p> : null}
      </Alert>
    </Snackbar>
  );
}
