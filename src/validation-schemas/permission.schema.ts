export const CreatePermissionSchema = {
    name: { type: "string", empty: false, trim: true }
}

export const GetPermissionByIdSchema = {
    id: { type: "string", empty: false, trim: true }
}

export const UpdatePermissionSchema = {
    name: { type: "string", empty: false, trim: true }
}

export const DeletePermissionSchema = {
    id: { type: "string", empty: false, trim: true }
}