import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReturnBookHistory } from '../../../assets/models/models';
import { Firestore, onSnapshot, addDoc, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { addLendBookSuccess, deleteSuccess, errorDelete, errorSave } from '../../../alerts/alerts';

@Injectable({
  providedIn: 'root'
})
export class ReturnbookshistoryService {

  private returnBooksSubject = new BehaviorSubject<ReturnBookHistory[]>([]);
  returnsBooks$: Observable<ReturnBookHistory[]> = this.returnBooksSubject.asObservable()

  constructor(private fireStore: Firestore) {
    this.loadReturnsBooks()
  }

  private loadReturnsBooks() {
    const returnsBooksCollection = collection(this.fireStore, 'lendsBooks')

    onSnapshot(returnsBooksCollection, (snapshot) => {
      const lends: ReturnBookHistory[] = snapshot.docs.map(doc => {
        const data = doc.data() as ReturnBookHistory;
        return { ...data }
      })
      this.returnBooksSubject.next(lends)
    });
  }

  async addReturndBook(lendBook:ReturnBookHistory){
    try {
      await addDoc(collection(this.fireStore, 'books'), Object.assign({}, lendBook))
      addLendBookSuccess()
    } catch (error) {
      errorSave()
    }
  }

  async deleteReturnBook(lendBook:ReturnBookHistory) {    
    try {
      await deleteDoc(doc(this.fireStore, 'books', lendBook.id))
      deleteSuccess()

    } catch (error) {
      errorDelete()
    }
  }

}
