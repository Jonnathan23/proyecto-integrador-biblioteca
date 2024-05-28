import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { LoginUser, UserType } from '../../assets/models/models';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Injectable({
  providedIn: 'root'
})
export class DatauserService {
  private static instance: DatauserService  


  constructor(private fireStore: Firestore, private firebaseApp: FirebaseApp, private router: Router) {
    if (DatauserService.instance) return DatauserService.instance
    DatauserService.instance = this

  }

  async registerUser(user: UserType) {
    try {      
      await createUserWithEmailAndPassword(getAuth(this.firebaseApp), user.email, user.password)      
      this.router.navigate(['/adminbooks'])
      this.headerModif(true);
    } catch (error) {
      console.log(`Error al registarse: \n${error}`)
    }    
  }

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
  }
}
