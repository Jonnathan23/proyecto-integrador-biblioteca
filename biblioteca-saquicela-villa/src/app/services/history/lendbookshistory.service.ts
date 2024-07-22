import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminBook, LendBookHistory } from '../../../assets/models/models';
import { Firestore, onSnapshot, addDoc, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { addLendBookSuccess, deleteSuccess, errorDelete, errorSave } from '../../../alerts/alerts';
import { DatabookService } from '../forbook/databook.service';

@Injectable({
  providedIn: 'root'
})
export class LendbookshistoryService {
  private lendBookRestar:LendBookHistory = {id:'',name:'',category:'', idBook:'', idUser:'',nameUser:'', date: ''}
  private lendsBooksSubject = new BehaviorSubject<LendBookHistory[]>([]);
  lendsBooks$: Observable<LendBookHistory[]> = this.lendsBooksSubject.asObservable()

  constructor(private fireStore: Firestore, private bookService:DatabookService) {
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

  async addLendBook(lendBook:LendBookHistory, book:AdminBook){
    try {      
      await this.bookService.updateBook(book)
      await addDoc(collection(this.fireStore, 'lendsBooks'), Object.assign({}, lendBook))      
      addLendBookSuccess()
    } catch (error) {
      errorSave()
    }
  }

  async deleteLendBook(lendBook:LendBookHistory) {    
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

  getLendsBooks(){
    return this.lendsBooks$;
  }
  getLendBookRestar(){
    return this.lendBookRestar
  }



}
