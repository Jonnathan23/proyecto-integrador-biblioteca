import Swal from 'sweetalert2'

export function save() {
    Swal.fire({
        title: 'Se ha guardado con exito',
        icon: 'success',
        timer: 3000
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