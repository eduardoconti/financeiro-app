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

import { rertornaReceitasAgrupadasPorMes } from "../../common/ReceitaFuncoes";
import { rertornaDespesasAgrupadasPorMes } from "../../common/DepesaFuncoes";
import { ContextTotais } from "../../Context/TotaisContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { useTheme } from "@material-ui/core";
import { isAuthenticated } from "../../common/Auth";
import { SpinContext } from "../../Context/SpinContext";
import FcSurface from "../fc-surface/fc-surface";
import RadioButtons from "./fc-graphics-header";

function retornaMes(mes) {
  if (mes === 1) return "Jan";
  else if (mes === 2) return "Fev";
  else if (mes === 3) return "Mar";
  else if (mes === 4) return "Abr";
  else if (mes === 5) return "Mai";
  else if (mes === 6) return "Jun";
  else if (mes === 7) return "Jul";
  else if (mes === 8) return "Ago";
  else if (mes === 9) return "Set";
  else if (mes === 10) return "Out";
  else if (mes === 11) return "Nov";
  else return "Dez";
}

function retornaDados(obj) {
  if (typeof obj === "undefined") {
    return { valor: 0 };
  } else return obj;
}

function adicionaNoArrayDeDados(dados, receitas, despesas) {
  let saldo = 0;

  for (let i = 1; i <= 12; i++) {
    let { valor: receita } = retornaDados(
      receitas.find((receita) => receita.mes === i)
    );
    let { valor: despesa } = retornaDados(
      despesas.find((despesa) => despesa.mes === i)
    );
    let balanco = receita - despesa;
    saldo += balanco;
    if ((receita > 0 || despesa > 0)) {
      dados.push({
        name: retornaMes(i),
        despesa: despesa.toFixed(2),
        receita: receita.toFixed(2),
        balanco: balanco.toFixed(2),
        saldo: saldo.toFixed(2),
      });
    }
  }
}

export default function FcGraphicsGeneral() {
  const ctxTotais = useContext(ContextTotais);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const stateTotais = ctxTotais.stateTotais;
  const [dados, setDados] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    if (isAuthenticated()) {
      async function retornaDadosGrafico(stateAnoAtual) {
        let dados = [];
        let receitas = [];
        let despesas = [];

        try {
          receitas = await rertornaReceitasAgrupadasPorMes(stateAnoAtual);
          despesas = await rertornaDespesasAgrupadasPorMes(stateAnoAtual);

          if ([despesas.statusCode, receitas.statusCode].includes(200)) {
            adicionaNoArrayDeDados(dados, receitas.data, despesas.data);
          }
        } catch (error) {
          return dados;
        }

        return dados;
      }
      ctxSpin.setSpin(true);
      retornaDadosGrafico(stateAnoAtual).then((dados) => {
        setDados(dados);
      });
      ctxSpin.setSpin(false);
    } // eslint-disable-next-line
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
            dataKey="name"
            fill={theme.palette.text.primary}
            stroke={theme.palette.text.primary}
          />
          <YAxis
            //domain={[0, domain]}
            fill={theme.palette.text.primary}
            stroke={theme.palette.text.primary}
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
            dataKey="receita"
            fill={theme.palette.secondary.main}
            stroke={theme.palette.secondary.main}
            fillOpacity={"60%"}
            maxBarSize={30}
          />

          <Bar
            dataKey="despesa"
            maxBarSize={30}
            fill={theme.palette.error.main}
            stroke={theme.palette.error.dark}
          />
          <Line
            type="monotone"
            dataKey="balanco"
            stroke={
              theme.palette.type === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light
            }
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="saldo"
            stroke={theme.palette.warning.light}
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </FcSurface>
  );
}
