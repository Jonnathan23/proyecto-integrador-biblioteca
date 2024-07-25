/** @description Modelo para indicar los estados del libro*/
export type StateBook = {
    id: number
    description: string
}

// Estructura del Objeto libro
export type AdminBook = {
    id: string
    name: string
    description: string
    image: string
    autor: string
    category: string
    state: StateBook['description']
}

/** @description Modelo para guardar un nuevo libro que no se ha creado con anterioridad sin la necesidad de colocar el id*/
export type BookType = Pick<AdminBook, 'name' | 'description' | 'image' | 'autor' | 'category' | 'state'>


/** @description Modelo para tabla de my books */
export type MyBooksModel = {
    id: string
    idUser: string
    nameUser: string
    idBook: string
    nameBook: string
    stateBook: StateBook['description']
}

/** @description Modelo para el historial de prestamos de libros */
export type BookHistory = Pick<AdminBook, 'id' | 'name' | 'category'> & {
    idBook: string
    idUser: string
    nameUser: string
    date: Date | string
}
// Estructura de una categoria
export type CategoryType = {
    title: string
    description: string
    image: string
}

// Estructura del Objeto Usuario
export type UserType = {
    idUser: string
    idDoc: string
    name: string
    lastname: string
    cell: string
    email: string
    password: string
    image: string
    admin: boolean
}

export type Dates = {
    id: number
    description: string
    days: number
}

export type AddUser = Pick<UserType, 'name' | 'lastname' | 'cell' | 'email' | 'password' | 'image' | 'admin'>

export type LoginUser = Pick<UserType, 'email' | 'password'>

//Atribuciones
export type Atribuciones = {
    url: string
    texto: string
}