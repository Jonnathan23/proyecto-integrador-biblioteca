import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, setDoc, doc, getDocs } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { AddUser, LoginUser, UserType } from '../../assets/models/models';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { BehaviorSubject, Observable, Subscription, first, map } from 'rxjs';
import { deleteSuccess, errorDelete, modifyUser, save, errorSave, errorForm } from '../../alerts/alerts';
import { signInWithRedirect,GoogleAuthProvider } from '@firebase/auth';



@Injectable({
  providedIn: 'root'
})
export class DatauserService {
  private static instance: DatauserService

  private usersSubject = new BehaviorSubject<UserType[]>([]);
  users$: Observable<UserType[]> = this.usersSubject.asObservable();

  userActive!: UserType

  constructor(private fireStore: Firestore, private firebaseApp: FirebaseApp, private router: Router) {
    this.loadUsers()

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
    console.log('Entro al añadir')
    try {

      await addDoc(collection(this.fireStore, 'users'), Object.assign({}, user))
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
      this.userActive = user

      //Modifica los componentes segun el tipo de usuario
      this.router.navigate(['/adminbooks'])
      //AdminbooksComponent.getInstance()     

      this.headerModif(true);
      this.addUser(user)      

    } catch (error) {
      this.controlErrors(error)
    }
  }

  //Ingreso del usuario
  async loginUser(user: LoginUser) {
    try {
      const userLoginIn = await signInWithEmailAndPassword(getAuth(this.firebaseApp), user.email, user.password)
      console.log('clic')
      //encontrar al usuario      
      const searchUser = this.users$
      let userFound: UserType | undefined
      searchUser.subscribe((users) => {
        console.log(users)
        userFound = users.find(u => u.idUser == userLoginIn.user.uid)
        userFound ? this.userActive = userFound : console.log()
      })

      this.headerModif(true);
      this.router.navigate(['/adminbooks'])

    } catch (error) {
      this.controlErrors(error)
    }
  }

  //Cerrar Sesion
  async back() {
    try {
      await signOut(getAuth(this.firebaseApp))
      this.headerModif(false);
      this.router.navigate(['/bienvenido'])

      this.userActive = { idUser: '', idDoc: '', name: '', lastname: '', cell: '', email: '', password: '', image: '', admin: false }
    } catch (e) {
      console.log(`Error al cerrar sesion\n${e}`)
    }
  }

  //Actualizar el usuario
  async upDateUser(user: UserType) {
    try {
      //await setDoc(doc(this.fireStore,'users',user.id))
      await setDoc(doc(this.fireStore, 'users', user.idDoc), Object.assign({}, user))
      modifyUser()
    } catch (error) {

    }
  }

  controlErrors(error :unknown){
    if (error instanceof Error && 'code' in error) {
      errorForm((error as { code: string }).code);
    } else {      
      errorForm("unknown_error");
    }
  }

  //Cambia al header de logeado
  headerModif(opc: boolean) {
    const dadHeader = HeaderComponent.getInstance();
    dadHeader.setIngreso(opc);
  }

  //Get & Set
  public static getInstance() {
    return this.instance
  }

  getUsers(){
    return this.users$
  }


  getUserActive() {
    return this.userActive
  }


  //Autentificación Google
  async googleAuth() {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(getAuth(this.firebaseApp), provider)
      const user = result.user
      console.log(user)
    } catch (error) {
      console.log(`Error al autentificar con Google\n${error}`)
    }
  }

 async googleLogin(){
  try {
    const provider = new GoogleAuthProvider()
    await signInWithRedirect(getAuth(this.firebaseApp), provider)
    this.router.navigateByUrl('/')
  } catch (e) {
    
  }
 }
  

}