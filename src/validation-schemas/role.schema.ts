export const CreateRoleSchema = {
    name: { type: "string", empty: false, trim: true },
    permissions: { type: "array", empty: false, trim: true }
}

export const GetRolesByIdSchema = {
    id: { type: "string", empty: false, trim: true }
}

export const UpdateRoleSchema = {
    name: { type: "string", empty: false, trim: true }
}

export const DeleteRoleSchema = {
    id: { type: "string", empty: false, trim: true }
}