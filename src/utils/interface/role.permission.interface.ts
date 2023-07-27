export interface ICreateRole {
    name: string;
    permissions: string[];
}

export interface IGetRole {
    id: string
}

export interface IUpdateRole extends ICreateRole,IGetRole { }

export interface IDeleteRole extends ICreateRole,IGetRole { }

export interface ICreatePermission {
    id?: string;
    name: string;
}

export interface IUpdatePermission extends ICreatePermission { }

export interface IDeletePermission extends ICreatePermission { }