import moment from 'moment';

const DATE_FORMAT = 'MM/DD/YY';

export function currency (amount : any) {
    return numeral(amount).format('(0,0.00)');
}

export function percentage (amount: any) {
    return numeral(amount).format('0.00%');
}

export function float (amount : any) {
    return numeral(amount).format('(0,0.00)');
}

export function shortDate (date: Date) {
    return moment(date).format(DATE_FORMAT);
}
