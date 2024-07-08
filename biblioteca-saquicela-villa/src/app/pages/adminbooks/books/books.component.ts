import { Component, Input } from '@angular/core';
import { BookType } from '../../../../assets/models/models';
import { DatabookService } from '../../../services/forbook/databook.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  private static instance: BooksComponent
  books: BookType[] = [];

  constructor(private bookService: DatabookService) {
    if (BooksComponent.instance) return BooksComponent.instance
    return BooksComponent.instance = this
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => this.books = books)
  }

}