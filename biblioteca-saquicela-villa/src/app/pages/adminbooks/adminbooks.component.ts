import { Component } from '@angular/core';
import { BookType } from '../../../assets/models/models';
import { DatabookService } from '../../services/databook.service';
import { BooksComponent } from "./books/books.component";
import { AdminComponent } from './admin/admin.component';

@Component({
    selector: 'app-adminbooks',
    standalone: true,
    templateUrl: './adminbooks.component.html',
    styleUrl: './adminbooks.component.scss',
    imports: [BooksComponent, AdminComponent]
})
export class AdminbooksComponent {
  admin = true
  allBooks:BookType[] = []
  
  constructor(private bookService:DatabookService){}

  ngOnInit(){
    this.bookService.getBooks().subscribe( (books) => this.allBooks = books)
  }

}
