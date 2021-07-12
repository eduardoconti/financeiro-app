import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Ano from "./BotaoAno";
import * as Constants from "../common/Constantes";
import LoginModal from "./LoginModal";
import { isAuthenticated } from "../common/Auth";

export default function LeftMenu({ setStateCurrentBody }) {
  const useStyles = makeStyles((theme) => ({
    botao: {
      backgroundColor: theme.palette.grey[800],
      width: "100%",
      boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
      color: "#FFF",
      "&:hover": {
        background: theme.palette.grey[800],
        boxShadow:
          "inset 2px 2px 1px 1px rgba(0, 0, 0, 0.1), 1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
      },
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function onClick(currentBody) {
    setStateCurrentBody(currentBody);
  }
  const nome = isAuthenticated() ? "logout" : " login";
  return (
    <Grid container item spacing={1}>
      <Grid item xs={4} lg={12}>
        <Button className={classes.botao} onClick={handleOpen}>
          {nome}
        </Button>
      </Grid>
      <Grid item xs={4} lg={12}>
        <Ano />
      </Grid>

      <Grid item xs={4} lg={12}>
        <Button
          className={classes.botao}
          onClick={() => {
            onClick(Constants.CORPO_CATEGORIAS);
          }}
        >
          Categorias
        </Button>
      </Grid>
      <Grid item xs={4} lg={12}>
        <Button
          className={classes.botao}
          onClick={() => {
            onClick(Constants.CORPO_CARTEIRAS);
          }}
        >
          Carteiras
        </Button>
      </Grid>
      <Grid item xs={4} lg={12}>
        <Button
          className={classes.botao}
          onClick={() => {
            onClick(Constants.CORPO_TRANSFERENCIAS);
          }}
        >
          Transf.
        </Button>
      </Grid>
      <Grid container item>
        <LoginModal
          open={open}
          setOpen={(open) => {
            setOpen(open);
          }}
          handleClose={() => {
            handleClose();
          }}
        />
      </Grid>
    </Grid>
  );
}
