import "./App.css";

import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";
import LeftMenu from "./components/LeftMenu";
import GraficosContainer from "./components/GraficosContainer";
import BotaoMes from "./components/BotaoMes";
import Corpo from "./components/Corpo";
import Dash from "./components/Dash";
import { SpinProvider } from "./Context/SpinContext";
import { CheckedProvider } from "./Context/CheckedContext";
import { TotaisProvider } from "./Context/TotaisContext";
import { AnoMesProvider } from "./Context/AnoMesContext";
import { AlertProvider } from "./Context/AlertContext";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#BB86FC",
    },
    secondary: {
      main: "#03DAC5",
    },
    error: {
      main: "#CF6679",
    },

    tonalOffset: 0.2,
  },
});

function App() {
  const [stateCurrentBody, setStateCurrentBody] = useState(0);

  return (
    <MuiThemeProvider theme={theme}>
      <SpinProvider>
        <AlertProvider>
          <CheckedProvider>
            <TotaisProvider>
              <Box className="Container">
                <AnoMesProvider>
                  <Grid container direction="row" spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
                      {/* LEFT */}
                      <LeftMenu
                        setStateCurrentBody={(currentBody) =>
                          setStateCurrentBody(currentBody)
                        }
                      />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={7} xl={6}>
                      {/* MID */}
                      <Grid container item spacing={1}>
                        {/* BOTOES MESES */}
                        <Grid item xs={12}>
                          <BotaoMes />
                        </Grid>

                        <Dash
                          setStateCurrentBody={(currentBody) =>
                            setStateCurrentBody(currentBody)
                          }
                        />

                        {/* BODY ( FORM, GRID...) */}
                        <Grid item xs={12}>
                          <Corpo stateCurrentBody={stateCurrentBody} />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={4} xl={5}>
                      {/* RIGHT */}
                      <GraficosContainer />
                    </Grid>
                  </Grid>
                </AnoMesProvider>
              </Box>
            </TotaisProvider>
          </CheckedProvider>
        </AlertProvider>
      </SpinProvider>
    </MuiThemeProvider>
  );
}

export default App;
