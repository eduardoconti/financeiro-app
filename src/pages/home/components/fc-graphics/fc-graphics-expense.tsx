import { useEffect, useState } from "react";
import { useSpin } from "@hooks/use-spin";
import { useTheme } from "@material-ui/core";
import FcGraphic from "./fc-graphics";
import { getValorDespesasPorCategoria, isAuthenticated, Money } from "common";
import { useCurrentTime } from "@hooks/use-current-time";
import { FcGraphicHeader } from "./";
import { CheckedValues, useDashValues } from "@hooks/use-dash-values";
import FcSurface from "@components/fc-surface/fc-surface";
import { indigo } from "@material-ui/core/colors";

export function FcGraphicsExpense() {
  const checkExpenses = useDashValues(s => s.checkExpenses)
  const { year, month } = useCurrentTime();
  const setSpin = useSpin(s => s.setSpin);

  const [despesas, setDespesas] = useState([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();

  useEffect(() => {
    async function pegaDespesas() {
      if (isAuthenticated()) {
        if (stateGrafico === "1") {
          await general(checkExpenses);
        }
        if (stateGrafico === "2") {
          await graphMonth(checkExpenses);
        }
      } else {
        setDespesas([]);
      }
    }
    async function general(checkExpenses: CheckedValues) {
      setDescricao("Despesas por Categoria Geral");
      const { data, status } = await getValorDespesasPorCategoria(
        checkExpenses
      );
      if (status === 200) {
        setDespesas(
          data.map((item: any) => {
            item.value = Money.toFloat(item.value);
            return item;
          })
        );
      } else {
        setDespesas([]);
      }
    }
    async function graphMonth(checkExpenses: CheckedValues) {
      setDescricao("Despesas por Categoria Mensal");
      const { data, status } = await getValorDespesasPorCategoria(
        checkExpenses,
        year,
        month
      );
      if (status === 200) {
        setDespesas(
          data.map((item: any) => {
            item.value = Money.toFloat(item.value);
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
  }, [checkExpenses, stateGrafico, setSpin, year, month]);

  return (
    <FcSurface>
      <FcGraphicHeader
        setStateGrafico={(stateGrafico: string) => {
          setStateGrafico(stateGrafico);
        }}
        cor={theme.palette.error.light}
        descricao={descricao}
      />

      <FcGraphic
        data={despesas}
        chaveX="description"
        chaveY="value"
        cor={
          theme.palette.type === "dark"
            ? indigo[200]
            : indigo[600]
        }
        stroke={indigo[500]}
      />
    </FcSurface>
  );
}
