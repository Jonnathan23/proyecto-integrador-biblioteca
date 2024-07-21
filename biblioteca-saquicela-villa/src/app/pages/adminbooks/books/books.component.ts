import { Component} from '@angular/core';
import { AdminBook, BookType } from '../../../../assets/models/models';
import { DatabookService } from '../../../services/forbook/databook.service';
import { AsidebookComponent } from "./asidebook/asidebook.component";
import { SelectedbookService } from '../../../services/forbook/selectedbook.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsidebookComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {  
  books: AdminBook[] = [];
  isLendingBook = false;

  constructor(private bookService: DatabookService, private selectedBookService: SelectedbookService) {    
    
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => this.books = books)
  }

  setAsideBook(book:AdminBook){
    this.isLendingBook = true;
    this.selectedBookService.setSelectedBook(book)
  }

  hideAsideBook(){
    this.isLendingBook = false
  }

}