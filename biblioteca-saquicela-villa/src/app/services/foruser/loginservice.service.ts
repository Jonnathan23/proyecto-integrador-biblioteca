import { Injectable } from '@angular/core';
import { LoginUser, UserType } from '../../../assets/models/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire/app';
import { Router } from '@angular/router';
import { DatauserService } from './datauser.service';
import { LocalstorageService } from '../../../storage/localstorage.service';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { SelecteduserService } from './selecteduser.service';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private imgDefault = 'assets/img/imageUser.jpg'
  private userRestart = { idUser: '', idDoc: '', name: '', lastname: '', cell: '', email: '', password: '', image: this.imgDefault, admin: false };

  private userActive = new BehaviorSubject<UserType>(this.userRestart);
  userActive$: Observable<UserType> = this.userActive.asObservable();

  keyUser = 'userActive';
  private auth = getAuth(this.firebaseApp);
  constructor(private firebaseApp: FirebaseApp, private router: Router, private userService: DatauserService, private localStorageService: LocalstorageService, private selectedUser: SelecteduserService) {
    const user = this.getUserStorage()
    if (!user) {
      this.localStorageService.setItem(this.keyUser, this.userRestart);

    } else if (user.idUser) {
      this.router.navigate(['/adminbooks']);

    }
  }

  async registerUser(user: UserType) {
    try {

      const userRegister = await createUserWithEmailAndPassword(this.auth, user.email, user.password);
      //Agrega un usuario a la base de datos     
      user.idUser = userRegister.user.uid //llena el campo Id
      await this.userService.addUser(user);
      this.localStorageService.setItem(this.keyUser, user);
      this.userActive.next(user);
      this.selectedUser.setSelectedUser(user)

      this.router.navigate(['/adminbooks'])

    } catch (error) {
      console.log(`Error al registarse: \n${error}`)
    }
  }

  //Ingreso del usuario
  async loginUser(user: LoginUser) {
    try {
      const userLoginIn = await signInWithEmailAndPassword(this.auth, user.email, user.password);

      const userFound = await this.userService.searchUser(userLoginIn);
      this.userActive.next(userFound!);
      this.localStorageService.setItem(this.keyUser, userFound);
      this.selectedUser.setSelectedUser(userFound!)


      this.router.navigate(['/adminbooks']);

    } catch (error) {
      console.log(`Error al iniciar sesion\n${error}`)
    }
  }


  //Cerrar Sesion
  async back() {
    try {
      await signOut(this.auth);
      this.localStorageService.clear();
      this.localStorageService.setItem(this.keyUser, this.userRestart);
      this.userActive.next(this.userRestart);
      //this.selectedUser.setSelectedUser(this.userRestart)
      this.router.navigate(['/bienvenido']);

    } catch (e) {
      console.log(`Error al cerrar sesion\n${e}`)
    }
  }

  getUserActive() {
    return this.userActive$;
  }

  /**
   * @description obtiene el usuario del localStorage o el userRestart
   * @returns UserType
   */
  getUserStorage(): UserType {
    const user: UserType | null = this.localStorageService.getItem<UserType>(this.keyUser);
    if (user) {
      return user;
    } else {
      this.localStorageService.setItem(this.keyUser, this.userRestart);
      return this.userRestart;
    }
  }

  getUserRestart() {
    return this.userRestart;
  }


}
