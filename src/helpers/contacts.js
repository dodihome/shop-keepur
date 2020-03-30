import { isContext } from 'vm';

const _ = require('lodash');

export function newAddress () {
    return {
        placeId: '',
        formattedAddress: ''
    };
}

export function newSocialAccount () {
    return {
        label: 'facebook',
        userId: ''
    }
}

export function newPhoneNumber () {
    return {
        label: 'mobile',
        canReceiveText: true,
        number: ''
    }
}

export function newContactInfo () {
    return {
        emails: [''],
        phones: [newPhoneNumber()],
        socialAccounts: [newSocialAccount()],
        website: '',
        address: newAddress()
    };
}

export function newPersonContact () {
    return {
        name: '',
        firstName: '',
        lastName: '',
        contactInfo: newContactInfo(),
        isPerson: true,
        orgId: null
    }
}

export function newOrgContact () {
    return {
        name: '',
        firstName: '',
        lastName: '',
        contactInfo: newContactInfo(),
        isPerson: false,
        persons: []
    }
}

export function isEmail(email){
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( email );	
}

export function reformatPhoneNumber (number) {
    const phoneNum = number.replace(/[^\d]/g, '');
    if (phoneNum.length == 7) {
        return (phoneNum.slice(0, 3) + '-' + phoneNum.slice(3));
    } else if (phoneNum.length == 10 ){
        return ('(' + phoneNum.slice(0, 3) + ') ' + phoneNum.slice(3, 6) + '-' + phoneNum.slice(6));
    } else {
        return null;
    }
}


export function cleanUpContactInfo (contactInfo) {

}