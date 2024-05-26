import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDocs, onSnapshot, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { BookType } from '../../assets/models/models';
import { save } from '../../alerts/alerts';


@Injectable({
  providedIn: 'root'
})
export class DatabookService {
  private static instance: DatabookService;
  
  private booksSubject = new BehaviorSubject<BookType[]>([]);
  books$: Observable<BookType[]> = this.booksSubject.asObservable();

  constructor(private fireStore: Firestore) {
    this.loadBooks()

    // Se asegura de que solo se instancie un solo objeto
    if(DatabookService.instance) return DatabookService.instance;
    DatabookService.instance = this;
  }

  private loadBooks() {
    const booksCollection = collection(this.fireStore, 'books');
    
    onSnapshot(booksCollection, (snapshot) => {
      // Callback que se ejecuta cada vez que hay un cambio en la colección
      const books: BookType[] = snapshot.docs.map(doc => {
        const data = doc.data() as BookType;// Obtener los datos del documento y definir el tipo de dato
        return { ...data, id: doc.id }; // Agregar el id del documento a los datos
      });
      //Actualizar el BehaviorSubject con la lista de libros
      this.booksSubject.next(books);
    });
  }

  addBook(book: BookType) {
    console.log('Libro añadido')
    addDoc(collection(this.fireStore, 'books'), Object.assign({}, book))
    save()
  }

  updateBook(book: BookType){
    updateDoc(doc(this.fireStore,'books'),Object.assign({},book))
  }

  getBooks(): Observable<BookType[]> {
    return this.books$;
  }
}
