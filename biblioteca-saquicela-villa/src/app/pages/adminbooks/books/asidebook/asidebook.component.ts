import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SelectedbookService } from '../../../../services/forbook/selectedbook.service';
import { AdminBook } from '../../../../../assets/models/models';

@Component({
  selector: 'app-asidebook',
  standalone: true,
  imports: [],
  templateUrl: './asidebook.component.html',
  styleUrl: './asidebook.component.scss'
})
export class AsidebookComponent {
  cbText!:string
  book!:AdminBook;

  @ViewChild('name') txtName!: ElementRef;
  @ViewChild('autor') txtAutor!: ElementRef;
  @ViewChild('description') txtDescription!: ElementRef;
  @ViewChild('cbCategory') cbCategory!: ElementRef;
  @ViewChild('book_img') imgBook!: ElementRef;

  constructor(private selectedBookService: SelectedbookService, private render: Renderer2){
    this.cbText = this.selectedBookService.getCbText();
  }

  ngOnInit() {
    this.selectedBookService.getSelectedBook().subscribe((book) => {
      this.book = book      
      setTimeout(() => this.fillData(this.book), 0)
    })

  }

  /**
   * @description Llena los datos del formulario con el libro que se la ha pasado como parametro
   * @param book 
   */
  fillData(book: AdminBook) {
    this.render.setProperty(this.txtName.nativeElement, 'value', book.name)
    this.render.setProperty(this.txtAutor.nativeElement, 'value', book.autor)
    this.render.setProperty(this.txtDescription.nativeElement, 'value', book.description)
    this.cbText = book.category
    this.render.setProperty(this.imgBook.nativeElement, 'src', book.image)
  }

  aside(){

  }
}
