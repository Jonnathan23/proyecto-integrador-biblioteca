import { Component } from '@angular/core';
import { DatabookService } from '../../../../../services/databook.service';
import { AddbookComponent } from '../addbook.component';
import { errorSave } from '../../../../../../alerts/alerts';

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
    const inputBook = AddbookComponent.getInstance() //Obtiens al componente --> var addbok = new AddbookComponent()
    const book = inputBook.getBook()

    console.log(book)

    book ? this.bookService.updateBook(book):errorSave()    
  } 

}
