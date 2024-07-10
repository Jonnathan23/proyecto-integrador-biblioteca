import { Component } from '@angular/core';
import { HeaderbienvComponent } from './headerbienv/headerbienv.component';
import { HeadersessionComponent } from './headersession/headersession.component';
import { Router } from '@angular/router'; // Add this line
import { LoginserviceService } from '../services/foruser/loginservice.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderbienvComponent, HeadersessionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  ingreso: boolean = false;

  constructor(private loginService: LoginserviceService) { }

  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
     
      if (userLocal.idUser) {
        this.ingreso = true;
      } else {
        this.ingreso = user.idUser ? true : false;
      }

    })
  }

 
}
