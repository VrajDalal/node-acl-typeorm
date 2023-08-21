
export const CreatePostItem = {
    name: { type: 'string', empty: false, trim: true },
    short_description: { type: 'string', empty: false },
    detail: { type: 'string', empty: false },
    likes: { type: 'number', empty: false, trim: true },
    views: { type: 'number', empty: false, trim: true },
    shares: { type: 'number', empty: false, trim: true },
    users: { type: 'string', empty: false, trim: true },
    image: { type: 'string', empty: false, trim: true },
    category: { type: 'string', empty: false, trim: true }
}

export const GetPostById = {
    id: { type: 'string', empty: false, trim: true }
}

export const UpdatePostItem = {
    name: { type: 'string', empty: true, trim: true },
    short_description: { type: 'string', empty: true },
    detail: { type: 'string', empty: true },
    likes: { type: 'number', empty: true, trim: true },
    views: { type: 'number', empty: true, trim: true },
    shares: { type: 'number', empty: true, trim: true },
    users: { type: 'string', empty: true, trim: true },
    image: { type: 'string', empty: true, trim: true },
    category: { type: 'string', empty: true, trim: true }
}

export const DeletePostById = {
    id: { type: 'string', empty: false, trim: true }
}