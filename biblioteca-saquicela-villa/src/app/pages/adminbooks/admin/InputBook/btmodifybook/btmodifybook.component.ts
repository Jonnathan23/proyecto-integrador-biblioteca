import { Component } from '@angular/core';
import { DatabookService } from '../../../../../services/databook.service';
import { AddbookComponent } from '../addbook.component';
import { errorInputs} from '../../../../../../alerts/alerts';

@Component({
  selector: 'app-btmodifybook',
  standalone: true,
  imports: [],
  templateUrl: './btmodifybook.component.html',
  styleUrl: './btmodifybook.component.scss'
})
export class BtmodifybookComponent {

  private static instance: BtmodifybookComponent;

  constructor(private bookService: DatabookService) {
    if (BtmodifybookComponent.instance) return BtmodifybookComponent.instance

    BtmodifybookComponent.instance = this
  }

  updateBook() {
    const inputBook = AddbookComponent.getInstance()
    const book = inputBook.getBook()
    console.log(book)

    book ? this.bookService.updateBook(book)
      .then(() => inputBook.clearInputs()) : errorInputs()
  }

}
