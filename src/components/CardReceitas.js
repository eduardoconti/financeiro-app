import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CheckboxLabels from "./CheckBox";
import CardActionArea from "@material-ui/core/CardActionArea";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";
import * as Constants from "../common/Constantes";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

export default function CardReceitas({ setStateCurrentBody }) {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);

  const valor = ctxTotais.stateTotais.totalReceitas;
  const stateChecked = ctxChecked.stateCheckedReceitas;
  const setStateChecked = ctxChecked.setStateCheckedReceitas;

  function onClik() {
    setStateCurrentBody(Constants.CORPO_RECEITAS);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <Card
        className="Card"
        variant="outlined"
        style={{ backgroundColor: "#f9fefb" }}
      >
        <CardActionArea onClick={() => onClik()}>
          <CardContent style={{ margin: 0, padding: 0 }}>
            <Typography
              variant="h5"
              style={{ color: "#85f07b", paddingTop: 5 }}
            >
              Receitas
            </Typography>
            <Typography variant="h6">{valor.toFixed(2)}</Typography>
          </CardContent>
        </CardActionArea>
        <CheckboxLabels
          setStateChecked={setStateChecked}
          stateChecked={stateChecked}
        />
      </Card>
    </MuiThemeProvider>
  );
}
