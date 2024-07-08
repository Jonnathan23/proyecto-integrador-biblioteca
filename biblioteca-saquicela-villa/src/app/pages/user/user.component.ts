import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { errorInputs, shortPassword } from '../../../alerts/alerts';
import { UseradminComponent } from "../useradmin/useradmin.component";
import { DatauserService } from '../../services/foruser/datauser.service';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../services/foruser/loginservice.service';
import { SelecteduserService } from '../../services/foruser/selecteduser.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [UseradminComponent, FormsModule]
})




export class UserComponent {

  imgDefault = 'assets/img/imageUser.jpg'
  myUser!: UserType  //Usuario dueño de la sesión
  userModify!: UserType  //

  nombre = ''
  apellido = ''
  cell = ''
  correo = ''
  myPassword = ''

  @ViewChild('checkIsAdmin') checkAdmin!: ElementRef;
  @ViewChild('userImg') imgUser!: ElementRef;

  constructor(private render:Renderer2,private loginService: LoginserviceService, private selectedUser: SelecteduserService) {
    //this.loadDataUser()
  }
  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
      this.myUser = userLocal.idUser ? userLocal : user;
    })

    //this.selectedUser.getSelectedUser().subscribe((user) => this.userModify = user)
    this.selectedUser.getSelectedUser().subscribe((user) => {
      //this.userModify = user.idUser ? user : this.loginService.getUserStorage()
      
      if (user.idUser) {
        this.userModify = user
      } else {
        this.userModify = this.loginService.getUserStorage()!
      }

      this.nombre = this.userModify.name
      this.apellido = this.userModify.lastname
      this.cell = this.userModify.cell
      this.correo = this.userModify.email
      this.myPassword = this.userModify.password
      this.render.setProperty(this.checkAdmin.nativeElement, 'checked', this.userModify.admin)
      this.render.setProperty(this.imgUser.nativeElement,'src', this.userModify.image)

    })
  }


  /*
    private loadDataUser() {
      try {
        this.txtName.nativeElement.value = this.myUser.name
        this.txtLastname.nativeElement.value = this.myUser.lastname
        this.txtCell.nativeElement.value = this.myUser.cell
        this.txtEmail.nativeElement.value = this.myUser.email
        this.txtPassword.nativeElement.value = this.myUser.password
        this.checkIsAdmin.nativeElement.checked = this.myUser.admin
        this.imgUser.nativeElement.src = this.myUser.image
  
        this.imgDefault = this.myUser.image
  
      } catch (error) {
        console.log('Sin usuario')
      }
  
  
    }
  */

  isAdmin(check: Event) {
    const isChecked = (check.target as HTMLInputElement).checked;
    this.myUser.admin = isChecked
  }


  //Funciones
  selectImg(e: Event, img: HTMLImageElement) {
    const input = e.target as HTMLInputElement

    //Verifica si se ha seleccionado la imagen
    if (input.files?.[0]) {
      const reader = new FileReader()
      reader.onload = () => img.src = reader.result as string
      reader.readAsDataURL(input.files[0])

    } else {
      img.src = this.imgDefault

    }
  }

  /*
    getAllInputs() {
      this.myUser.name = this.txtName.nativeElement.value
      this.myUser.lastname = this.txtLastname.nativeElement.value
      this.myUser.cell = this.txtCell.nativeElement.value
      this.myUser.email = this.txtEmail.nativeElement.value
      this.myUser.password = this.txtPassword.nativeElement.value
      this.myUser.image = this.imgUser.nativeElement.src
      this.myUser.admin = this.checkIsAdmin.nativeElement.checked
    }
  
    checkInputs(): boolean {
      if (!this.txtName.nativeElement.value) return false
      if (!this.txtLastname.nativeElement.value) return false
      if (!this.txtCell.nativeElement.value) return false
      if (!this.txtEmail.nativeElement.value) return false
      if (!this.txtPassword.nativeElement.value) return false
  
  
      return true
    }
  
  */
  saveChanges() {

  }
}