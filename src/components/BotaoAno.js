import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Menu from "./fc-forms/fc-menu-tem/fc-menu-item";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CardActionArea from "@material-ui/core/CardActionArea";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { Box } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    // display: "flex",
    // flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },

  botao: {
    //background: theme.palette.background.paper,
    minHeight: 36,
    borderRadius: "50%",
    textAlign: "center",
    fontWeight: "bold",
    padding: theme.spacing(1),
  },
  ativo: {
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    minHeight: 36,
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));

export default function BotaoAno() {
  const ctxAnoMes = useContext(ContextAnoMes);
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const setStateAnoAtual = ctxAnoMes.setStateAnoAtual;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ano, setAno] = React.useState(stateAnoAtual);

  const handleChange = (event) => {
    setAno(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirm = () => {
    setOpen(false);
    setStateAnoAtual(ano);
  };

  const Anos = Menu([
    { id: 2020, descricao: "2020" },
    { id: 2021, descricao: "2021" },
    { id: 2022, descricao: "2022" },
    { id: 2023, descricao: "2023" },
  ]);
  return (
    <Box>
      <CardActionArea onClick={handleClickOpen} className={classes.botao}>
        {stateAnoAtual}
      </CardActionArea>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Selecione o Ano</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Ano</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={ano}
                onChange={handleChange}
                input={<Input />}
              >
                {Anos}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirm} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
