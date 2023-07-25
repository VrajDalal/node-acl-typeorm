export interface IRegisterUser {
    name: string,
    email: string,
    password: string,
    mobile_no: number,
    roles: any,
    address: IAddress,
}

export interface ICreateUser {
    name: string,
    email: string,
    password: string,
    mobile_no: number,
    roles: any,
    address: IAddress,
}

export interface IGetUser {
    id?: string
}

export interface IUpdateUser extends ICreateUser, IGetUser { }

export interface IDeleteUser {
    id: string
}


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

