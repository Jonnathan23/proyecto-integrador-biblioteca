import Swal from 'sweetalert2'
import { BookType } from '../assets/models/models'

//* Libros
//Guardar
/**
 * @description alerta para el guardado exitosamente
 */
export function saveBook() {
    Swal.fire({
        title: 'Se ha guardado con exito',
        icon: 'success',
        timer: 3000,
    })
}


export function modifyBook() {
    Swal.fire({
        title: 'Modificado correctamente',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true
    })
}

export function errorModifyBook() {
    Swal.fire({
        title: 'Error al modificar el libro',
        icon: 'error',
        text: 'Lo sentimos, hubo un error al modificar',
        timer: 4000
    })
}

//* Borrar
/**
 * @description alerta para informar de que se ha eliminado correctamente
 */
export function deleteSuccess() {
    Swal.fire({
        title: 'Eliminado',
        text: 'Se ha borrado correctamente',
        icon: 'info',
        timer: 3000,
    })
}

/**
 * @description error con la BD al borrar la información
 */
export function errorDelete() {
    Swal.fire({
        title: 'No se ha elimnado',
        text: 'Error al eliminar el libro',
        icon: 'error',
        timer: 3000,
    })
}




// Campos de agregar libro vacios
export function errorInputs() {
    Swal.fire({
        title: `Error al guardar`,
        text: `Verifique que todos los campos estén llenos`,
        icon: 'error',
        timer: 5000
    })
}

// Error de guardar en la BD
export function errorSave() {
    Swal.fire({
        title: `Error al guardar`,
        text: `Lo sentimos, hubo un error al momento de guardar`,
        icon: 'error',
        timer: 5000
    })
}


/**
 * @description Confirmar Borrar un libro
 * @param bookDelete 
 * @returns Promesa<Boolean>
 */
export async function confirmDelete(bookDelete: BookType): Promise<boolean> {
    const result = await Swal.fire({
        title: 'Eliminar',
        text: `Está seguro que desea eliminar el libro ${bookDelete.name}`,
        icon: 'question',
        showConfirmButton: true,
        confirmButtonColor: '#ff0000',
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#2F358B',
        imageUrl: bookDelete.image,
        imageWidth: '35rem',
        imageAlt: 'Imagen del libro'
    });

    return result.isConfirmed;
}


//* Usuario
/**
 * @description Advertencia de que la contraseña es muy corta
 */
export function shortPassword() {
    Swal.fire({
        title: 'Contraseña error',
        text: 'La contraseña es muy corta',
        icon: 'error',
        position: 'bottom',

        showCancelButton: false,
        showConfirmButton: false,
        closeButtonAriaLabel: 'X',

        allowOutsideClick: true,
        backdrop: false,

        timer: 3000,
    })
}

export function errorSignIn() {
    Swal.fire({
        title: 'Error de Ingreso',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        timer: 3000,
    })
}

export function modifyUser() {
    Swal.fire({
        title: 'Usuario modificado con exito',
        icon: 'success',
        timer: 3000,
    })
}

export function userExist() {
    Swal.fire({
        title: 'Fallo al registrarse',
        text: 'El usuario ya existe, use otro correo',
        icon: 'error',
        timer: 6000,
    })
}