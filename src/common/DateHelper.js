import moment from "moment";
import 'moment/locale/pt-br';

moment.locale('pt-br')
export function dateIso8601(dateString) {
    return moment(dateString).format("YYYY-MM-DD[T]hh:mm:ss");
}

export function formatDateToDataGrid(dateString = undefined) {
    return moment(moment(dateString).toDate().toISOString()).format('ll').slice(0, -8);
}

export function formatDateToForm(dateString = undefined) {
    return moment(dateString).format("YYYY-MM-DD");
}

export function lastDayOfMonth(year, month) {
    return moment(`${year}-${month}-01`).endOf('month').toDate().toISOString();
}

export function firstDayOfMonth(year, month) {

    return moment(`${year}-${String(month).padStart(2, '0')}-01`).toDate().toISOString();
}

export function addMonth(dateString) {
    return moment(dateString).add(1, 'month').format("YYYY-MM-DD[T]hh:mm:ss");
}

export function getMonth(datestring = undefined) {
    return moment(datestring).month();
}