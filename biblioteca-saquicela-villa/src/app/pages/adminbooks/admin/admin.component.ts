import { Component, Input, ViewChild } from '@angular/core';
import { AdminBook, BookType } from '../../../../assets/models/models';
import { __values } from 'tslib';
import { AddbookComponent } from "./addbook/addbook.component";
import { confirmDelete } from '../../../../alerts/alerts';
import { DatabookService } from '../../../services/databook.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  imports: [AddbookComponent]

})

export class AdminComponent {
  @Input({ required: true }) books?: AdminBook[];
  @ViewChild(AddbookComponent) addbookComponent!: AddbookComponent;


  //Agregar o modificar
  adminLibrary = false

  showAdminLibrary() {
    this.adminLibrary = true
    
    setTimeout(()=>{
      const addBookComponent = AddbookComponent.getInstance()
      addBookComponent.setAddBook(true)
      addBookComponent.clearInputs()
    },0)

  }

  hideAdminLibrary() {
    this.adminLibrary = false
  }

  //Envia la informacion del libro seleccionado al componente AddBookComponent
  modifyBook(book: AdminBook) {
    this.adminLibrary = true

    //Uso del setTimeout para esperar la instancia del componente
    setTimeout(() => {
      //Obtiene la instancia del componente para usar sus funciones    
      const addBookComponent = AddbookComponent.getInstance()

      addBookComponent.setAddBook(false)
      addBookComponent.selectBook(book)
    }, 0)

  }

  async delete(bookDelete: AdminBook) {
    const isConfirmed = await confirmDelete(bookDelete)
    if (isConfirmed) {
      const dataBook = DatabookService.getInstance()

      dataBook.deleteBook(bookDelete)
    }
  }
}