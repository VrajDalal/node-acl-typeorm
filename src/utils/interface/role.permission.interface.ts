export interface ICreateRole {
    id?: string;
    name: string;
    permissions: string[];
}

export interface IUpdateRole extends ICreateRole { }

export interface IDeleteRole extends ICreateRole { }

export interface ICreatePermission {
    id?: string;
    name: string;
}

export interface IUpdatePermission extends ICreatePermission { }

export interface IDeletePermission extends ICreatePermission { }