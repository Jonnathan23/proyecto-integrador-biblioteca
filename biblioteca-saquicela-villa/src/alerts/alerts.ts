import Swal from 'sweetalert2'
import { BookType } from '../assets/models/models'

//* Libros
//Guardar
export function save() {
    Swal.fire({
        title: 'Se ha guardado con exito',
        icon: 'success',
        timer: 3000,
    })
}

// Borrar
export function deleteSuccess() {
    Swal.fire({
        title: 'Eliminado',
        text: 'Se ha borrado correctamente',
        icon: 'info',
        timer: 3000,
    })
}

// Borrar
export function errorDelete() {
    Swal.fire({
        title: 'No se ha elimnado',
        text: 'Error al eliminar el libro',
        icon: 'error',
        timer: 3000,
    })
}




// Campos de agregar libro vacios
export function errorInputs(campo: string) {
    Swal.fire({
        title: `Error al guardar`,
        text: `el campo ${campo} está vacio`,
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

//Confirmar Borrar un libro
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