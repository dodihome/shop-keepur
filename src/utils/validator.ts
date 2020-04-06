import * as _ from 'lodash';
import { US_States } from '../helpers/contacts';
import { IAddress } from '../lib/business/business.interface';
import Dodi from './Dodi';

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

export function parseAddress (str: string) : IAddress {
    const bits = str.split(',');
    const addr = {} as any;

    let stateZipIdx, cityIdx = -1;
    const stateZipRE = new RegExp ('^[A-Z]{2}(\s+\d{5})?', 'i');
    bits.forEach ((b, idx)=> {
        if (stateZipRE.test(b.trim().toUpperCase())) {
            stateZipIdx = idx;
        }
    })

    if (stateZipIdx >= 0) {
        const stateZipBits = bits[stateZipIdx].trim().split (/\s/);

        addr.state = stateZipBits[0].trim().toUpperCase();
        if (stateZipBits.length > 1)
            addr.zipcode = parseInt(stateZipBits[1].trim());

        if (stateZipIdx > 0) {
            cityIdx = stateZipIdx - 1;
        }
    } else {
        const location = Dodi.location();
        const lBits = location.split(',');
        addr.state = lBits[1].trim().toUpperCase();
        addr.city = lBits[0].trim();
    }

    if (cityIdx >= 0) {
        addr.city = bits[cityIdx].trim();

        if (cityIdx >=1 ) {
            addr.street1 = bits[0].trim();
        }

        if (cityIdx >=2) {
            addr.street2 = bits[1].trim();
        }
    } else {
        addr.street1 = bits[0].trim();
    }

    return addr;
}