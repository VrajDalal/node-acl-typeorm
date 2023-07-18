export const RegisterSchema = {
    name: { type: "string", empty: false, trim: true },
    email: { type: 'string', lowercase: true, empty: false, trim: true },
    password: { type: 'string', empty: false },
    mobile_no: { type: 'number', empty: true, optional: true },
    address: { type: 'object', empty: true, optional: true }
}

export const CreaterUserSchema = {
    name: { type: 'string',empty: false, trim: true },
    email: { type: 'string', lowercase: true, empty: false, trim: true },
    password: { type: 'string', empty: false },
    mobile_no: { type: 'number', empty: true, optional: true },
    address: { type: 'object', empty: true, optional: true }
}

export const LoginSchema = {
    email: { type: 'string', lowercase: true, empty: false, trim: true },
    password: { type: 'string', empty: false }
}

export const ForgetPasswordSchema = {
    email: { type: 'string', lowercase: true, empty: false, trim: true }
}
