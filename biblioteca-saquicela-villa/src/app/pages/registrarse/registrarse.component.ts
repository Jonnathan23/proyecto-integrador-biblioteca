import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserType } from '../../../assets/models/models';
import { errorInputs, shortPassword } from '../../../alerts/alerts';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginserviceService } from '../../services/foruser/loginservice.service';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent {
  newUser: UserType;
  constructor(private loginService: LoginserviceService) {
    this.newUser = this.loginService.getUserRestart();
  }

  /**
   * @description Valida que los campos de texto estén llenos
   * @returns boolean
   */
  checkForm(form: NgForm): Boolean {
    const { name, lastname, cell, email, password } = form.value;

    if (!name) return false;
    if (!lastname) return false;
    if (!cell) return false;
    if (!email) return false;
    if (!password) return false;

    if(password.length <= 6){
      shortPassword()
      return false;
    }
    return true
  }


  registerNewUser(form: NgForm) {
    const isVerify = this.checkForm(form);

    if (isVerify) {
      const { name, lastname, cell, email, password,checkIsAdmin } = form.value;
      this.newUser.name = name;
      this.newUser.lastname = lastname;
      this.newUser.email = email;
      this.newUser.cell = cell;
      this.newUser.password = password;
      this.newUser.admin = checkIsAdmin;
            
      this.loginService.registerUser(this.newUser);
      return;
    }
    errorInputs();

  }

}
