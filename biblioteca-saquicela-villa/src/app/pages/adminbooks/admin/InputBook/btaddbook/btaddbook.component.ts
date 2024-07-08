import { Component, Input } from '@angular/core';
import { DatabookService } from '../../../../../services/forbook/databook.service';
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

  @Input({ required: true }) book!: BookType;
  constructor(private bookService: DatabookService) { }

  saveBook() {
    //this.bookService.addBook(this.book)
    console.log(this.book)
  }

}
