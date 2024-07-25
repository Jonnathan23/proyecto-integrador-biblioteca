import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminBook, MyBooksModel, StateBook } from '../../../assets/models/models';
import { statesBook } from '../../../assets/data/data';
import { deleteSuccess, errorDelete } from '../../../alerts/alerts';

@Injectable({
  providedIn: 'root'
})
export class MybooksService {
  private myBooksRestar: MyBooksModel = { id: '', idUser: '', nameUser: '', idBook: '', nameBook: '', stateBook: statesBook[0].description }
  private myBooksSubject = new BehaviorSubject<MyBooksModel[]>([]);
  myBooks$: Observable<MyBooksModel[]> = this.myBooksSubject.asObservable()

  constructor(private fireStore: Firestore) {
    this.loadMyBooks
   }

  private loadMyBooks(){
    const myBooksCollection = collection(this.fireStore, 'myBooks');

    onSnapshot(myBooksCollection, (snapshot) => {
      // Callback que se ejecuta cada vez que hay un cambio en la colección
      const myBooks: MyBooksModel[] = snapshot.docs.map(doc => {
        const data = doc.data() as MyBooksModel;// Obtener los datos del documento y definir el tipo de dato
        data.id = doc.id
        return { ...data }; // Agregar el id del documento a los datos
      });
      //Actualizar el BehaviorSubject con la lista de libros
      console.log('myBooks:')
      console.log(myBooks)
      this.myBooksSubject.next(myBooks);
    });

  }

  async addMyBook( idUser:string, nameUser:string, idBook: string, nameBook: string, stateBook:StateBook['description']) {
    try {
      const myBook = {id:'', idUser, nameUser, idBook, nameBook, stateBook }
      await addDoc(collection(this.fireStore, 'myBooks'), Object.assign({}, myBook))

    } catch (error) {

    }
  }

  async deleteReturnBook(idMyBook: MyBooksModel['id']) {
    try {
      await deleteDoc(doc(this.fireStore, 'myBooks', idMyBook))
      deleteSuccess()

    } catch (error) {
      errorDelete()
    }
  }

  getMyBooks(){
    return this.myBooks$;
  }

  getMyBookRestar(){
    return this.myBooksRestar
  }


}
