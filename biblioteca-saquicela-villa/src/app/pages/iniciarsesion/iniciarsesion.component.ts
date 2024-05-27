import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginUser, UserType } from '../../../assets/models/models';
import { DatauserService } from '../../services/datauser.service';


@Component({
  selector: 'app-iniciarsesion',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './iniciarsesion.component.html',
  styleUrl: './iniciarsesion.component.scss'
})
export class IniciarsesionComponent {
  loginUser:LoginUser = {email:'', password:''}

  constructor(private userService: DatauserService){}

  
  getEmail(email: string) {
    this.loginUser.email = email
  }

  getPassword(password: string){
    this.loginUser.password = password
    
  }

  
  login() {
    this.userService.loginUser(this.loginUser)
  }

}
