import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire/app';
import { LoginUser, UserType } from '../../assets/models/models';

@Injectable({
  providedIn: 'root'
})
export class DatauserService {
  private static instance: DatauserService  


  constructor(private fireStore: Firestore, private firebaseApp: FirebaseApp) {


    if (DatauserService.instance) return DatauserService.instance
    DatauserService.instance = this

  }

  async registerUser(user: UserType) {
    await createUserWithEmailAndPassword(getAuth(this.firebaseApp), user.email, user.password)

  }

  async loginUser(user: LoginUser) {
    await signInWithEmailAndPassword(getAuth(this.firebaseApp), user.email, user.password)
  }


}
