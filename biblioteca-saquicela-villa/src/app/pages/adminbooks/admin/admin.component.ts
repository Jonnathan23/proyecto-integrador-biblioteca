import { Component, Input } from '@angular/core';
import { BookType, CategoryType } from '../../../../assets/models/models';
import { categories } from '../../../../assets/data/categorias';
import { DatabookService } from '../../../services/databook.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  @Input({required:true}) books?:BookType[];

  book: BookType = {
    name: '',
    description: '',
    image: '',
    autor: '',
    category: ""
  }
  cbText = 'Seleccione Categoria'
  ourCategories:CategoryType[] = [...categories]

  // Verificador de la selección de img
  selected = false

  constructor(private bookService: DatabookService){}


  

  selectImg(e: Event, img: HTMLImageElement) {
    const input = e.target as HTMLInputElement

    //Verifica si se ha seleccionado la imagen
    if (input.files?.[0]) {
      const reader = new FileReader()
      reader.onload = () => img.src = reader.result as string
      reader.readAsDataURL(input.files[0])

      this.selected = true
    } else {
      img.src = '../../../assets/img/sala.jpg'
      this.selected = false
    }
  }

  selectCategory(e:Event){
    const category = e.target as HTMLInputElement    
    this.book.category = category.value

    console.log(this.book.category)

  }

  getName(name: string) {
    this.book.name = name

  }
  getAutor(autor: string){
    this.book.autor = autor
  }

  getDescription(desciption: string) {
    this.book.description = desciption
  }

  saveBook(src: string) {
    if (!this.book.name) {
      this.message('Nombre')
      return;
    }
    if (!this.book.description) {
      this.message('Descripción')
      return;
    }
    if (!this.selected) {
      this.message('Seleccionar Imagen')
      return;
    }
    if(this.book.category ===''){
      this.message('Seleccionar Categoria')
      return;
    }

    this.book.image = src

    this.message(false)
    this.bookService.addBook(this.book)

  }

    //Funcion para mensaje de error o de guardado
  // Recibe un texto o un Boleano: False
  message(msg: string | boolean) {
    const div = document.getElementById("msg")
    const message = document.createElement('P');

      //texto: error, bolleano: false -> guardar
    message.textContent = msg ? `El campo ${msg} está vacío` : `Se ha guardado con exito`    
    message.classList.add(msg ? 'error' : 'guardar')

    div?.appendChild(message)

    //Desaparezca después de 5s
    setTimeout(() => message.remove(), 10000);

  }

}
