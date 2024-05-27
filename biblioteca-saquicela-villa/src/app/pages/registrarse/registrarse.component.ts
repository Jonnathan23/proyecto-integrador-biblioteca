import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserType } from '../../../assets/models/models';
import { DatauserService } from '../../services/datauser.service';
import { shortPassword } from '../../../alerts/alerts';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent {
  newUser:UserType = {name:'', lastname:'', cell:'', email:'', password:'', admin:false}

  constructor(private userService: DatauserService){}

  getName(name: string) {
    this.newUser.name = name
  }

  getLastname(lastname: string) {
    this.newUser.lastname = lastname
  }

  getCell(cell:string){
    this.newUser.cell = cell
  }

  getEmail(email: string) {
    this.newUser.email = email
  }

  getPassword(password: string){
    this.newUser.password = password
  }

  isAdmin(check: Event) {
    const isChecked = (check.target as HTMLInputElement).checked;
    this.newUser.admin = isChecked
    
  }

  isShortPassword(){
    this.newUser.password.length <= 6 && shortPassword()
  }

  register() {
    this.userService.registerUser(this.newUser)
  }



}
