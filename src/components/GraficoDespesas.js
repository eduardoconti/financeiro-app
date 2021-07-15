import React, { useContext, useEffect, useState } from "react";
import Radio from "./HeaderGraficos";
import {
  getValorDespesasPorCategoria,
  getValorDespesasPorCarteira,
} from "../common/DepesaFuncoes";
import { Box } from "@material-ui/core";
import Grafico from "./Grafico";
import { ContextTotais } from "../Context/TotaisContext";
import { ContextChecked } from "../Context/CheckedContext";
import { ContextAnoMes } from "../Context/AnoMesContext";
import { SpinContext } from "../Context/SpinContext";
import { useTheme } from "@material-ui/core";
import { getToken } from '../common/Auth'

export default function GraficoDespesas() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext) ;

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedDespesas = ctxChecked.stateCheckedDespesas;

  const [despesas, setDespesas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();
  useEffect(() => {
    async function pegaDespesas() {
      if (getToken()) {
        ctxSpin.setSpin(true);
        let despesas;

        if (stateGrafico === "1") {
          despesas = await getValorDespesasPorCategoria(
            stateCheckedDespesas,
            stateAnoAtual,
            stateMesAtual
          );
          setDescricao("Despesas por Categoria");
        } else if (stateGrafico === "2") {
          despesas = await getValorDespesasPorCarteira(
            stateCheckedDespesas,
            stateAnoAtual,
            stateMesAtual
          );
          setDescricao("Despesas por Carteira");
        }
        if (despesas.statusCode < 400) {
          setDespesas(despesas.data);
        }
        ctxSpin.setSpin(false);
      }
    }
    pegaDespesas(); // eslint-disable-next-line
  }, [
    stateCheckedDespesas,
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
        cor={theme.palette.error.main}
        descricao={descricao}
      />
      <Grafico
        data={despesas}
        chaveX="descricao"
        chaveY="valor"
        cor={theme.palette.error.main}
        stroke={theme.palette.error.dark}
      />
    </Box>
  );
}
