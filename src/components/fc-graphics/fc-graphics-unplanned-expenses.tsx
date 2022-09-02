import { useEffect, useState } from "react";

import { useTheme } from "@material-ui/core";
import { isAuthenticated, Money } from "common";
import { GraphicService } from "api/graphic/service";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import { useSpin } from "@hooks/use-spin";
import { calculateMedian } from "@common/math";

export function FcGraphicUnplannedExpenses() {
  const setSpin = useSpin(s => s.setSpin)
  const [unplannedExpenses, setUnplannedExpenses] = useState([]);

  const theme = useTheme();


  useEffect(() => {
    if (isAuthenticated()) {
      setSpin(true);
      const service = new GraphicService();
      async function pegaReceitas() {
        const { data, status } = await service.unplannedExpenses();
        if (status === 200) {
          const media = calculateMedian(data.months.map((e: any) => {
            return e.total;
          }))
          setUnplannedExpenses(
            data.months.map((month: any) => {
              month.total = Money.toFloat(month.total);
              month.totalOpen = Money.toFloat(month.totalOpen);
              month.totalPayed = Money.toFloat(month.totalPayed);
              return { ...month, media: Money.toFloat(media ?? 0) };
            })
          );
        }
        setSpin(false);
      }
      pegaReceitas();
    }
  }, [setSpin]);

  return (
    //<FcSurface>
    <ResponsiveContainer height={180}>
      <ComposedChart data={unplannedExpenses}>
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
            backgroundColor: theme.palette.background.default,
            borderRadius: theme.shape.borderRadius,
            border: "none",
          }}
        />
        <Legend />
        <CartesianGrid strokeDasharray="1" style={{ opacity: 0.5 }} />
        <Line
          dot={false}
          type="monotone"
          dataKey="media"
          name="Mediana"
          stroke={theme.palette.error.main}
          strokeWidth={3}
        />
        <Bar
          dataKey="total"
          name="Valor"
          maxBarSize={30}
          fill={
            theme.palette.type === "dark"
              ? theme.palette.error.light
              : theme.palette.error.dark
          }
          stroke={theme.palette.error.main}
        />

      </ComposedChart>
    </ResponsiveContainer>
    //</FcSurface>
  );
}
