import { Grid } from "@material-ui/core";
import { isAuthenticated, setCreatedAlert } from "common";
import { HttpStatus } from "common/enum";
import { ContextAlert } from "Context";
import { useContext, useEffect } from "react";
import FcGraphicsExpense from "../../components/fc-graphics/fc-graphics-expense";
import FcGraphicsGeneral from "../../components/fc-graphics/fc-graphics-general";
import FcGraphicsYeld from "../../components/fc-graphics/fc-graphics-yeld";

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
        <FcGraphicsYeld />
      </Grid>
    </Grid>
  );
}
