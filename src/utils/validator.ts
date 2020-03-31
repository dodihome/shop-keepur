
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