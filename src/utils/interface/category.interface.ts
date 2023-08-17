
export interface ICreateCategory {
    image: any
    name: string
}

export interface IGetCategory {
    name: string
}

export interface IGetCategoryById {
    id: string
}

export interface IUpdateCategory {
    id: string
    image: any
    name: string
    
}

export interface IDeleteCategory extends IGetCategoryById { }