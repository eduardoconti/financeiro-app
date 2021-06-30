import React, { useContext, useEffect, useState } from "react";
import Grafico from "./Grafico";
import Radio from "./HeaderGraficos";
import {
  getReceitas,
  retornaReceitasAgrupadasPorCarteiraChecked,
} from "../common/ReceitaFuncoes";
import { Box } from "@material-ui/core";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAnoMes } from "../Context/AnoMesContext";

export default function GraficoReceitas() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;

  const [receitas, setReceitas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    async function pegaReceitas() {
      let receitas;

      if (stateGrafico === "1") {
        receitas = await getReceitas(
          stateCheckedReceitas,
          stateAnoAtual,
          stateMesAtual
        );
        setDescricao("Receitas");
      } else if (stateGrafico === "2") {
        receitas = await retornaReceitasAgrupadasPorCarteiraChecked(
          stateCheckedReceitas,
          stateAnoAtual,
          stateMesAtual
        );
        setDescricao("Receitas por Carteira");
      }
      setReceitas(receitas);
    }
    pegaReceitas();
  }, [
    stateCheckedReceitas,
    stateTotais,
    stateAnoAtual,
    stateMesAtual,
    stateGrafico,
  ]);

  return (
    <Box className="Grafico">
      <Radio
        setStateGrafico={(stateGrafico) => {
          setStateGrafico(stateGrafico);
        }}
        cor="#85f07b"
        descricao={descricao}
      />
      <Grafico
        data={receitas}
        chaveX="descricao"
        chaveY="valor"
        cor="#85f07b"
        stroke="#4E9258"
      />
    </Box>
  );
}
