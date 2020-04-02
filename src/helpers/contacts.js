export const US_States = ["AL", "AK", "AZ","AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

export function newAddress () {
    return {
        street1: '',
        city: '',
        state: ''
    }
}

export function newSocialAccount () {
    return {
        label: 'facebook',
        userId: ''
    }
}

export function newPhoneNumber (label) {

    label = label? label : 'mobile';
    const canReceiveText = (label === 'mobile') ? true : false;

    return {
        label: label,
        canReceiveText,
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

export function reformatPhoneNumber (number) {
    const phoneNum = number.replace(/[^\d]/g, '');
    if (phoneNum.length === 7) {
        return (phoneNum.slice(0, 3) + '-' + phoneNum.slice(3));
    } else if (phoneNum.length === 10 ){
        return ('(' + phoneNum.slice(0, 3) + ') ' + phoneNum.slice(3, 6) + '-' + phoneNum.slice(6));
    } else {
        return null;
    }
}

export function reformatWebsite (website) {
    const ws = website.toLowerCase();
    if (ws.startsWith ('http://')) {
        return ws;
    } else if (ws.startsWith ('https://')) {
        return ws;
    } else {
        return 'http://' + ws;
    }
}
