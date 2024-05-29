import { Component } from '@angular/core';
import { AdminBook, BookType } from '../../../assets/models/models';
import { DatabookService } from '../../services/databook.service';
import { BooksComponent } from "./books/books.component";
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
    selector: 'app-adminbooks',
    standalone: true,
    templateUrl: './adminbooks.component.html',
    styleUrl: './adminbooks.component.scss',
    imports: [BooksComponent, AdminComponent, HeaderComponent]
})
export class AdminbooksComponent {
  private static instance : AdminbooksComponent
  admin = true
   

  constructor(){
    if(AdminbooksComponent.instance) return AdminbooksComponent.instance
    return AdminbooksComponent.instance = this
  }


  setAdmin(option : boolean){
    this.admin = option
  }

  public static getInstance(){
    if(!this.instance){
      this.instance = new AdminbooksComponent()
    }
    return this.instance
  }

}
