import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, setDoc } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { AddUser, LoginUser, UserType } from '../../assets/models/models';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BehaviorSubject, Observable, first, map } from 'rxjs';
import { deleteSuccess, errorDelete, modifyUser, save, errorSave  } from '../../alerts/alerts';
import { AdminbooksComponent } from '../pages/adminbooks/adminbooks.component';


@Injectable({
  providedIn: 'root'
})
export class DatauserService {
  private static instance: DatauserService  

  private usersSubject = new BehaviorSubject<UserType[]>([]);
  users$: Observable<UserType[]> = this.usersSubject.asObservable();

  userActive!:UserType

  constructor(private fireStore: Firestore, private firebaseApp: FirebaseApp, private router: Router) {
    if (DatauserService.instance) return DatauserService.instance
    DatauserService.instance = this

  }

  private loadUsers() {
    const usersCollection = collection(this.fireStore, 'users');
    onSnapshot(usersCollection, (snapshot) => {
      const users: UserType[] = snapshot.docs.map(doc => {
        const data = doc.data() as UserType;
        data.idDoc = doc.id
        return { ...data };
      });
      this.usersSubject.next(users);
    });
  }

  async addUser(user: UserType) {
    console .log('Entro al añadir');
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

      const userRegister = await createUserWithEmailAndPassword(getAuth(this.firebaseApp), user.email, user.password)
      //Agrega un usuario a la base de datos
      user.idUser = userRegister.user.uid

      //Modifica los componentes segun el tipo de usuario
      const adminbooksComponent = AdminbooksComponent.getInstance()
      adminbooksComponent.setAdmin(user.admin)

      this.headerModif(true);
      this.addUser(user)

      this.userActive = user
      this.router.navigate(['/adminbooks'])
      
    } catch (error) {
      
      console.log(`Error al registarse: \n${error}`)    }    
  }

 //Ingreso del usuario
  async loginUser(user: LoginUser) {
    try {
      const userLoginIn = await signInWithEmailAndPassword(getAuth(this.firebaseApp), user.email, user.password)
      
      //encontrar al usuario      
      const searchUser = this.users$
      searchUser.subscribe((users) => {
        users.find(function(u){
          if(u.idDoc == userLoginIn.user.uid){
            console.log('Usuario Encontrado')
          }
        })
      })
      this.headerModif(true);
      //this.router.navigate(['/adminbooks'])
    } catch (error) {
      console.log(`Error al iniciar sesion\n${error}`)
    }
  }

  //Cierra Sesión
  async back(){
    try{
      await signOut(getAuth(this.firebaseApp))      
      this.headerModif(false);
      this.router.navigate(['/bienvenido'])

      this.userActive = {idUser:'' ,idDoc:'' ,name:'', lastname:'', cell:'', email:'', password:'',image:'' ,admin:false}
    
      }catch(e){
      console.log(`Error al cerrar sesion\n${e}`)
    }
  }

 //Actualizar el usuario
 async upDateUser(user: UserType) {
  try {
    //await setDoc(doc(this.fireStore,'users',user.id))
    await setDoc(doc(this.fireStore, 'users', user.idDoc), Object.assign({}, user))

  } catch (error) {

  }
}
 //Cambia al header de logeado
  headerModif(opc: boolean){
    const dadHeader = HeaderComponent.getInstance();
      dadHeader.setIngreso(opc);
  }

  //Get & Set
  public static getInstance(){
    return this.instance
  }

  getUserActive(){
    return this.userActive
  }
}
