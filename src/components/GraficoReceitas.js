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
import { isAuthenticated } from '../common/Auth'
import { SpinContext } from "../Context/SpinContext";
import { useTheme } from "@material-ui/core";

export default function GraficoReceitas() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext) ;

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;

  const [receitas, setReceitas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();

  useEffect(() => {

    if(isAuthenticated()){
      async function pegaReceitas() {
        ctxSpin.setSpin(true);
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
        if( receitas.statusCode === 200 ){
          setReceitas(receitas.data);
        }
        ctxSpin.setSpin(false);
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
        cor={theme.palette.success.dark}
        descricao={descricao}
      />
      <Grafico
        data={receitas}
        chaveX="descricao"
        chaveY="valor"
        cor={theme.palette.secondary.main}
        stroke={theme.palette.secondary.dark}
      />
    </Box>
  );
}
