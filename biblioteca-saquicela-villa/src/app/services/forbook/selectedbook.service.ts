import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminBook } from '../../../assets/models/models';
import { statesBook } from '../../../assets/data/data';

@Injectable({
  providedIn: 'root'
})
export class SelectedbookService {
  private cbText = 'Seleccione Categoria';
  private cbDate = 'Seleccione fecha'
  private srcImageNotFound = 'assets/img/selectImage.jpg'

  private defaulState = statesBook[0].description;
  private restarBook:AdminBook = { id: '', name: '', description: '', image: this.srcImageNotFound, autor: '', category: this.cbText, state:this.defaulState}
  private selectedBook = new BehaviorSubject<AdminBook>(this.restarBook);
  selectedBook$:Observable<AdminBook> = this.selectedBook.asObservable();

  constructor() { }

  /** 
 * 
 * @description setea el libro en el observable de este servicio
 * @param book 
 */
  setSelectedBook(book:AdminBook){  
    this.selectedBook.next(book);    
  }
  
  /**
   * @description reinicia el valor del libro en el observable
   */
  resetBook(){    
    this.selectedBook.next(this.restarBook);    
  }

  getRestarBook(){
    return this.restarBook;
  }

  getImgNotFound(){
    return this.srcImageNotFound;
  }

  getCbText(){
    return this.cbText;
  }

  getCbDate(){
    return this.cbDate;
  }

  /**
   * 
   * @returns selectedBook$ --> libro que se encuentra actualmente
   */
  getSelectedBook(){
    return this.selectedBook$
  }

  getDefaultSate(){
    return this.defaulState
  }
}
