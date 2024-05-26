import { Component, Input } from '@angular/core';
import { BookType } from '../../../../assets/models/models';
import { __values } from 'tslib';
import { AddbookComponent } from "./addbook/addbook.component";


@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    imports: [AddbookComponent]

})

export class AdminComponent {
  @Input({ required: true }) books?: BookType[];
  bookSelected!: BookType;

  //Agregar o modificar
  adminLibrary = false

  showAdminLibrary(){
    this.adminLibrary = true
  }

  hideAdminLibrary(){
    this.adminLibrary = false
  }
  
  selectBook(book: BookType){    
    this.bookSelected = book

    const addBookComponent = AddbookComponent.getInstance()
    addBookComponent.selectBook(book)
  }
  
}

