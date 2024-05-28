// Estructura del Objeto libro
export type AdminBook = {
    id :string
    name: string
    description: string
    image: string
    autor: string
    category: string
}

export type BookType = Pick<AdminBook, 'name' | 'description' | 'image' | 'autor' | 'category'> 

// Estructura de una categoria
export type CategoryType = {
    title: string
    description: string
    image: string
}

// Estructura del Objeto Usuario
export type UserType = {
    id: string
    name: string
    lastname: string
    cell: string
    email: string
    password: string
    admin: boolean
}

export type LoginUser = Pick<UserType, 'id' | 'email' | 'password'>