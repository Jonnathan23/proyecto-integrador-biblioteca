import { Component } from '@angular/core';
import { AdminBook } from '../../../assets/models/models';
import { DatabookService } from '../../services/forbook/databook.service';
import { LendsbooksComponent } from "./lendsbooks/lendsbooks.component";
import { ReturnsbooksComponent } from "./returnsbooks/returnsbooks.component";

@Component({
  selector: 'app-historybooks',
  standalone: true,
  imports: [LendsbooksComponent, ReturnsbooksComponent],
  templateUrl: './historybooks.component.html',
  styleUrl: './historybooks.component.scss'
})
export class HistorybooksComponent {
  books: AdminBook[] = []
  shownBookId: string | null = null;
  showLends = false
  //isBookShown = true

  constructor(private bookService: DatabookService) { }
  ngOnInit() {
    this.bookService.getBooks().subscribe(books => this.books = books)
  }

  deployContent(bookId: string) {
    this.shownBookId = this.shownBookId === bookId ? null : bookId;   
  }

  isBookShown(bookId: string): boolean {
    return this.shownBookId === bookId;

  }
}
