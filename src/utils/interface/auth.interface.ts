export interface IRegisterUser {
    id?: string,
    name: string,
    email: string,
    password: string,
    mobile_no: number,
    roles: any,
    address: IAddress,
}

export interface ICreateUser {
    id?: string,
    name: string,
    email: string,
    password: string,
    mobile_no: number,
    roles: any,
    address: IAddress,
}

export interface IUpdateUser extends ICreateUser { }

export interface IDeleteUser extends IRegisterUser { }

export interface IAddress {
    city: string,
    state: string,
    pincode: number,
    country: string,
    address_line_1: string,
    address_line_2: string
}

export interface ILoginUser {
    email: string,
    password: string
}

export interface IForgetUser {
    email: string
}

