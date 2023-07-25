export const GetUserById = {
    id: { type: 'string', empty: false, trim: true }
}

export const CreaterUserSchema = {
    name: { type: 'string', empty: false, trim: true },
    email: { type: 'string', lowercase: true, empty: false, trim: true },
    password: { type: 'string', empty: false },
    mobile_no: { type: 'number', empty: true, optional: true },
    address: { type: 'object', empty: true, optional: true }
}

export const UpdateUserSchema = {
    id: { type: 'string', empty: true, trim: true },
    name: { type: 'string', empty: true, trim: true, optional: true },
    email: { type: 'string', lowercase: true, empty: true, trim: true, optional: true },
    password: { type: 'string', empty: true, optional: true },
    mobile_no: { type: 'number', empty: true, optional: true },
    address: { type: 'object', empty: true, optional: true }
}

export const DeleteUserSchema = {
    id: { type: 'string', empty: false, trim: true }
}