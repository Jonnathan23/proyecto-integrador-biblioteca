import { Component } from '@angular/core';
import { BookType } from '../../../../../assets/models/models';
import { DatabookService } from '../../../../services/databook.service';

@Component({
  selector: 'app-btaddbook',
  standalone: true,
  imports: [],
  templateUrl: './btaddbook.component.html',
  styleUrl: './btaddbook.component.scss'
})
export class BtaddbookComponent {

  private static instance:BtaddbookComponent;

  constructor(private bookService:DatabookService){
    if(BtaddbookComponent.instance) return BtaddbookComponent.instance

    BtaddbookComponent.instance = this
  }

  //*Funciones con interacion al service (BD)
  //?Invoca a la alerta Error o guarda el documento

  saveBook(book:BookType){
    this.bookService.addBook(book)
  }

  deleteBook(){
    
  }
  
  //Get & Set

  public static getInstance(){
    return this.instance;
  }

}
