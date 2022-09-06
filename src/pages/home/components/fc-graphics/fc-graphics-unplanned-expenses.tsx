import { useEffect } from "react";

import { Typography, useTheme } from "@material-ui/core";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import { useSpin } from "@hooks/use-spin";
import { useGraphic } from "@pages/home/hook";
import shallow from "zustand/shallow";
import FcSurface from "@components/fc-surface/fc-surface";
import { purple } from "@material-ui/core/colors";

export function FcGraphicUnplannedExpenses() {
  const setSpin = useSpin(s => s.setSpin)

  const theme = useTheme();
  const { unplanned, init } = useGraphic(s => (
    {
      unplanned: s.unplanned,
      init: s.fetchUnplannedExpenses
    }), shallow)

  useEffect(() => {

    try {
      setSpin(true);
      async function initGraphic() {
        await init()
      }
      initGraphic()

    } catch (error: any) {
    } finally {
      setSpin(false);
    }

  }, [init, setSpin]);

  return (
    <FcSurface>
      <Typography
        variant="subtitle1"
        style={{ color: theme.palette.text.primary, padding: theme.spacing(1) }}
        align="center"
      >
        Despesas não planejadas
      </Typography>
      <ResponsiveContainer height={180}>
        <ComposedChart data={unplanned}>
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
          <CartesianGrid strokeDasharray="1" style={{ opacity: 0.5 }} />
          <Line
            dot={false}
            type="monotone"
            dataKey="median"
            name="Mediana"
            stroke={purple[700]}
            strokeWidth={3}
          />
          <Bar
            dataKey="total"
            name="Valor"
            maxBarSize={30}
            fill={
              theme.palette.type === "dark"
                ? purple[200]
                : purple[400]
            }
            stroke={purple[500]}
          />

        </ComposedChart>
      </ResponsiveContainer>
    </FcSurface>
  );
}
