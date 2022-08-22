import { useTheme } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function FcGraphic({ data, chaveX, chaveY, stroke, cor }) {
  const theme = useTheme();
  return (
    <ResponsiveContainer height={180}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={chaveX}
          fill={theme.palette.text.primary}
          stroke={theme.palette.text.primary}
        />
        <Legend />
        <YAxis
          type="number"
          fill={theme.palette.text.primary}
          stroke={theme.palette.text.primary}
          scale="linear"
          interval="preserveStartEnd"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.palette.grey[800],
            borderRadius: theme.shape.borderRadius,
            border: "none",
          }}
        />
        <Bar dataKey={chaveY} fill={cor} maxBarSize={30} stroke={stroke} />
      </BarChart>
    </ResponsiveContainer>
  );
}
