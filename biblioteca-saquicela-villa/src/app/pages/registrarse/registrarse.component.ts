import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserType } from '../../../assets/models/models';
import { DatauserService } from '../../services/datauser.service';
import { errorInputs, shortPassword } from '../../../alerts/alerts';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent {
  imgDefault = 'assets/img/imageUser.jpg'
  newUser:UserType = {id:'' ,name:'', lastname:'', cell:'', email:'', password:'', admin:false}
  constructor(private userService: DatauserService, private router: Router){}

   //Obtiene en variables los elementos del DOOM
   @ViewChild('name') txtName!: ElementRef;
   @ViewChild('lastname') txtLastname!: ElementRef;
   @ViewChild('cell') txtCell!: ElementRef;
   @ViewChild('email') txtEmail!: ElementRef;
   @ViewChild('password') txtPassword!: ElementRef;
   @ViewChild('checkIsAdmin') checkIsAdmin!: ElementRef; 
   

   isAdmin(check: Event) {
    const isChecked = (check.target as HTMLInputElement).checked;
    this.newUser.admin = isChecked
    
  }

  isShortPassword(){
    this.txtEmail.nativeElement.value.length <= 6 && shortPassword()
  }

  getAllInputs() {
    this.newUser.name = this.txtName.nativeElement.value
    this.newUser.lastname = this.txtLastname.nativeElement.value
    this.newUser.cell = this.txtCell.nativeElement.value
    this.newUser.email = this.txtEmail.nativeElement.value
    this.newUser.password = this.txtPassword.nativeElement.value    
    this.newUser.admin = this.checkIsAdmin.nativeElement.checked  

  }

  checkInputs(): boolean {
    if (!this.txtName.nativeElement.value) return false
    if (!this.txtLastname.nativeElement.value) return false
    if (!this.txtCell.nativeElement.value) return false
    if (!this.txtEmail.nativeElement.value) return false
    if (!this.txtPassword.nativeElement.value) return false  

    return true
  }




 
  
  register() {    
    const isVerify = this.checkInputs()
    if(isVerify){
      this.getAllInputs()      
      const userService = DatauserService.getInstance()
      userService.registerUser(this.newUser)      
      
      return
    }
    errorInputs()
   }

  goToSingIn(){
   this.router.navigate(['/iniciar'])
  }

  



}
