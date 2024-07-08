import { Component } from '@angular/core';
import { AdminBook, BookType, UserType } from '../../../assets/models/models';
import { DatabookService } from '../../services/forbook/databook.service';
import { BooksComponent } from "./books/books.component";
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from '../../header/header.component';
import { DatauserService } from '../../services/foruser/datauser.service';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../services/foruser/loginservice.service';

@Component({
  selector: 'app-adminbooks',
  standalone: true,
  templateUrl: './adminbooks.component.html',
  styleUrl: './adminbooks.component.scss',
  imports: [BooksComponent, AdminComponent, HeaderComponent]
})
export class AdminbooksComponent {  
  user!: UserType

  constructor(private loginService: LoginserviceService) { }
  ngOnInit() {
     this.loginService.getUserActive().subscribe((user) => {
       const userLocal = this.loginService.getUserStorage()!;
 
       this.user = userLocal.idUser ? userLocal : user;
       if (this.user.admin) console.log("Validado")
     })
   }    
}