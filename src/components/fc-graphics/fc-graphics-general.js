import React, { useContext, useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ContextTotais } from "../../Context/TotaisContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { useTheme } from "@material-ui/core";
import { isAuthenticated } from "../../common/Auth";
import { SpinContext } from "../../Context/SpinContext";
import FcSurface from "../fc-surface/fc-surface";
import RadioButtons from "./fc-graphics-header";
import api from "../../common/Api";

export default function FcGraphicsGeneral() {
  const ctxTotais = useContext(ContextTotais);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const stateTotais = ctxTotais.stateTotais;
  const [dados, setDados] = useState([]);
  const theme = useTheme();
  const ENDPOINT = "graphic/";

  useEffect(() => {
    async function retornaDadosGrafico(stateAnoAtual) {
      if (isAuthenticated()) {
        try {
          let response = await api.get(ENDPOINT + "general");
          setDados(response.data.data.months);
        } catch (error) {}
      }
    }

    ctxSpin.setSpin(true);
    retornaDadosGrafico(stateAnoAtual);
    ctxSpin.setSpin(false);
    // eslint-disable-next-line
  }, [stateAnoAtual, stateTotais]);

  return (
    <FcSurface>
      <RadioButtons
        setStateGrafico={(stateGrafico) => {
          //setStateGrafico(stateGrafico);
        }}
        cor={
          theme.palette.type === "dark"
            ? theme.palette.primary.dark
            : theme.palette.primary.light
        }
        descricao="Grafico Geral"
      />
      <ResponsiveContainer height={250}>
        <ComposedChart data={dados}>
          <XAxis
            dataKey="month"
            fill={theme.palette.text.primary}
            stroke={theme.palette.text.primary}
          />
          <YAxis
            //domain={[0, domain]}
            fill={theme.palette.text.primary}
            stroke={theme.palette.text.primary}
            scale="linear"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.shape.borderRadius,
              border: "none",
            }}
          />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar
            //type="monotone"
            dataKey="earnings.total"
            name="Receitas"
            fill={theme.palette.secondary.main}
            stroke={theme.palette.secondary.main}
            fillOpacity={"60%"}
            maxBarSize={30}
          />

          <Bar
            dataKey="expenses.total"
            name="Despesas"
            maxBarSize={30}
            fill={theme.palette.error.main}
            stroke={theme.palette.error.dark}
          />
          {/* <Line
            dataKey="expensesOpen"
            name="Despesas em aberto"
            maxBarSize={30}
            fill={theme.palette.error.dark}
            stroke={theme.palette.error.main}
          /> */}
          <Line
            type="monotone"
            dataKey="ballance"
            name="Balanço"
            stroke={
              theme.palette.type === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light
            }
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="totalBallance"
            name="Saldo"
            stroke={theme.palette.warning.light}
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
      {/* <Box>
        <Typography
          variant="h5"
          style={{ color: theme.palette.secondary.main }}
          
        >
          {console.log(dados)}
          Total receitas pago = {dados.geral.earnings.totalPayed}
        </Typography>
      </Box> */}
    </FcSurface>
  );
}
