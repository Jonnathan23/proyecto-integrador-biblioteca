// Estructura del Objeto libro
export type BookType = {
    
    name: string
    description: string
    image: string
    autor: string
    category: string
}

export type AdminBook = Pick<BookType, 'name' | 'description' | 'image' | 'autor' | 'category'> &{
    id:string
}

export type BookExtraType = BookType & {
    rankin: number

}
// Estructura de una categoria
export type CategoryType = {
    title: string
    description: string
    image: string
}

// Estructura del Objeto Usuario
export type UserType = {
    name: string
    lastname: string
    cell: string
    email: string
    password: string
    admin: boolean
}

export type LoginUser = Pick<UserType, 'email' | 'password'>