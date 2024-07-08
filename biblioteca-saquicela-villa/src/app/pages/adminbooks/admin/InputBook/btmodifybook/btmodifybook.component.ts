import { Component, Input } from '@angular/core';
import { DatabookService } from '../../../../../services/forbook/databook.service';
import { AddbookComponent } from '../addbook.component';
import { errorInputs } from '../../../../../../alerts/alerts';
import { AdminBook, BookType } from '../../../../../../assets/models/models';

@Component({
  selector: 'app-btmodifybook',
  standalone: true,
  imports: [],
  templateUrl: './btmodifybook.component.html',
  styleUrl: './btmodifybook.component.scss'
})
export class BtmodifybookComponent {

  @Input( {required: true}) book!: AdminBook;
  constructor(private bookService: DatabookService) {}

  updateBook() {
    //this.bookService.updateBook(this.book)
    console.log(this.book)
  }

}
