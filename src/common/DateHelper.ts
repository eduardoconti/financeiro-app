import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");
export function dateNow(): Date {
  return moment().toDate();
}

export function dateIso8601(dateString: string | Date | undefined): string {
  return moment(dateString).format("YYYY-MM-DD[T]hh:mm:ss");
}

export function formatDateToDataGrid(dateString: string | Date | undefined) {
  return moment(moment(dateString).toDate().toISOString()).format("DD dddd");
}

export function formatDateToForm(
  dateString?: string | Date | undefined
): string {
  return moment(dateString).format("YYYY-MM-DD");
}

export function lastDayOfMonth(year: number, month: number): string {
  return moment({ year, month, day: 1 }).endOf("month").toDate().toISOString();
}

export function firstDayOfMonth(year: number, month: number): string {
  return moment({ year, month, day: 1 }).toDate().toISOString();
}

export function addMonth(dateString: string | Date | undefined): string {
  return moment(dateString).add(1, "month").format("YYYY-MM-DD[T]hh:mm:ss");
}

export function getMonth(datestring?: string | Date | undefined): number {
  return moment(datestring).month();
}

export function getDay(datestring?: string | Date | undefined): number {
  return parseInt(moment(datestring).format('D'));
}
