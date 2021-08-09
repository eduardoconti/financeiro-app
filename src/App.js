import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import GraficosContainer from "./components/GraficosContainer";

import Dash from "./components/Dash";
import { SpinProvider } from "./Context/SpinContext";
import { CheckedProvider } from "./Context/CheckedContext";
import { TotaisProvider } from "./Context/TotaisContext";
import { AnoMesProvider } from "./Context/AnoMesContext";
import { AlertProvider } from "./Context/AlertContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ButtonAppBar from "./components/fc-app-bar/fc-app-bar";
import BotaoMes from "./components/BotaoMes";
import FcExpense from "./pages/expenses/fc-expense";
import AlertComponent from "./components/Alert";
import FcYield from "./pages/yield/fc-yield";
import FcTransfer from "./pages/transfer/fc-transfer";
import FcBalance from "./pages/balance/fc-balance";
import FcBalanceMonth from "./pages/balance-month/fc-balance-month";
import FcWallet from "./pages/wallet/fc-wallet";
import FcCategory from "./pages/category/fc-category";
import { getModeType, isDefinedMode, setMode } from "./common/Config";

function App() {
  if (!isDefinedMode()) {
    setMode(false);
  }

  const [darkTheme, setDarkTheme] = useState(getModeType());

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? "dark" : "light",
      primary: {
        main: darkTheme ? "#BB86FC" : "#3700B3",
      },
      secondary: {
        main: darkTheme ? "#03DAC5" : "#018786",
      },
      error: {
        main: darkTheme ? "#CF6679" : "#B00020",
      },
      background: {
        default: darkTheme ? "#121212" : "#FFF",
        paper01: darkTheme ? "rgba(255, 255, 255,0.04)" : "rgba(0, 0, 0,0.04)",
        paper02: darkTheme
          ? "rgba(255, 255, 255, 0.07)"
          : "rgba(0, 0, 0, 0.07)",
        paper03: darkTheme
          ? "rgba(255, 255, 255, 0.12)"
          : "rgba(0, 0, 0, 0.12)",
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
        "@media (min-width:0px) and (orientation: landscape)": {
          minHeight: 42,
        },
        "@media(min-width:600px)": {
          minHeight: 48,
        },
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      minHeight: 48,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <SpinProvider>
        <AlertProvider>
          <CheckedProvider>
            <TotaisProvider>
              <AnoMesProvider>
                <div
                  style={{
                    backgroundColor: theme.palette.background.default,
                    display: "flex",
                  }}
                >
                  <CssBaseline>
                    <Router>
                      <ButtonAppBar
                        setDarkTheme={(darkTheme) => setDarkTheme(darkTheme)}
                        darkTheme={darkTheme}
                      />

                      <main className={classes.content}>
                        <AlertComponent />
                        <div className={classes.toolbar} />
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={9}>
                            <Grid container spacing={1}>
                              <Grid item xs={12}>
                                <BotaoMes />
                              </Grid>
                              <Grid item xs={12}>
                                <Dash />
                              </Grid>
                              <Grid item xs={12}>
                                <Switch>
                                  <Route exact path="/" component={FcExpense} />
                                  <Route path="/receitas" component={FcYield} />
                                  <Route
                                    path="/transferencias"
                                    component={FcTransfer}
                                  />
                                  <Route
                                    path="/balanco"
                                    component={FcBalance}
                                  />
                                  <Route
                                    path="/saldo"
                                    component={FcBalanceMonth}
                                  />
                                  <Route
                                    path="/carteiras"
                                    component={FcWallet}
                                  />
                                  <Route
                                    path="/categorias"
                                    component={FcCategory}
                                  />
                                </Switch>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <GraficosContainer />
                          </Grid>
                        </Grid>
                      </main>
                    </Router>
                  </CssBaseline>
                </div>
              </AnoMesProvider>
            </TotaisProvider>
          </CheckedProvider>
        </AlertProvider>
      </SpinProvider>
    </MuiThemeProvider>
  );
}

export default App;
