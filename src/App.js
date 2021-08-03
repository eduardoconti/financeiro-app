import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import GraficosContainer from "./components/GraficosContainer";
import Corpo from "./components/Corpo";
import Dash from "./components/Dash";
import { SpinProvider } from "./Context/SpinContext";
import { CheckedProvider } from "./Context/CheckedContext";
import { TotaisProvider } from "./Context/TotaisContext";
import { AnoMesProvider } from "./Context/AnoMesContext";
import { AlertProvider } from "./Context/AlertContext";

import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ButtonAppBar from "./components/fc-app-bar/fc-app-bar";
import BotaoMes from "./components/BotaoMes";
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#BB86FC",
    },
    secondary: {
      main: "#03DAC5",
    },
    error: {
      main: "#CF6679",
    },
    background: {
      default: "#121212",
      paper01: "rgba(255, 255, 255, 0.03)",
      paper02: "rgba(255, 255, 255, 0.07)",
      paper03: "rgba(255, 255, 255, 0.12)",
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

function App() {
  const [stateCurrentBody, setStateCurrentBody] = useState(0);
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
                    <ButtonAppBar
                      setStateCurrentBody={(currentBody) =>
                        setStateCurrentBody(currentBody)
                      }
                    />
                    <main className={classes.content}>
                      <div className={classes.toolbar} />
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={9}>
                          <Grid container spacing={1}>
                            <Grid item xs={12}>
                              <BotaoMes />
                            </Grid>
                            <Grid item xs={12}>
                              <Dash
                                setStateCurrentBody={(currentBody) =>
                                  setStateCurrentBody(currentBody)
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Corpo stateCurrentBody={stateCurrentBody} />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <GraficosContainer />
                        </Grid>
                      </Grid>
                    </main>
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
