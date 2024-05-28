import { Component } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { shortPassword } from '../../../alerts/alerts';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  newUser:UserType = {name:'', lastname:'', cell:'', email:'', password:'', admin:false}


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
  
}
