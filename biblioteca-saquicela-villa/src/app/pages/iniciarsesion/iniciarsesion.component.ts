import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginUser,} from '../../../assets/models/models';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginserviceService } from '../../services/foruser/loginservice.service';


@Component({
  selector: 'app-iniciarsesion',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './iniciarsesion.component.html',
  styleUrl: './iniciarsesion.component.scss'
})
export class IniciarsesionComponent {
  loginUser: LoginUser = { email: '', password: '' }

  constructor(private loginService: LoginserviceService) { }


  login(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;
    this.loginService.loginUser({ email, password });

  }

}