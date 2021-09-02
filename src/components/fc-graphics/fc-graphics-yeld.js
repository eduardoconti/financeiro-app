import React, { useContext, useEffect, useState } from "react";

import {
  getReceitas,
  retornaReceitasAgrupadasPorCarteiraChecked,
} from "../../common/ReceitaFuncoes";
import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { isAuthenticated } from "../../common/Auth";
import { SpinContext } from "../../Context/SpinContext";
import { useTheme } from "@material-ui/core";
import FcSurface from "../fc-surface/fc-surface";
import RadioButtons from "./fc-graphics-header";
import FcGraphic from "./fc-graphics";

export default function FcGraphicsYeld() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const ctxSpin = useContext(SpinContext);

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;
  const stateTotais = ctxTotais.stateTotais;
  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;

  const [receitas, setReceitas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (isAuthenticated()) {
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
        if (receitas.statusCode === 200) {
          setReceitas(receitas.data);
        }
        ctxSpin.setSpin(false);
      }
      pegaReceitas();
    } // eslint-disable-next-line
  }, [
    stateCheckedReceitas,
    stateTotais,
    stateAnoAtual,
    stateMesAtual,
    stateGrafico,
  ]);

  return (
    <FcSurface>
      <RadioButtons
        setStateGrafico={(stateGrafico) => {
          setStateGrafico(stateGrafico);
        }}
        cor={theme.palette.secondary.main}
        descricao={descricao}
      />
      <FcGraphic
        data={receitas}
        chaveX="descricao"
        chaveY="valor"
        cor={theme.palette.secondary.main}
        stroke={theme.palette.secondary.dark}
      />
    </FcSurface>
  );
}
