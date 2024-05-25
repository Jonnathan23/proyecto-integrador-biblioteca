import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { error } from '../../../../../alerts/alerts';
import { BookType } from '../../../../../assets/models/models';
import { DatabookService } from '../../../../services/databook.service';

@Component({
  selector: 'app-modifybook',
  standalone: true,
  imports: [],
  templateUrl: './modifybook.component.html',
  styleUrl: './modifybook.component.scss'
})
export class ModifybookComponent {
  // Verificador de la selección de img
  selected = false
  cbText = 'Seleccione Categoria'



  //Seleccionar elementos del doom
  @ViewChild('name') txtName!: ElementRef;
  @ViewChild('autor') txtAutor!: ElementRef;
  @ViewChild('description') txtDescription!: ElementRef;
  @ViewChild('cbCategory') cbCategory!: ElementRef;
  @ViewChild('book_img') imgBook!: ElementRef;


  //Inicializacion del objeto
  book: BookType = {
    name: '',
    description: '',
    image: '',
    autor: '',
    category: ""
  }

  constructor(private bookService: DatabookService, private render: Renderer2) { }

  //Funciones
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

  selectCategory(e: Event) {
    const category = e.target as HTMLInputElement
    this.book.category = category.value

    console.log(this.book.category)

  }

  getName(name: string) {
    this.book.name = name

  }

  getAutor(autor: string) {
    this.book.autor = autor
  }

  getDescription(desciption: string) {
    this.book.description = desciption
  }
  selectBook(book: BookType) {
    this.render.setAttribute(this.txtName.nativeElement, 'value', book.name)
    this.render.setAttribute(this.txtAutor.nativeElement, 'value', book.autor)
    this.render.setProperty(this.txtDescription.nativeElement, 'value', book.description)
    this.render.setProperty(this.cbCategory.nativeElement, 'value', book.category)
    this.render.setAttribute(this.imgBook.nativeElement, 'src', book.image)


    console.log(`Select: ${this.cbCategory.nativeElement.value}`)

  }

  //Verificacion de campos llenos
  checkField(): boolean {
    if (!this.book.name) {
      error('Nombre')
      return false;
    }
    if (!this.book.description) {
      error('Descripción')
      return false;
    }
    if (!this.selected) {
      error('Seleccionar Imagen')
      return false;
    }
    if (this.book.category === '') {
      error('Seleccionar Categoria')
      return false;
    }

    return true
  }

  //*Funciones con interacion al service (BD)
  //?Invoca a la alerta Error o guarda el documento
  saveBook(src: string) {
    if (this.checkField()) {
      this.book.image = src
      this.bookService.addBook(this.book)
    }
  }

  //?
  saveChanges() {
    console.log(`Book: ${this.book}`)
  }
}
