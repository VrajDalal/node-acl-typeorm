export const CreateCategorySchema = {
    image: { type: "string", empty: false, trim: true },
    name: { type: "string", empty: false, trim: true },
}

export const GetCategoryByIdSchema = {
    id: { type: "string", empty: false, trim: true }
}

