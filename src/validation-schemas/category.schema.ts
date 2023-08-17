export const CreateCategorySchema = {
    name: { type: "string", empty: false, trim: true },
    image: { type: "any", empty: false, trim: true },
}

export const GetCategoryByIdSchema = {
    id: { type: "string", empty: false, trim: true }
}

export const UpdateCategorySchema = {
    id: { type: "string", empty: false, trim: true },
    image: { type: "any", empty: false, trim: true, optional: true },
    name: { type: "string", empty: false, trim: true, optional: true },
}

export const DeleteCategorySchema = {
    id: { type: "string", empty: false, trim: true }
}
