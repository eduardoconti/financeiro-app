export class Money {
  static format(value: number): string {
    return ((value / 100)).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  static formatToNumber(value: string) {
    return parseFloat(value.replace(/[^0-9]+/g, ""));
  }

  static toFloat(value: number): number {
    return value / 100;
  }

  static toInteger(value: number): number {
    return Math.round(value * 100);
  }

  static formatBrl(value: number): string {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }
}
