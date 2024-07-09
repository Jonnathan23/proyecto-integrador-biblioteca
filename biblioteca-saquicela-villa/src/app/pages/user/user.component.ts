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

  imgDefault:string 
  myUser!: UserType  //Usuario dueño de la sesión
  userModify!: UserType  //

  nombre = ''
  apellido = ''
  cell = ''
  correo = ''
  myPassword = ''

  @ViewChild('checkIsAdmin') checkAdmin!: ElementRef;
  @ViewChild('userImg') imgUser!: ElementRef;

  constructor(private render: Renderer2, private loginService: LoginserviceService, private selectedUser: SelecteduserService, private userService: DatauserService) {
    //this.loadDataUser()
    this.imgDefault = this.selectedUser.getImgDefault()
  }

  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
      this.myUser = userLocal.idUser ? userLocal : user;
    })
    

    this.selectedUser.getSelectedUser().subscribe((user) => {     

      if (user.idUser) {
        this.userModify = user
      } else {
        this.userModify = this.loginService.getUserStorage()!
      }

      setTimeout(() => {
        this.nombre = this.userModify.name
        this.apellido = this.userModify.lastname
        this.cell = this.userModify.cell
        this.correo = this.userModify.email
        this.myPassword = this.userModify.password
        this.render.setProperty(this.checkAdmin.nativeElement, 'checked', this.userModify.admin ?? false)
        this.render.setProperty(this.imgUser.nativeElement, 'src', this.userModify.image)

      }, 0)

    })
  }


  
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

  getAllInputs() {
    this.userModify.name = this.nombre
    this.userModify.lastname = this.apellido
    this.userModify.cell = this.cell
    this.userModify.email = this.correo
    this.userModify.password = this.myPassword
    this.userModify.image = this.imgUser.nativeElement.src
    this.userModify.admin = this.checkAdmin.nativeElement.checked
  }

  checkInputs(): boolean {
    this.getAllInputs()

    if (!this.nombre) return false
    if (!this.apellido) return false
    if (!this.cell) return false
    if (!this.correo) return false
    if (!this.myPassword) return false


    return true
  }
  saveChanges() {
    const isVerify = this.checkInputs()

    if (isVerify) {
      this.userService.upDateUser(this.userModify)
      return
    }
    errorInputs()   

  }
}