import { Box, Divider, Typography, useTheme } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label, total }: any) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Box className="custom-tooltip" style={{
        backgroundColor: theme.palette.grey[800],
        borderRadius: theme.shape.borderRadius,
        border: "none",
        padding: theme.spacing(1)
      }}>
        <Typography style={{ color: payload[0].fill }}>
          {`${label}`}
        </Typography>
        <Divider/>
        <Typography>
          <span>
            {`${payload[0].dataKey}: `}
          </span>
          <span style={{ color: payload[0].fill }}>
            {`${(payload[0].value).toFixed(2)}`}
          </span>
        </Typography>
        <Typography>
          <span>
            {`percentual: `}
          </span>
          <span style={{ color: payload[0].fill }}>
            {`${(Math.round((payload[0].value / total * 100) * 100) / 100).toFixed(2)} %`}
          </span>

        </Typography>
      </Box>
    );
  }
  return null
}

type FcGraphicProps = {
  data: FcGraphicDada[],
  chaveX: string,
  chaveY: string,
  stroke: string,
  cor: string
}

type FcGraphicDada = {
  valor: number,
  descricao: string,
}

export default function FcGraphic({ data, chaveX, chaveY, stroke, cor }: FcGraphicProps) {
  const theme = useTheme();
  const totalValue = data.reduce((acc: number, element: FcGraphicDada): number => {
    return acc += element.valor
  }, 0)
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
          scale="linear"
          interval="preserveStartEnd"
        />
        <Tooltip
          content={<CustomTooltip total={totalValue} />}
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
