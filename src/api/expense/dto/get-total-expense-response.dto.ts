export class GetTotalExpenseResponseDTO {
  readonly total: number;
  readonly totalOpen: number;
  readonly totalPayed: number;

  private constructor(total: number, totalOpen: number, totalPayed: number) {
    this.total = total;
    this.totalOpen = totalOpen;
    this.totalPayed = totalPayed;
  }

  static build = ({
    total,
    totalOpen,
    totalPayed,
  }: GetTotalExpenseResponseDTO): GetTotalExpenseResponseDTO => {
    return new GetTotalExpenseResponseDTO(total, totalOpen, totalPayed);
  };
}
