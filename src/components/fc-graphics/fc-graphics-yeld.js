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
  const { setSpin } = useContext(SpinContext);

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
        setSpin(true);
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
        if (receitas.status === 200) {
          setReceitas(receitas.data);
        }
        setSpin(false);
      }
      pegaReceitas();
    }
  }, [
    stateCheckedReceitas,
    stateTotais,
    stateAnoAtual,
    stateMesAtual,
    stateGrafico,
    setSpin,
  ]);

  return (
    <FcSurface>
      <RadioButtons
        setStateGrafico={(stateGrafico) => {
          setStateGrafico(stateGrafico);
        }}
        cor={theme.palette.success.main}
        descricao={descricao}
      />
      <FcGraphic
        data={receitas}
        chaveX="descricao"
        chaveY="valor"
        cor={ theme.palette.type === "dark"
        ? theme.palette.success.light
        : theme.palette.success.dark}
        stroke={theme.palette.success.main}
      />
    </FcSurface>
  );
}
