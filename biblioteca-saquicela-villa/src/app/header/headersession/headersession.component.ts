import { Component } from '@angular/core';
import { DatauserService } from '../../services/foruser/datauser.service';
import { RouterLink, Router } from '@angular/router';
import { HeaderComponent } from '../header.component';
import { LoginserviceService } from '../../services/foruser/loginservice.service';


@Component({
  selector: 'app-headersession',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './headersession.component.html',
  styleUrl: './headersession.component.scss'
})
export class HeadersessionComponent {

  constructor(private loginService: LoginserviceService, private router: Router) { }

  back() {
    this.loginService.back();
  }
}
