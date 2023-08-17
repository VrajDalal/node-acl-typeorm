export const CreateUploadSchema = {
    image: { type: "string", empty: false }
}

export const GetUploadByIdSchema = {
    id: { type: "string", empty: false, trim: true }
}

export const UpdateUploadSchema = {
    id: { type: "string", empty: false, trim: true },
    image: { type: "any", empty: false }
}

export const DeleteUploadSchema = {
    id: { type: "string", empty: false, trim: true }
}