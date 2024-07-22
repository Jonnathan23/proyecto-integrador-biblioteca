import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminBook, BookType } from '../../../assets/models/models';
import { deleteSuccess, errorDelete, errorModifyBook, errorSave, modifyBook, saveBook } from '../../../alerts/alerts';
import { statesBook } from '../../../assets/data/data';

@Injectable({
  providedIn: 'root'
})

export class DatabookService {  

  private booksSubject = new BehaviorSubject<AdminBook[]>([]);
  books$: Observable<AdminBook[]> = this.booksSubject.asObservable();

  constructor(private fireStore: Firestore) {
    this.loadBooks()    
  }

  private loadBooks() {
    const booksCollection = collection(this.fireStore, 'books');

    onSnapshot(booksCollection, (snapshot) => {
      // Callback que se ejecuta cada vez que hay un cambio en la colección
      const books: AdminBook[] = snapshot.docs.map(doc => {
        const data = doc.data() as AdminBook;// Obtener los datos del documento y definir el tipo de dato
        data.id = doc.id
        return { ...data }; // Agregar el id del documento a los datos
      });
      //Actualizar el BehaviorSubject con la lista de libros
      this.booksSubject.next(books);
    });
  }

  async addBook(book: BookType) {
    try {
      await addDoc(collection(this.fireStore, 'books'), Object.assign({}, book))
      saveBook()
    } catch (e) {
      errorSave()
    }
  }

  async updateBook(book: AdminBook) {
    try {      
      const update = book as BookType
      await setDoc(doc(this.fireStore, 'books', book.id), Object.assign({}, update))
      modifyBook()
    } catch (error) {
      errorModifyBook()
    }
  }

  async deleteBook(bookDelete: AdminBook) {    
    try {
      await deleteDoc(doc(this.fireStore, 'books', bookDelete.id))
      deleteSuccess()

    } catch (error) {
      errorDelete()
    }
  }

  //Get & Set
  getBooks(): Observable<AdminBook[]> {
    return this.books$;
  }

  async updateBooksBD(){
    console.log('updating...')
    this.books$.subscribe((books) => {
      books.forEach((book) => {
        book.state = statesBook[0].description
        this.updateBook(book)
      })
    })
  }
}
