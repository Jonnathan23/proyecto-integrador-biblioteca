import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminBook, BookHistory } from '../../../assets/models/models';
import { Firestore, onSnapshot, addDoc, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { addLendBookSuccess, deleteSuccess, errorDelete, errorSave } from '../../../alerts/alerts';
import { DatabookService } from '../forbook/databook.service';

@Injectable({
  providedIn: 'root'
})
export class ReturnbookshistoryService {
  private returnBooksRestar: BookHistory = { id: '', name: '', category: '', idBook: '', idUser: '', nameUser: '', date: '' }
  private returnBooksSubject = new BehaviorSubject<BookHistory[]>([]);
  returnsBooks$: Observable<BookHistory[]> = this.returnBooksSubject.asObservable()

  constructor(private fireStore: Firestore, private bookService:DatabookService) {
    this.loadReturnsBooks()
  }

  private loadReturnsBooks() {
    const returnsBooksCollection = collection(this.fireStore, 'lendsBooks')

    onSnapshot(returnsBooksCollection, (snapshot) => {
      const lends: BookHistory[] = snapshot.docs.map(doc => {
        const data = doc.data() as BookHistory;
        return { ...data }
      })
      this.returnBooksSubject.next(lends)
    });
  }

  async addReturndBook(lendBook: BookHistory, book: AdminBook) {
    try {
      await this.bookService.updateBook(book)
      await addDoc(collection(this.fireStore, 'books'), Object.assign({}, lendBook))
      addLendBookSuccess()
    } catch (error) {
      errorSave()
    }
  }

  async deleteReturnBook(lendBook: BookHistory) {
    try {
      await deleteDoc(doc(this.fireStore, 'books', lendBook.id))
      deleteSuccess()

    } catch (error) {
      errorDelete()
    }
  }

  getReturnBooks(){
    return this.returnsBooks$
  }

  getReturnBookRestart(){
    return this.returnBooksRestar;
  }

}
