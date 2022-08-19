import React from "react";
import { Grid } from "@material-ui/core";

import Dash from "./components/Dash";
import { SpinProvider } from "./Context/SpinContext";
import { CheckedProvider } from "./Context/CheckedContext";
import { TotaisProvider } from "./Context/TotaisContext";
import { AnoMesProvider } from "./Context/AnoMesContext";
import { AlertProvider } from "./Context/AlertContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createTheme,
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
import FcHome from "./pages/home/fc-home";
import CategoryProvider from "pages/category/context/category-context";
import ExpenseProvider from "pages/expenses/context/expense-context";
import ExpenseFilterProvider from "Context/expense-filter-context";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = React.useState("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [setMode]
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: mode,
          background: {
            default: mode === "dark" ? "#121212" : "#FFF",
            paper: mode === "dark" ? "#212121" : "#fafafa",
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
      }),
    [mode]
  );

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
      padding: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <SpinProvider>
          <AlertProvider>
            <CheckedProvider>
              <TotaisProvider>
                <AnoMesProvider>
                  <Grid
                    style={{
                      backgroundColor: theme.palette.background.default,
                      display: "flex",
                    }}
                  >
                    <CssBaseline>
                      <ExpenseFilterProvider>
                        <CategoryProvider>
                          <ExpenseProvider>
                            <Router>
                              <ButtonAppBar />
                              <AlertComponent />
                              <Grid
                                container
                                spacing={1}
                                className={classes.content}
                              >
                                {<Grid className={classes.toolbar} />}
                                {window.innerWidth >
                                theme.breakpoints.values.sm ? (
                                  <Grid item xs={12}>
                                    <BotaoMes />
                                  </Grid>
                                ) : null}
                                <Grid item xs={12}>
                                  <Dash />
                                </Grid>
                                <Grid item xs={12}>
                                  <Switch>
                                    <Route exact path="/" component={FcHome} />
                                    <Route
                                      exact
                                      path="/despesas"
                                      component={FcExpense}
                                    />
                                    <Route
                                      exact
                                      path="/receitas"
                                      component={FcYield}
                                    />
                                    <Route
                                      exact
                                      path="/transferencias"
                                      component={FcTransfer}
                                    />
                                    <Route
                                      exact
                                      path="/balanco"
                                      component={FcBalance}
                                    />
                                    <Route
                                      exact
                                      path="/saldo"
                                      component={FcBalanceMonth}
                                    />
                                    <Route
                                      exact
                                      path="/carteiras"
                                      component={FcWallet}
                                    />
                                    <Route
                                      exact
                                      path="/categorias"
                                      component={FcCategory}
                                    />
                                  </Switch>
                                </Grid>
                              </Grid>
                            </Router>
                          </ExpenseProvider>
                        </CategoryProvider>
                      </ExpenseFilterProvider>
                    </CssBaseline>
                  </Grid>
                </AnoMesProvider>
              </TotaisProvider>
            </CheckedProvider>
          </AlertProvider>
        </SpinProvider>
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
