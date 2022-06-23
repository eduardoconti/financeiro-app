import React, { useContext, useEffect, useState } from "react";

import {
  getValorDespesasPorCategoria,
  getValorDespesasPorCarteira,
} from "../../common/DepesaFuncoes";
import { ContextTotais } from "../../Context/TotaisContext";
import { ContextChecked } from "../../Context/CheckedContext";
import { ContextAnoMes } from "../../Context/AnoMesContext";
import { SpinContext } from "../../Context/SpinContext";
import { useTheme } from "@material-ui/core";
import { isAuthenticated } from "../../common/Auth";
import FcSurface from "../fc-surface/fc-surface";
import RadioButtons from "./fc-graphics-header";
import FcGraphic from "./fc-graphics";
import { Money } from "common";

export default function FcGraphicsExpense() {
  const ctxTotais = useContext(ContextTotais);
  const ctxChecked = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const { setSpin } = useContext(SpinContext);

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
      if (isAuthenticated()) {
        setSpin(true);
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
        if (despesas.status === 200) {
          const { data } = despesas;
          setDespesas(
            data.map((item) => {
              item.valor = Money.toFloat(item.valor);
              return item;
            })
          );
        }
        setSpin(false);
      }
    }
    pegaDespesas();
  }, [
    stateCheckedDespesas,
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
        cor={theme.palette.error.light}
        descricao={descricao}
      />
      <FcGraphic
        data={despesas}
        chaveX="descricao"
        chaveY="valor"
        cor={
          theme.palette.type === "dark"
            ? theme.palette.error.light
            : theme.palette.error.dark
        }
        stroke={theme.palette.error.main}
      />
    </FcSurface>
  );
}
