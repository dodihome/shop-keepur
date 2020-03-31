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

export function cleanUpContactInfo (contactInfo) {

}