import { Component } from '@angular/core';
import { AdminBook } from '../../../../assets/models/models';
import { __values } from 'tslib';
import { AddbookComponent } from "./InputBook/addbook.component";
import { confirmDelete } from '../../../../alerts/alerts';
import { DatabookService } from '../../../services/forbook/databook.service';
import { SelectedbookService } from '../../../services/forbook/selectedbook.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [AddbookComponent]

})

export class AdminComponent {

  books: AdminBook[] = [];

  constructor(private bookService: DatabookService, private selectedBookService: SelectedbookService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => this.books = books)
  }


  //Agregar o modificar
  adminLibrary = false

  showAdminLibrary() {
    this.adminLibrary = true;
    this.selectedBookService.resetBook();
  }

  hideAdminLibrary() {
    this.adminLibrary = false
  }

  
  /**
   * @description Envia la informacion del libro seleccionado al componente AddBookComponent
   * por un servicio
   * @param book 
   */
  modifyBook(book: AdminBook) {
    this.adminLibrary = true
    this.selectedBookService.setSelectedBook(book)

  }

  async delete(bookDelete: AdminBook) {
    const isConfirmed = await confirmDelete(bookDelete)    

    isConfirmed && this.bookService.deleteBook(bookDelete);
  }
}