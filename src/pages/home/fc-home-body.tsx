
import { Grid } from "@material-ui/core";
import { isAuthenticated, setCreatedAlert } from "common";
import { HttpStatus } from "common/enum";
import { ContextAlert } from "Context";
import { useContext, useEffect } from "react";
import { FcGraphicsExpense, FcGraphicsGeneral, FcGraphicUnplannedExpenses } from "./components/fc-graphics";

export default function FcHomeBody() {
  const { setAlert } = useContext(ContextAlert);

  useEffect(() => {
    if (!isAuthenticated()) {
      setAlert(
        setCreatedAlert(
          HttpStatus.UNAUTHORIZED,
          "Faça o login para continuar",
          "Unauthorized"
        )
      );
    }
  }, [setAlert]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <FcGraphicsGeneral />
      </Grid>
      <Grid item xs={12} md={6}>
        <FcGraphicsExpense />
      </Grid>
      <Grid item xs={12} md={6}>
        <FcGraphicUnplannedExpenses />
      </Grid>
    </Grid>
  );
}
