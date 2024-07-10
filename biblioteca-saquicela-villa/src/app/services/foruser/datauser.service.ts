import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot, setDoc, doc } from '@angular/fire/firestore';
import { UserCredential } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { UserType } from '../../../assets/models/models';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { modifyUser, errorSave } from '../../../alerts/alerts';




@Injectable({
  providedIn: 'root'
})
export class DatauserService {
  private usersSubject = new BehaviorSubject<UserType[]>([]);
  users$: Observable<UserType[]> = this.usersSubject.asObservable();

  userActive!: UserType

  constructor(private fireStore: Firestore, private firebaseApp: FirebaseApp, private router: Router) {
    this.loadUsers()
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
    try {
      await addDoc(collection(this.fireStore, 'users'), Object.assign({}, user))

    } catch (error) {
      errorSave()
    }
  }



  /**
   * @description Actualiza el usuario
   */
  async upDateUser(user: UserType) {
    try {
      //await setDoc(doc(this.fireStore,'users',user.id))
      await setDoc(doc(this.fireStore, 'users', user.idDoc), Object.assign({}, user))
      modifyUser()
    } catch (error) {

    }
  }
  /**
   * @description busca al usuario en base a sus credenciales en nuestra BD para obtener la infromación completa
   * @param userLogin 
   * @returns UserType
   */
  async searchUser(userLogin: UserCredential): Promise<UserType | undefined> {
    const searchUser = this.users$
    let userFound: UserType | undefined
    searchUser.subscribe((users) => {
      userFound = users.find(u => u.idUser == userLogin.user.uid)
      if (userFound) this.userActive = userFound

    })

    return userFound;
  }


  //Get & Set  

  getUsers() {
    return this.users$
  }

}