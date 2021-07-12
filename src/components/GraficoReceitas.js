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
import { getToken } from '../common/Auth'
import { Context } from "../Context/AuthContext";

export default function GraficoReceitas() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctx = useContext(Context);

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;

  const [receitas, setReceitas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {

    if(getToken()){
      async function pegaReceitas() {
        ctx.setSpin(true);
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
        if( receitas.statusCode < 400 ){
          setReceitas(receitas.data);
        }
        ctx.setSpin(false);
      }
      pegaReceitas();
    }// eslint-disable-next-line  
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
