import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminBook } from '../../../assets/models/models';

@Injectable({
  providedIn: 'root'
})
export class SelectedbookService {
  private cbText = 'Seleccione Categoria';
  private srcImageNotFound = 'assets/img/selectImage.jpg'

  private restarBook:AdminBook = { id: '', name: '', description: '', image: this.srcImageNotFound, autor: '', category: this.cbText }
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
    console.log(this.selectedBook$)
  }
  
  /**
   * @description reinicia el valor del libro en el observable
   */
  resetBook(){    
    this.selectedBook.next(this.restarBook);
    console.log(this.selectedBook$)
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

  /**
   * 
   * @returns selectedBook$ --> libro que se encuentra actualmente
   */
  getSelectedBook(){
    return this.selectedBook$
  }
}
