import { useContext, useEffect, useState } from "react";

import { getValorDespesasPorCategoria } from "../../common/DepesaFuncoes";
import { ContextChecked } from "../../Context/CheckedContext";
import { useSpin } from "@hooks/use-spin";
import { useTheme } from "@material-ui/core";
import { isAuthenticated } from "../../common/Auth";
import FcSurface from "../fc-surface/fc-surface";
import RadioButtons from "./fc-graphics-header";
import FcGraphic from "./fc-graphics";
import { Money } from "common";
import FcGraphicUnplannedExpenses from "./fc-graphics-unplanned-expenses";
import { useCurrentTime } from "@hooks/use-current-time";

export default function FcGraphicsExpense() {
  const { stateCheckedDespesas } = useContext(ContextChecked);
  const {year, month} = useCurrentTime();
  const setSpin = useSpin(s=>s.setSpin);

  const [despesas, setDespesas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();

  useEffect(() => {
    async function pegaDespesas() {
      if (isAuthenticated()) {
        if (stateGrafico === "1") {
          await general(stateCheckedDespesas);
        }
        if (stateGrafico === "2") {
          await graphMonth(stateCheckedDespesas);
        }
        if (stateGrafico === "3") {
          setDescricao("Despesas não planejadas");
        }
      } else {
        setDespesas([]);
      }
    }
    async function general(stateCheckedDespesas: any) {
      setDescricao("Despesas por Categoria Geral");
      const { data, status } = await getValorDespesasPorCategoria(
        stateCheckedDespesas
      );
      if (status === 200) {
        setDespesas(
          data.map((item: any) => {
            item.valor = Money.toFloat(item.valor);
            return item;
          })
        );
      } else {
        setDespesas([]);
      }
    }
    async function graphMonth(stateCheckedDespesas: any) {
      setDescricao("Despesas por Categoria Mensal");
      const { data, status } = await getValorDespesasPorCategoria(
        stateCheckedDespesas,
        year,
        month
      );
      if (status === 200) {
        setDespesas(
          data.map((item: any) => {
            item.valor = Money.toFloat(item.valor);
            return item;
          })
        );
      } else {
        setDespesas([]);
      }
    }
    setSpin(true);
    pegaDespesas();
    setSpin(false);
  }, [stateCheckedDespesas, stateGrafico, setSpin, year, month]);

  return (
    <FcSurface>
      <RadioButtons
        setStateGrafico={(stateGrafico: string) => {
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
