import { Component } from '@angular/core';
import { DatabookService } from '../../../../../services/databook.service';
import { AddbookComponent } from '../addbook.component';
import { errorSave } from '../../../../../../alerts/alerts';

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
    const inputBook = AddbookComponent.getInstance() //Obtiens al componente --> var addbok = new AddbookComponent()
    const book = inputBook.getBook()

    book ? this.bookService.addBook(book):errorSave()    
  } 

}
