import { Component } from '@angular/core';
import { HeaderbienvComponent } from './headerbienv/headerbienv.component';
import { HeadersessionComponent } from './headersessionadmin/headersession.component';
import { Router } from '@angular/router'; // Add this line
import { LoginserviceService } from '../services/foruser/loginservice.service';
import { UserType } from '../../assets/models/models';
import { HeaderuserComponent } from "./headeruser/headeruser.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderbienvComponent, HeadersessionComponent, HeaderuserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  ingreso: boolean = false;
  isAdmin! :boolean 

  constructor(private loginService: LoginserviceService) { }

  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
     
      if (userLocal.idUser) {
        this.ingreso = true;
        this.isAdmin = userLocal.admin        
      } else {
        this.ingreso = user.idUser ? true : false;
        this.isAdmin = user.admin
      }

    })
  }

 
}
