import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Atribuciones } from '../../assets/models/models';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataatribucionesService {
  private static instance: DataatribucionesService;
  
  private atribucionesSubject = new BehaviorSubject<Atribuciones[]>([]);
  atribuciones$: Observable<Atribuciones[]> = this.atribucionesSubject.asObservable();

  constructor(private fireStore: Firestore) {
    this.cargarAtribuciones()

    // Se asegura de que solo se instancie un solo objeto
    if(DataatribucionesService.instance) return DataatribucionesService.instance;
    DataatribucionesService.instance = this;
  }

  private cargarAtribuciones() {
    const atribucionesCollection = collection(this.fireStore, 'atribuciones');
    
    onSnapshot(atribucionesCollection, (snapshot) => {
      // Callback que se ejecuta cada vez que hay un cambio en la colección
      const atrib: Atribuciones[] = snapshot.docs.map(doc => {
        const data = doc.data() as Atribuciones;// Obtener los datos del documento y definir el tipo de dato        
        return { ...data}; // Agregar el id del documento a los datos
      });
      //Actualizar el BehaviorSubject con la lista de libros
      this.atribucionesSubject.next(atrib);
    });
  }

  getAtribuciones(){
    return this.atribuciones$
  }

  
}
