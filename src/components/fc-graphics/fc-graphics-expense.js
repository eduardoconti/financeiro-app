import React, { useContext, useEffect, useState } from "react";

import { getValorDespesasPorCategoria } from "../../common/DepesaFuncoes";
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
import FcGraphicUnplannedExpenses from "./fc-graphics-unplanned-expenses";

export default function FcGraphicsExpense() {
  const { stateTotais } = useContext(ContextTotais);
  const { stateCheckedDespesas } = useContext(ContextChecked);
  const ctxAnoMes = useContext(ContextAnoMes);
  const { setSpin } = useContext(SpinContext);

  const [despesas, setDespesas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();

  useEffect(() => {
    async function pegaDespesas() {
      if (isAuthenticated()) {
        setSpin(true);
        if (stateGrafico === "1") {
          await general(stateCheckedDespesas);
        }
        if (stateGrafico === "2") {
          await month(stateCheckedDespesas, ctxAnoMes);
        }
        if (stateGrafico === "3") {
          setDescricao("Despesas não planejadas");
        }
        setSpin(false);
      }
    }
    async function general(stateCheckedDespesas) {
      setDescricao("Despesas por Categoria Geral");
      const { data, status } = await getValorDespesasPorCategoria(
        stateCheckedDespesas
      );
      if (status === 200) {
        setDespesas(
          data.map((item) => {
            item.valor = Money.toFloat(item.valor);
            return item;
          })
        );
      }
    }

    async function month(stateCheckedDespesas, ctxAnoMes) {
      setDescricao("Despesas por Categoria Mensal");
      const { stateAnoAtual, stateMesAtual } = ctxAnoMes;
      const { data, status } = await getValorDespesasPorCategoria(
        stateCheckedDespesas,
        stateAnoAtual,
        stateMesAtual
      );
      if (status === 200) {
        setDespesas(
          data.map((item) => {
            item.valor = Money.toFloat(item.valor);
            return item;
          })
        );
      }
    }
    pegaDespesas();
  }, [stateCheckedDespesas, stateTotais, ctxAnoMes, stateGrafico, setSpin]);

  return (
    <FcSurface>
      <RadioButtons
        setStateGrafico={(stateGrafico) => {
          setStateGrafico(stateGrafico);
        }}
        cor={theme.palette.error.light}
        descricao={descricao}
      />
      {stateGrafico !== "3" ? (
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
      ) : (
        <FcGraphicUnplannedExpenses />
      )}
    </FcSurface>
  );
}
