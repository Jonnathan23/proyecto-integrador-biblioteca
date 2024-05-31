import { Component } from '@angular/core';
import { AdminBook, BookType, UserType } from '../../../assets/models/models';
import { DatabookService } from '../../services/databook.service';
import { BooksComponent } from "./books/books.component";
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from '../../header/header.component';
import { DatauserService } from '../../services/datauser.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-adminbooks',
    standalone: true,
    templateUrl: './adminbooks.component.html',
    styleUrl: './adminbooks.component.scss',
    imports: [BooksComponent, AdminComponent, HeaderComponent]
})
export class AdminbooksComponent {
  private static instance : AdminbooksComponent
  user!:UserType 
  
  
  constructor(){
    this.fillUser()
    if(this.protection()) return
    if(AdminbooksComponent.instance) return AdminbooksComponent.instance
    return AdminbooksComponent.instance = this
    
  }

  protection(){
    try {      
      const userService = DatauserService.getInstance()
      const userLoged =  userService.getAuth().currentUser
  
      console.log(userLoged)
      
      if(!userLoged){
        const router = new Router()
        router.navigate(['/bienvenido'])
        return true
      }
      return false

    } catch (error) {
      const router = new Router()
        router.navigate(['/bienvenido'])      
        return true
    }
  }


  ngOnInit(){
    

  }

  private fillUser(){
    try {      
      const userService = DatauserService.getInstance()
      this.user = userService.getUserActive()
    } catch (error) {
      
    }
  }
  

  public static getInstance(){
    if(!this.instance){
      this.instance = new AdminbooksComponent()
    }
    return this.instance
  }

}