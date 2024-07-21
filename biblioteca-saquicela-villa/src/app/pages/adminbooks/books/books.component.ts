import { Component} from '@angular/core';
import { AdminBook, BookType } from '../../../../assets/models/models';
import { DatabookService } from '../../../services/forbook/databook.service';
import { AsidebookComponent } from "./asidebook/asidebook.component";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [AsidebookComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  private static instance: BooksComponent
  books: AdminBook[] = [];
  isLendingBook = false;

  constructor(private bookService: DatabookService) {
    if (BooksComponent.instance) return BooksComponent.instance
    return BooksComponent.instance = this
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => this.books = books)
  }

  setAsideBook(book:AdminBook){

  }

  hideAsideBook(){
    this.isLendingBook = false
  }

}