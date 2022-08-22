import React, { useContext, useEffect, useState } from "react";

import {
  getReceitas,
  retornaReceitasAgrupadasPorCarteiraChecked,
} from "../../common/ReceitaFuncoes";
import { ContextChecked } from "../../Context/CheckedContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { isAuthenticated } from "../../common/Auth";
import { SpinContext } from "../../Context/SpinContext";
import { useTheme } from "@material-ui/core";
import FcSurface from "../fc-surface/fc-surface";
import RadioButtons from "./fc-graphics-header";
import FcGraphic from "./fc-graphics";
import { Money } from "common";

export default function FcGraphicsYeld() {
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const { setSpin } = useContext(SpinContext);

  const stateMesAtual = ctxAnoMes.stateMesAtual;
  const stateAnoAtual = ctxAnoMes.stateAnoAtual;

  const stateCheckedReceitas = ctxChecked.stateCheckedReceitas;

  const [receitas, setReceitas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();

  useEffect(() => {
    if (isAuthenticated()) {
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
        if (receitas.status === 200) {
          const { data } = receitas;
          setReceitas(
            data.map((item) => {
              item.valor = Money.toFloat(item.valor);
              return item;
            })
          );
        }
      }
      pegaReceitas();
    } else {
      setReceitas([]);
    }
  }, [
    stateCheckedReceitas,
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
        cor={
          theme.palette.type === "dark"
            ? theme.palette.success.light
            : theme.palette.success.dark
        }
        stroke={theme.palette.success.main}
      />
    </FcSurface>
  );
}
