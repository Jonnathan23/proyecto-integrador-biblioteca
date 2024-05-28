import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { LoginUser, UserType } from '../../assets/models/models';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { deleteSuccess, errorDelete, modifyUser, save, errorSave  } from '../../alerts/alerts';

@Injectable({
  providedIn: 'root'
})
export class DatauserService {
  private static instance: DatauserService  

  private usersSubject = new BehaviorSubject<UserType[]>([]);
  users$: Observable<UserType[]> = this.usersSubject.asObservable();

  constructor(private fireStore: Firestore, private firebaseApp: FirebaseApp, private router: Router) {
    if (DatauserService.instance) return DatauserService.instance
    DatauserService.instance = this

  }

  private loadUsers() {
    const usersCollection = collection(this.fireStore, 'users');
    onSnapshot(usersCollection, (snapshot) => {
      const users: UserType[] = snapshot.docs.map(doc => {
        const data = doc.data() as UserType;
        data.id = doc.id
        return { ...data };
      });
      this.usersSubject.next(users);
    });
  }

  async addUser(user: UserType) {
    try {
      await addDoc(collection(this.fireStore, 'users'), Object.assign({}, user))
       save()
    } catch (error) {
      errorSave()
    }
  }


  //Registra un usuario en la base de datos
  async registerUser(user: UserType) {
    try {      
      await createUserWithEmailAndPassword(getAuth(this.firebaseApp), user.email, user.password)      
      this.router.navigate(['/adminbooks'])
      this.headerModif(true);
    } catch (error) {
      console.log(`Error al registarse: \n${error}`)
    }    
  }
 //Ingreso del usuario
  async loginUser(user: LoginUser) {
    try {
      await signInWithEmailAndPassword(getAuth(this.firebaseApp), user.email, user.password)
      console.log('Ingresa')
      this.headerModif(true);      
      this.router.navigate(['/adminbooks'])      
    } catch (error) {
      console.log(`Error al iniciar sesion\n${error}`)      
    }
  }

  async back(){
    try{
      await signOut(getAuth(this.firebaseApp))
      console.log('Saliendo');
      this.router.navigate(['/bienvenido'])
      this.headerModif(false);
    }catch(e){
      console.log(`Error al cerrar sesion\n${e}`)
    }
  }

  upDateUser(){

  }

  headerModif(opc: boolean){
    const dadHeader = HeaderComponent.getInstance();
      dadHeader.setIngreso(opc);
  }}
