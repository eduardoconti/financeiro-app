import { Totals } from "@api/graphic/dto/general-graphic-response-dto";
import { GraphicService, IGraphicService } from "@api/graphic/service";
import { calculateMedian } from "@common/math";
import { Money } from "@common/money";
import create from "zustand";

type GeneralGraphicData = {
  earnings: Totals,
  expenses: Totals,
  ballance: number,
  totalBallance: number,
  month: string,
  medianExpenses?: number,
  medianEarnings?: number,
}

type UnplannedExpensesGraphicData = {
  month: string,
  total: number,
  totalOpen: number,
  totalPayed: number,
  quantity: number,
  median?: number,
}

export interface IUseGraphic {
  general: GeneralGraphicData[];
  fetchGenereal: () => Promise<void>;
  unplanned: UnplannedExpensesGraphicData[];
  fetchUnplannedExpenses: () => Promise<void>;
}
const emptyGeral =
{
  total: 0,
  totalOpen: 0,
  totalPayed: 0,
  quantity: 0
}
export const useGraphic = create<IUseGraphic>((set) => ({
  general: [{
    earnings: emptyGeral,
    expenses: emptyGeral,
    ballance: 0,
    totalBallance: 0,
    month: "",
    medianEarnings: 0,
    medianExpenses: 0,
  }],
  fetchGenereal: async () => {
    const graphicService: IGraphicService = new GraphicService();
    const { data: { months } } = await graphicService.general();
    const general: GeneralGraphicData[] = []
    const expensesValuesToCalculateMedian: number[] = []
    const earningsValuesToCalculateMedian: number[] = []
    months.forEach((element) => {
      const { earnings, expenses, ballance, totalBallance } = element;
      earnings.total = Money.toFloat(earnings.total);
      earnings.totalOpen = Money.toFloat(earnings.totalOpen);
      earnings.totalPayed = Money.toFloat(earnings.totalPayed);
      if (earnings.totalPayed > 0) {
        earningsValuesToCalculateMedian.push(earnings.totalPayed)
      }
      expenses.total = Money.toFloat(expenses.total);
      expenses.totalOpen = Money.toFloat(expenses.totalOpen);
      expenses.totalPayed = Money.toFloat(expenses.totalPayed);

      if (expenses.totalPayed > 0) {
        expensesValuesToCalculateMedian.push(expenses.totalPayed)
      }
      element.ballance = Money.toFloat(ballance);
      element.totalBallance = Money.toFloat(totalBallance);
      general.push(element)

    })
    const medianExpenses = calculateMedian(expensesValuesToCalculateMedian)
    const medianEarnings = calculateMedian(earningsValuesToCalculateMedian)
    set((state) => ({
      ...state,
      general: general.map((e) => { return { ...e, medianExpenses, medianEarnings } })
    }));
  },
  unplanned: [{
    month: '',
    data: [],
    ...emptyGeral,
  }],
  fetchUnplannedExpenses: async () => {
    const graphicService: IGraphicService = new GraphicService();
    const { data: { months } } = await graphicService.unplannedExpenses();
    const median = calculateMedian(months.map((e) => { return e.total }))
    set((state) => ({
      ...state,
      unplanned: months.map((e) => {
        return { ...e, total: Money.toFloat(e.total), median: Money.toFloat(median) }
      }),
    }));
  },
}));
