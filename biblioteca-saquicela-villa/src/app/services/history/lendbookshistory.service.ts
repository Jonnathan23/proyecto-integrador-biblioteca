import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminBook, BookHistory } from '../../../assets/models/models';
import { Firestore, onSnapshot, addDoc, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { addLendBookSuccess, deleteSuccess, errorDelete, errorSave } from '../../../alerts/alerts';
import { DatabookService } from '../forbook/databook.service';
import { MybooksService } from './mybooks.service';

@Injectable({
  providedIn: 'root'
})
export class LendbookshistoryService {
  private lendBookRestar: BookHistory = { id: '', name: '', category: '', idBook: '', idUser: '', nameUser: '', date: '' }
  private lendsBooksSubject = new BehaviorSubject<BookHistory[]>([]);
  lendsBooks$: Observable<BookHistory[]> = this.lendsBooksSubject.asObservable()

  constructor(private fireStore: Firestore, private bookService: DatabookService, private myBookService: MybooksService) {
    this.loadLendsBooks()
  }

  private loadLendsBooks() {
    const lendsBooksCollection = collection(this.fireStore, 'lendsBooks')

    onSnapshot(lendsBooksCollection, (snapshot) => {
      const lends: BookHistory[] = snapshot.docs.map(doc => {
        const data = doc.data() as BookHistory;
        return { ...data }
      })
      this.lendsBooksSubject.next(lends)
    });
  }

  async addLendBook(lendBook: BookHistory, book: AdminBook) {
    try {
      await this.bookService.updateBook(book)
      await this.myBookService.addMyBook(lendBook.idUser, lendBook.nameUser, book.id, book.name, book.state)
      await addDoc(collection(this.fireStore, 'lendsBooks'), Object.assign({}, lendBook))
      addLendBookSuccess()
    } catch (error) {
      errorSave()
    }
  }

  async deleteLendBook(lendBook: BookHistory) {
    try {
      await deleteDoc(doc(this.fireStore, 'lendsBooks', lendBook.id))
      deleteSuccess()

    } catch (error) {
      errorDelete()
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  getLendsBooks() {
    return this.lendsBooks$;
  }
  getLendBookRestar() {
    return this.lendBookRestar
  }



}
