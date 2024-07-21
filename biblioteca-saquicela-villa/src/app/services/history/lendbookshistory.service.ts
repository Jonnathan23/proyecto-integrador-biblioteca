import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LendBookHistory } from '../../../assets/models/models';
import { Firestore, onSnapshot, addDoc, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { addLendBookSuccess, deleteSuccess, errorDelete, errorSave } from '../../../alerts/alerts';

@Injectable({
  providedIn: 'root'
})
export class LendbookshistoryService {
  private lendsBooksSubject = new BehaviorSubject<LendBookHistory[]>([]);
  lendsBooks$: Observable<LendBookHistory[]> = this.lendsBooksSubject.asObservable()

  constructor(private fireStore: Firestore) {
    this.loadLendsBooks()
  }

  private loadLendsBooks() {
    const lendsBooksCollection = collection(this.fireStore, 'lendsBooks')

    onSnapshot(lendsBooksCollection, (snapshot) => {
      const lends: LendBookHistory[] = snapshot.docs.map(doc => {
        const data = doc.data() as LendBookHistory;
        return { ...data }
      })
      this.lendsBooksSubject.next(lends)
    });
  }

  async addLendBook(lendBook:LendBookHistory){
    try {
      await addDoc(collection(this.fireStore, 'books'), Object.assign({}, lendBook))
      addLendBookSuccess()
    } catch (error) {
      errorSave()
    }
  }

  async deleteLendBook(lendBook:LendBookHistory) {    
    try {
      await deleteDoc(doc(this.fireStore, 'books', lendBook.id))
      deleteSuccess()

    } catch (error) {
      errorDelete()
    }
  }



}
