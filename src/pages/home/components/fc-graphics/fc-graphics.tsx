import { Money } from "@common/money";
import { Box, Divider, Typography, useTheme } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload, label, total, ...rest }: any) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    return (
      <Box
        className="custom-tooltip"
        style={{
          backgroundColor: theme.palette.grey[theme.palette.type === "dark" ? 800 : 300],
          borderRadius: theme.shape.borderRadius,
          border: "none",
          padding: theme.spacing(1),
        }}
      >
        <Typography>{`${label}`}</Typography>
        <Divider />
        <Typography>
          <span>{`${payload[0].name}: `}</span>
          <span
            style={{
              color: payload[0].payload?.color ?? theme.palette.primary.light,
            }}
          >
            {`${Money.formatBrl(payload[0].value)}`}
          </span>
        </Typography>
        <Typography>
          <span>{`Percentual: `}</span>
          <span
            style={{
              color: payload[0].payload?.color ?? theme.palette.primary.light,
            }}
          >
            {`${(
              Math.round((payload[0].value / total) * 100 * 100) / 100
            ).toFixed(2)} %`}
          </span>
        </Typography>
      </Box>
    );
  }
  return null;
};

type FcGraphicProps = {
  data: FcGraphicDada[];
  chaveX: string;
  chaveY: string;
  stroke?: string;
  cor?: string;
};

export type FcGraphicDada = {
  value: number;
  description: string;
  color: string;
};

export default function FcGraphic({
  data,
  chaveX,
  chaveY,
  stroke,
  cor,
}: FcGraphicProps) {
  const theme = useTheme();
  const totalValue = data.reduce(
    (acc: number, element: FcGraphicDada): number => {
      return (acc += element.value);
    },
    0
  );

  return (
    <ResponsiveContainer height={180}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="1" style={{ opacity: 0.5 }} />
        <XAxis
          dataKey={chaveX}
          fill={theme.palette.text.primary}
          stroke={theme.palette.text.primary}
        />
        <YAxis
          type="number"
          fill={theme.palette.text.primary}
          stroke={theme.palette.text.primary}
          scale="sqrt"
          interval="preserveStartEnd"
        />
        <Tooltip content={<CustomTooltip total={totalValue} />} />
        <Bar dataKey={chaveY} maxBarSize={30} name="Value" stroke={stroke}>
          {data.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={entry.color ?? cor} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
