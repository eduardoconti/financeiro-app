import { useEffect } from "react";

import { Box, Divider, Typography, useTheme } from "@material-ui/core";
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
import { pink } from "@material-ui/core/colors";
import { Money } from "@common/money";

const CustomTooltip = ({ active, payload, label }: any) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Box className="custom-tooltip" style={{
        backgroundColor: theme.palette.grey[800],
        borderRadius: theme.shape.borderRadius,
        border: "none",
        padding: theme.spacing(1)
      }}>
        <Typography style={{ color: theme.palette.text.primary }}>
          {`${label}`}
        </Typography>
        <Divider />
        {payload.map((e: any, i: number) => {
          return (<>
            <Typography>
              <span>
                {`${payload[i].name}: `}
              </span>
              <span style={{ color: payload[i].stroke }}>
                {`${Money.formatBrl(payload[i].value)}`}
              </span>
            </Typography>
          </>
          )
        })}

      </Box>
    );
  }
  return null
}
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
            scale="sqrt"
          />
          <Tooltip
            content={<CustomTooltip />}
          />
          <CartesianGrid strokeDasharray="1" style={{ opacity: 0.5 }} />
          <Bar
            dataKey="total"
            name="Value"
            maxBarSize={30}
            fill={
              theme.palette.type === "dark"
                ? pink[200]
                : pink[400]
            }
            stroke={pink[500]}
          />
          <Line
            dot={false}
            type="monotone"
            dataKey="median"
            name="Mediana"
            stroke={pink[700]}
            strokeWidth={3}
            strokeDasharray="4"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </FcSurface>
  );
}
