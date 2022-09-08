import React, { useEffect } from "react";
import { Grid, PaletteType } from "@material-ui/core";
import Dash from "./components/fc-dash/fc-dash";
import { AlertProvider } from "./Context/AlertContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ButtonAppBar from "./pages/home/components/fc-app-bar/fc-app-bar";
import FcExpense from "./pages/expenses/fc-expense";
import AlertComponent from "./components/fc-alert";
import FcBalance from "./pages/balance/fc-balance";
import FcBalanceMonth from "./pages/balance-month/fc-balance-month";
import FcWallet from "./pages/wallet/fc-wallet";
import FcCategory from "./pages/category/fc-category";
import FcHome from "./pages/home/fc-home";
import { FcEarningPage } from "@pages/earning/fc-earning";
import { useWallet } from "@pages/wallet/hooks";
import { useSpin } from "./hooks";
import { FcTransference } from "@pages/transference";
import { useCategory } from "@pages/category/hook";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const [mode, setMode] = React.useState<PaletteType>("dark");

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
            default: mode === "dark" ? "#121212" : "#FAFAFA",
            paper: mode === "dark" ? "#212121" : "#F5F5F5",
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
      "@media (min-width:0px) and (orientation: landscape)": {
        minHeight: 42,
      },
      "@media(min-width:600px)": {
        minHeight: 48,
      },
    },
    content: {
      padding: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  const initWallet = useWallet((state) => state.fetchWallets);
  const setSpin = useSpin((state) => state.setSpin);
  const initCategories = useCategory((s) => s.fetchCategories);

  useEffect(() => {
    async function start() {
      try {
        setSpin(true);
        Promise.all([initWallet(), initCategories()]);
      } catch (error) {
        console.log(error);
      } finally {
        setSpin(false);
      }
    }
    start();
  }, [initCategories, initWallet, setSpin]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <AlertProvider>
          <Grid
            style={{
              backgroundColor: theme.palette.background.default,
              display: "flex",
            }}
          >
            <CssBaseline>
              <Router>
                <ButtonAppBar />
                <AlertComponent />
                <Grid container spacing={1} className={classes.content}>
                  {<Grid className={classes.toolbar} />}
                  <Grid item xs={12}>
                    <Dash />
                  </Grid>
                  <Grid item xs={12}>
                    <Switch>
                      <Route exact path="/" component={FcHome} />
                      <Route exact path="/despesas" component={FcExpense} />
                      <Route exact path="/receitas" component={FcEarningPage} />
                      <Route
                        exact
                        path="/transferencias"
                        component={FcTransference}
                      />
                      <Route exact path="/balanco" component={FcBalance} />
                      <Route exact path="/saldo" component={FcBalanceMonth} />
                      <Route exact path="/carteiras" component={FcWallet} />
                      <Route exact path="/categorias" component={FcCategory} />
                    </Switch>
                  </Grid>
                </Grid>
              </Router>
            </CssBaseline>
          </Grid>
        </AlertProvider>
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
