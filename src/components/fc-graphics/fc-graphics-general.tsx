import { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Grid, useTheme } from "@material-ui/core";
import FcSurface from "../fc-surface/fc-surface";
import { Money } from "common";
import { useSpin } from "@hooks/use-spin";
import { GraphicService } from "@api/graphic/service";
import { calculateMedian } from "@common/math";

export function FcGraphicsGeneral() {
  const { setSpin } = useSpin();
  const [dados, setDados] = useState<any[]>([]);
  const theme = useTheme();

  useEffect(() => {
    async function retornaDadosGrafico() {
      const graphicService = new GraphicService();
      try {
        setSpin(true);
        const { data: { months } } = await graphicService.general();
        const values = months.map((item: any) => {
          return item.expenses.totalPayed
        });

        const medianExpensesPayed = calculateMedian(values.filter((e) => e !== 0 && e)) ?? 0

        const valuesEarning = months.map((item: any) => {
          return item.earnings.totalPayed
        });

        const medianEarningsPayed = calculateMedian(valuesEarning.filter((e) => e !== 0 && e)) ?? 0
        setDados(
          months.map((item: any) => {
            const { earnings, expenses, ballance, totalBallance } = item;
            earnings.total = Money.toFloat(earnings.total);
            earnings.totalOpen = Money.toFloat(earnings.totalOpen);
            earnings.totalPayed = Money.toFloat(earnings.totalPayed);

            expenses.total = Money.toFloat(expenses.total);
            expenses.totalOpen = Money.toFloat(expenses.totalOpen);
            expenses.totalPayed = Money.toFloat(expenses.totalPayed);

            item.ballance = Money.toFloat(ballance);
            item.totalBallance = Money.toFloat(totalBallance);
            return {
              ...item,
              medianExpenses: Money.toFloat(medianExpensesPayed),
              medianEarnings: Money.toFloat(medianEarningsPayed)
            };
          })
        );
      } catch (error) {
      } finally {
        setSpin(false);
      }

    }

    retornaDadosGrafico();
  }, [setSpin]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} >
        <FcSurface>
          <ResponsiveContainer height={220}>
            <ComposedChart data={dados}>
              <XAxis
                dataKey="month"
                fill={theme.palette.text.primary}
                stroke={theme.palette.text.primary}
              />
              <YAxis
                fill={theme.palette.text.primary}
                stroke={theme.palette.text.primary}
                scale="linear"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.grey[800],
                  borderRadius: theme.shape.borderRadius,
                  border: "none",
                }}
              />
              <Legend />
              <CartesianGrid strokeDasharray="1" style={{ opacity: 0.5 }} />

              <Bar
                dataKey="expenses.total"
                name="Despesas"
                maxBarSize={30}
                fill={
                  theme.palette.type === "dark"
                    ? theme.palette.error.light
                    : theme.palette.error.dark
                }
                stroke={theme.palette.error.main}
              />
              <Bar
                dataKey="earnings.total"
                name="Receitas"
                fill={
                  theme.palette.type === "dark"
                    ? theme.palette.success.light
                    : theme.palette.success.dark
                }
                stroke={theme.palette.success.main}
                fillOpacity={"60%"}
                maxBarSize={30}
              />
              <Line
                type="monotone"
                dataKey="totalBallance"
                name="Saldo"
                stroke={theme.palette.warning.light}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="ballance"
                name="Balanço"
                stroke={
                  theme.palette.type === "dark"
                    ? theme.palette.info.light
                    : theme.palette.info.dark
                }
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="medianExpenses"
                name="Mediana despesas"
                dot={false}
                stroke={
                  theme.palette.error.main
                }
                strokeWidth={1}
              />
                <Line
                type="monotone"
                dataKey="medianEarnings"
                name="Mediana receitas"
                dot={false}
                stroke={
                  theme.palette.success.main
                }
                strokeWidth={1}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </FcSurface>
      </Grid>
    </Grid>
  );
}
