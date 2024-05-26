import Swal from 'sweetalert2'
import { BookType } from '../assets/models/models'
//const btcolor = 'kk'

export function save() {
    Swal.fire({
        title: 'Se ha guardado con exito',
        icon: 'success',
        timer: 3000,        
    })
}

export function error(campo: string) {
    Swal.fire({
        title: `Error al guardar`,
        text: `el campo ${campo} está vacio`,
        icon: 'error',
        timer: 5000
    })
}

export function errorSave() {
    Swal.fire({
        title: `Error al guardar`,
        text: `Lo sentimos, hubo un error al momento de guardar`,
        icon: 'error',
        timer: 5000
    })
}

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