import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminBook, BookType } from '../../assets/models/models';
import { deleteSuccess, errorDelete, errorModify, errorSave, modifySuccess, save } from '../../alerts/alerts';


@Injectable({
  providedIn: 'root'
})
export class DatabookService {
  private static instance: DatabookService;
  
  private booksSubject = new BehaviorSubject<AdminBook[]>([]);
  books$: Observable<AdminBook[]> = this.booksSubject.asObservable();

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
      const books: AdminBook[] = snapshot.docs.map(doc => {
        const data = doc.data() as AdminBook;// Obtener los datos del documento y definir el tipo de dato
        data.id = doc.id
        return { ...data}; // Agregar el id del documento a los datos
      });
      //Actualizar el BehaviorSubject con la lista de libros
      this.booksSubject.next(books);
    });
  }

  async addBook(book: BookType) {    
    try{
      await addDoc(collection(this.fireStore, 'books'), Object.assign({}, book))
      save()
    }catch(e){
      errorSave()      
    }    
  }

  async updateBook(book: AdminBook){
    try {      
      //updateDoc(doc(this.fireStore,'books'),Object.assign({},book))
      const update = book as BookType
      await setDoc(doc(this.fireStore,'books',book.id),Object.assign({},update))
      modifySuccess()
    } catch (error) {
      errorModify()      
    }
  }

  async deleteBook(bookDelete: AdminBook){
   // deleteDoc(doc(this.fireStore,'books'),Object.assign({},bookDelete)) 
   try {    
     await deleteDoc(doc(this.fireStore,'books',bookDelete.id))
     deleteSuccess()  

   } catch (error) {
    errorDelete()
   }
  }



  //Get & Set
  getBooks(): Observable<AdminBook[]> {
    return this.books$;
  }

  static getInstance(){
    return DatabookService.instance
  }
}
