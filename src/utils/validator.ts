import * as _ from 'lodash';
import { US_States } from '../helpers/contacts';

export function isValidEmail (email: string) : boolean {
    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return re.test(email);
}

export function isPhoneNumber (number : string) {
    const phoneNum = number.replace(/[^\d]/g, '');
    if (phoneNum.length === 7 || phoneNum.length === 10) {  
        return true;  
    } else {
        return false;
    }
}

export function isValidCityState (location : string) {
    if (!location ) return false;

    const bits = location.split(',');
    if (bits.length !== 2) return false;

    if (_.indexOf(US_States, bits[1].trim().toUpperCase()) < 0) return false;

    return true;
}