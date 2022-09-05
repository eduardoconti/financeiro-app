import { useEffect, useState } from "react";
import { useSpin } from "@hooks/use-spin";
import { Typography, useTheme } from "@material-ui/core";
import { getValorDespesasPorCategoria, Money } from "common";
import { useCurrentTime } from "@hooks/use-current-time";

import { CheckedValues, useDashValues } from "@hooks/use-dash-values";
import FcSurface from "@components/fc-surface/fc-surface";
import FcGraphic from "@pages/home/components/fc-graphics/fc-graphics";

export function FcGraphicExpenseByCategory() {
  const checkExpenses = useDashValues(s => s.checkExpenses)
  const { year, month } = useCurrentTime();
  const setSpin = useSpin(s => s.setSpin);

  const [despesas, setDespesas] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    async function pegaDespesas() {
      await graphMonth(checkExpenses);
    }
    async function graphMonth(checkExpenses: CheckedValues) {
      const { data, status } = await getValorDespesasPorCategoria(
        checkExpenses,
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
  }, [checkExpenses, setSpin, year, month]);

  return (
    <FcSurface>
      <Typography
        variant="subtitle1"
        style={{ color: theme.palette.text.primary, padding: theme.spacing(1) }}
        align="center"
      >
        Despesas por categoria
      </Typography>
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
