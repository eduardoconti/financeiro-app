export class GeneralGraphicResponseDTO {
  months!: Months[]
  geral!: Geral
}

type Months = {
  month: string,
  earnings: Totals,
  expenses: Totals,
  ballance: number,
  totalBallance: number,
}

export type Totals = {
  total: number,
  totalOpen: number,
  totalPayed: number,
  quantity: number,
}

type Geral = {
  earnings: Totals,
  expenses: Totals,
}