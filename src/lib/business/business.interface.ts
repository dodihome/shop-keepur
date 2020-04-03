export interface IPhoneNumber {
    label: string,
    number: string,
    canReceiveText: boolean
}

export interface IAddress {
    _id: string,
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

export interface UpdateBizDto {
    id: string
    name: string,
    address: IAddress,
    phone: IPhoneNumber,
    website: string,
    updatedBy: string
}

export interface ITaggable {
    tags: string[]
}

export interface IProduct extends ITaggable {
    name: string,
    description: string,
}

export enum InventoryStatus {
    IN_STOCK,
    OUT_OF_STOCK,
    UNKNOWN
}

export interface IInventoryItem {
    _id: string,
    product: IProduct,
    votes: number,
    status: InventoryStatus,
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
    people: any[],
    inventory: IInventoryItem[]
}
