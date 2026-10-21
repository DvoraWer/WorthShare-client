export interface Category{
    id:number,
    name:string,
    description:string|null
}

export interface AdminCategory extends Category {
    isActive: boolean,
    createdAt: string,
    updatedAt: string
}

export interface CategoryInput {
    name: string,
    description: string
}
