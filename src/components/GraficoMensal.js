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
  Area,
  ResponsiveContainer,
} from "recharts";
import HeaderGrafico from "./HeaderGraficos";
import { rertornaReceitasAgrupadasPorMes } from "../common/ReceitaFuncoes";

import { rertornaDespesasAgrupadasPorMes } from "../common/DepesaFuncoes";
import { Box } from "@material-ui/core";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextAnoMes } from "../Context/AnoMesContext";

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
  for (let i = 1; i <= 12; i++) {
    let { valor: receita } = retornaDados(
      receitas.find((receita) => receita.mes === i)
    );
    let { valor: despesa } = retornaDados(
      despesas.find((despesa) => despesa.mes === i)
    );

    dados.push({
      name: retornaMes(i),
      despesa: despesa,
      receita: receita,
      balanco: (receita - despesa).toFixed(2),
    });
  }
}

export default function GraficoReceitas() {
  const ctxTotais = useContext(ContextTotais);
  const ctxAnoMes = useContext(ContextAnoMes);

  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const stateTotais = ctxTotais.stateTotais;

  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function retornaDadosGrafico(stateAnoAtual) {
      let dados = [],
        despesas,
        receitas;

      despesas = await rertornaDespesasAgrupadasPorMes(stateAnoAtual);
      receitas = await rertornaReceitasAgrupadasPorMes(stateAnoAtual);
      try {
        adicionaNoArrayDeDados(dados, receitas, despesas);
      } catch (error) {}

      return await dados;
    }

    retornaDadosGrafico(stateAnoAtual).then((dados) => {
      setDados(dados);
    });
  }, [stateAnoAtual, stateTotais]);

  const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;

    return <span style={{ color }}>{value} </span>;
  };

  return (
    <Box className="Grafico">
      <HeaderGrafico
        setStateGrafico={(stateGrafico) => {
          //setStateGrafico(stateGrafico);
        }}
        cor="#6C2DC7"
        descricao="Grafico Geral"
      />
      <ResponsiveContainer>
        <ComposedChart
          data={dados}
          margin={{
            right: 20,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis domain={[0, 6000]}/>
          <Tooltip />
          <Legend formatter={renderColorfulLegendText} />
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            type="monotone"
            dataKey="receita"
            fill="#85f07b"
            stroke="#4E9258"
          />

          <Bar dataKey="despesa" barSize={15} fill="#E55451" stroke="#F62217" />
          <Line type="monotone" dataKey="balanco" stroke="#6C2DC7" />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
}
