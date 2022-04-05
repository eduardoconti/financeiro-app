import moment from "moment";
import 'moment/locale/pt-br';
moment.locale('pt-br')
export function dateIso8601(dateString = null) {
    return moment(dateString).format("YYYY-MM-DD[T]hh:mm:ss");
}

export function formatDateToDataGrid(dateString = null){
    return moment(dateString).format("ll").slice(0, -8);
}

export function formatDateToForm(dateString = null){
    return moment(dateString).format("YYYY-MM-DD");
}

export function lastDayOfMonth(year, month){
    return moment( `${year}-${month}-1`).endOf('month').format("YYYY-MM-DD[T]23:59:59");
}

export function firstDayOfMonth(year, month){
    return `${year}-${month}-01T:00:00:00`;
}

export function addMonth(dateString){
    return moment(dateString).add(1,'month').format("YYYY-MM-DD[T]hh:mm:ss");;
}