import { Component } from '@angular/core';
import { LoginserviceService } from '../../services/foruser/loginservice.service';

@Component({
  selector: 'app-headeruser',
  standalone: true,
  imports: [],
  templateUrl: './headeruser.component.html',
  styleUrl: './headeruser.component.scss'
})
export class HeaderuserComponent {
  
  constructor(private loginService: LoginserviceService ) { }

  back() {
    this.loginService.back();
  }

}
