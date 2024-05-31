import { Component } from '@angular/core';
import { DatabookService } from '../../../../../services/databook.service';
import { AddbookComponent } from '../addbook.component';
import { errorInputs, errorSave } from '../../../../../../alerts/alerts';
import { BookType } from '../../../../../../assets/models/models';

@Component({
  selector: 'app-btaddbook',
  standalone: true,
  imports: [],
  templateUrl: './btaddbook.component.html',
  styleUrl: './btaddbook.component.scss'
})
export class BtaddbookComponent {

  private static instance: BtaddbookComponent;

  constructor(private bookService: DatabookService) {
    if (BtaddbookComponent.instance) return BtaddbookComponent.instance

    BtaddbookComponent.instance = this
  }

  saveBook() {
    const inputBook = AddbookComponent.getInstance()
    const book = inputBook.getBook() as BookType

    book ? this.bookService.addBook(book)
      .then(() => inputBook.clearInputs()) : errorInputs()
  }

}
