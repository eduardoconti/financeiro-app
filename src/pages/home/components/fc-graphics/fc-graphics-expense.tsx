import { useEffect, useState } from "react";
import { useSpin } from "@hooks/use-spin";
import { Divider, Typography, useTheme } from "@material-ui/core";
import { getValorDespesasPorCategoria, isAuthenticated, Money } from "common";
import { useCurrentTime } from "@hooks/use-current-time";
import { FcGraphicHeader } from "./";
import { CheckedValues, useDashValues } from "@hooks/use-dash-values";
import FcSurface from "@components/fc-surface/fc-surface";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GetExpenseAmountGroupByCategoryResponse, SubCategoryData } from "@api/expense/dto";
import { indigo } from "@material-ui/core/colors";

export function FcGraphicsExpense() {
  const checkExpenses = useDashValues((s) => s.checkExpenses);
  const { year, month } = useCurrentTime();
  const setSpin = useSpin((s) => s.setSpin);

  const [despesas, setDespesas] = useState<FcGraphicDada[]>([]);
  const [stateGrafico, setStateGrafico] = useState("1");
  const [descricao, setDescricao] = useState("");
  const theme = useTheme();
  const color = theme.palette.type === "dark" ? indigo[100] : indigo[600];
  useEffect(() => {
    async function pegaDespesas() {

      if (stateGrafico === "1") {
        await general(checkExpenses);
      }
      if (stateGrafico === "2") {
        await graphMonth(checkExpenses);
      }

    }
    async function general(checkExpenses: CheckedValues) {
      setDescricao("Despesas por Categoria Geral");
      const { data } = await getValorDespesasPorCategoria(
        checkExpenses
      );

      setDespesas(
        data.map((item: GetExpenseAmountGroupByCategoryResponse, i: number) => {
          item.value = Money.toFloat(item.value);
          return { ...item, color: color };
        })
      );

    }
    async function graphMonth(checkExpenses: CheckedValues) {
      setDescricao("Despesas por Categoria Mensal");
      const { data } = await getValorDespesasPorCategoria(
        checkExpenses,
        year,
        month
      );

      setDespesas(
        data.map((item: GetExpenseAmountGroupByCategoryResponse, i: number) => {
          item.value = Money.toFloat(item.value);
          return { ...item, color: color };
        })
      );
    }
    setSpin(true);
    pegaDespesas();
    setSpin(false);
  }, [checkExpenses, stateGrafico, setSpin, year, month, color]);

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
      />
    </FcSurface>
  );
}

const CustomTooltip = ({ active, payload, label, total }: {
  payload?: any,
  active?: boolean,
  label?: string,
  total: number
}) => {
  const theme = useTheme();
  if (active && payload && payload.length) {
    return (
      <FcSurface
        className="custom-tooltip"
        style={{
          backgroundColor: theme.palette.grey[theme.palette.type === "dark" ? 800 : 300],
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
          <span>{` Percentual: `}</span>
          <span
            style={{
              color: payload[0].payload?.color ?? theme.palette.primary.light,
            }}
          >
            {`${(
              Math.round((payload[0].value / total) * 100 * 100) / 100
            ).toFixed(2)}%`}
          </span>
        </Typography>
        <Divider />
        {
          payload[0].payload?.subCategoryData.map((e: SubCategoryData & { color: string }) => {
            return e.description ? (
              <Typography component={"li"}>
                <span>{`${e.description}: `}</span>

                <span
                  style={{
                    color: payload[0].payload?.color ?? theme.palette.primary.light,
                  }}
                >
                  {`
                  ${Money.format(e.value)}`
                  }
                </span>
                <span>{` Percentual: `}</span>
                <span style={{
                  color: payload[0].payload?.color ?? theme.palette.primary.light,
                }}>{`${(
                  Math.round((Money.toFloat(e.value) / total) * 100 * 100) / 100
                ).toFixed(2)}%`
                  }</span>
              </Typography>
            ) : null
          })
        }

      </FcSurface>
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

type FcGraphicDada = {
  value: number;
  description: string;
  color: string;
  subCategoryData: (SubCategoryData | { color: string })[]
};

function FcGraphic({
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

  console.log(totalValue)

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
        <Bar dataKey={chaveY} maxBarSize={30} name="Value" stroke={indigo[500]}>
          {data.map((entry, index) => {
            return <Cell key={`cell-${index}`} fill={entry.color ?? cor} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

