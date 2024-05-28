import { Component } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { shortPassword } from '../../../alerts/alerts';
import { UseradminComponent } from "../useradmin/useradmin.component";

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [UseradminComponent]
})
export class UserComponent {
  myUser:UserType = {id:'',name:'', lastname:'', cell:'', email:'', password:'', admin:true}


  getName(name: string) {
    this.myUser.name = name
  }

  getLastname(lastname: string) {
    this.myUser.lastname = lastname
  }

  getCell(cell:string){
    this.myUser.cell = cell
  }

  getEmail(email: string) {
    this.myUser.email = email
  }

  getPassword(password: string){
    this.myUser.password = password
  }

  isAdmin(check: Event) {
    const isChecked = (check.target as HTMLInputElement).checked;
    this.myUser.admin = isChecked
    
  }

  isShortPassword(){
    this.myUser.password.length <= 6 && shortPassword()
  }
  
}
