import { useContext, useEffect, useState } from "react";
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

import { useTheme } from "@material-ui/core";
import { isAuthenticated } from "../../common/Auth";
import { SpinContext } from "../../Context/SpinContext";
import FcSurface from "../fc-surface/fc-surface";
import RadioButtons from "./fc-graphics-header";
import api from "../../common/Api";

export default function FcGraphicsGeneral() {
  const { setSpin } = useContext(SpinContext);
  const [dados, setDados] = useState([]);
  const theme = useTheme();
  const ENDPOINT = "graphic/";

  useEffect(() => {
    async function retornaDadosGrafico() {
      setSpin(true);
      if (isAuthenticated()) {
        try {
          let {
            data: {
              data: { months },
            },
          } = await api.get(ENDPOINT + "general");
          setDados(months);
        } catch (error) {}
      }
      setSpin(false);
    }

    retornaDadosGrafico();
  }, [setSpin]);

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
      <ResponsiveContainer height={220}>
        <ComposedChart data={dados}>
          <XAxis
            dataKey="month"
            fill={theme.palette.text.primary}
            stroke={theme.palette.text.primary}
          />
          <YAxis
            fill={theme.palette.text.primary}
            stroke={theme.palette.text.primary}
            scale="linear"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.default,
              borderRadius: theme.shape.borderRadius,
              border: "none",
            }}
          />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />

          <Bar
            dataKey="expenses.total"
            name="Despesas"
            maxBarSize={30}
            fill={ theme.palette.type === "dark" ? theme.palette.error.light :  theme.palette.error.dark }
            stroke={theme.palette.error.main}
          />
          <Bar
            dataKey="earnings.total"
            name="Receitas"
            fill={ theme.palette.type === "dark" ? theme.palette.success.light : theme.palette.success.dark }
            stroke={theme.palette.success.main}
            fillOpacity={"60%"}
            maxBarSize={30}
          />
          <Line
            type="monotone"
            dataKey="totalBallance"
            name="Saldo"
            stroke={theme.palette.warning.light}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="ballance"
            name="Balanço"
            stroke={
              theme.palette.type === "dark"
                ? theme.palette.info.light
                : theme.palette.info.dark
            }
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </FcSurface>
  );
}
