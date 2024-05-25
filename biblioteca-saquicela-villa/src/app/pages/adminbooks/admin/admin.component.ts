import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { BookType, CategoryType } from '../../../../assets/models/models';
import { categories } from '../../../../assets/data/categorias';
import { DatabookService } from '../../../services/databook.service';
import { error } from '../../../../alerts/alerts';
import { __values } from 'tslib';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  @Input({ required: true }) books?: BookType[];
  ourCategories: CategoryType[] = [...categories]
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



  constructor(private bookService: DatabookService, private render:Renderer2) { }




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
  //Invoca a la alerta Error o guarda el documento
  saveBook(src: string) {
    if (!this.book.name) {
      error('Nombre')
      return;
    }
    if (!this.book.description) {
      error('Descripción')
      return;
    }
    if (!this.selected) {
      error('Seleccionar Imagen')
      return;
    }
    if (this.book.category === '') {
      error('Seleccionar Categoria')
      return;
    }

    this.book.image = src
    this.bookService.addBook(this.book)

  }

  selectBook(book:BookType){
    console.log('Clic para modificar')
    this.render.setAttribute(this.txtName.nativeElement, 'value', book.name)
    this.render.setAttribute(this.txtAutor.nativeElement,'value',book.autor)
    this.render.setAttribute(this.txtDescription.nativeElement,'value', book.description)
    this.render.setAttribute(this.cbCategory.nativeElement,'value',book.category)
    this.render.setAttribute(this.imgBook.nativeElement,'src',book.image)

  }


}

