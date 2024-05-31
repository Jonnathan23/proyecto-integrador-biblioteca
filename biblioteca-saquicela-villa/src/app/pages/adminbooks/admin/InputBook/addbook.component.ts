import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { AdminBook } from '../../../../../assets/models/models';
import { categories } from '../../../../../assets/data/categorias';
import { BtaddbookComponent } from "./btaddbook/btaddbook.component";
import { BtmodifybookComponent } from "./btmodifybook/btmodifybook.component";

@Component({
  selector: 'app-addbook',
  standalone: true,
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.scss',
  imports: [BtaddbookComponent, BtmodifybookComponent]
})
export class AddbookComponent {
  private static instance: AddbookComponent;

  // Determina si se agrega o se modifica
  addBook = true

  ourCategories = [...categories]

  // Verificador de la selección de img
  selected = false
  cbText = 'Seleccione Categoria';
  defaultImage = 'assets/img/selectImage.jpg'
  


  //Seleccionar elementos del doom
  @ViewChild('name') txtName!: ElementRef;
  @ViewChild('autor') txtAutor!: ElementRef;
  @ViewChild('description') txtDescription!: ElementRef;
  @ViewChild('cbCategory') cbCategory!: ElementRef;
  @ViewChild('book_img') imgBook!: ElementRef;

  //Inicializacion del objeto
  book: AdminBook = {
    id: '',
    name: '',
    description: '',
    image: '',
    autor: '',
    category: ""
  }


  constructor(private render: Renderer2) {

      if (AddbookComponent.instance) return AddbookComponent.instance
    AddbookComponent.instance = this;
  }



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
      img.src = this.defaultImage
      this.selected = false
    }
  }

  selectCategory(e: Event) {
    const category = e.target as HTMLInputElement
    this.book.category = category.value

    console.log(this.book.category)

  }

  getAllContInputs() {

    this.book.name = this.txtName.nativeElement.value
    this.book.autor = this.txtAutor.nativeElement.value
    this.book.description = this.txtDescription.nativeElement.value
    this.book.category = this.cbCategory.nativeElement.value
    this.book.image = this.imgBook.nativeElement.src

    console.log(this.book)
  }

  fillData(book: AdminBook) {
    this.render.setProperty(this.txtName.nativeElement, 'value', book.name)
    this.render.setProperty(this.txtAutor.nativeElement, 'value', book.autor)
    this.render.setProperty(this.txtDescription.nativeElement, 'value', book.description)
    this.render.setProperty(this.cbCategory.nativeElement, 'value', book.category)
    this.render.setProperty(this.imgBook.nativeElement, 'src', book.image)
  }

  clearInputs(){
    this.defaultImage = 'assets/img/selectImage.jpg'
    this.render.setProperty(this.txtName.nativeElement, 'value', "")
    this.render.setProperty(this.txtAutor.nativeElement, 'value', "")
    this.render.setProperty(this.txtDescription.nativeElement, 'value', "")
    this.render.setProperty(this.cbCategory.nativeElement, 'value', this.cbText)
    this.render.setProperty(this.imgBook.nativeElement, 'src', this.defaultImage)
  }

  checkInputs(): boolean {
    if (!this.book.name) return false    

    if(!this.book.autor) return false    

    if(!this.book.description) return false

    if(this.book.category === this.cbText) return false

    if(this.addBook) if(!this.selected) return false

    return true
  }


  //Get & Set
  getBook(): undefined | AdminBook {
    this.getAllContInputs()
    const validate = this.checkInputs()
    if (validate) {
      return this.book
    }

    return undefined
  }

  //Obtener la instancia del componente
  public static getInstance(): AddbookComponent {
    return this.instance
  }

  setBoook(book: AdminBook) {
    this.book = book
    console.log(this.book)

  }

  setAddBook(option: boolean) {
    this.addBook = option
  }

  setDefaultImage(img:string){
    this.defaultImage = img
  }

}
