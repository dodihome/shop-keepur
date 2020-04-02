export interface IPhoneNumber {
    label: string,
    number: string,
    canReceiveText: boolean
}

export interface IAddress {
    street1 : string,
    street2 : string,
    city : string,
    state: string
}

export interface ISocialMediaAccount {
    socialMedia: string,
    handle: string,
    verified: boolean,
    connected: boolean
}

export interface CreateBizDto {
    name: string,
    address: IAddress,
    phone: IPhoneNumber,
    website: string,
    createdBy: string
};

export interface IProduct {
    name: string,
    description: string,
    photos: any []
}

export interface IInventoryItem {
    product: IProduct,
    isInstock: boolean,
    timestamp: Date
}

export interface IBizLite {
    id: string,
    name: string,
    address: IAddress,
    phone: IPhoneNumber,
    isClaimed: boolean
}

export interface IBizConsumerView {
    id: string,
    name: string,
    address: IAddress;
    phones: IPhoneNumber [],
    website: string,
    social: ISocialMediaAccount[],
    emails: string[],
    isClaimed: boolean,
    inventory: IInventoryItem[]
}
