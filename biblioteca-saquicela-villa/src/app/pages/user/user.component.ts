import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { errorInputs, shortPassword } from '../../../alerts/alerts';
import { UseradminComponent } from "../useradmin/useradmin.component";
import { DatauserService } from '../../services/foruser/datauser.service';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [UseradminComponent]
})




export class UserComponent {

  private static instance: UserComponent
  imgDefault = 'assets/img/imageUser.jpg'
  myUser!: UserType

  @ViewChild('name') txtName!: ElementRef;
  @ViewChild('lastname') txtLastname!: ElementRef;
  @ViewChild('cell') txtCell!: ElementRef;
  @ViewChild('email') txtEmail!: ElementRef;
  @ViewChild('password') txtPassword!: ElementRef;
  @ViewChild('checkIsAdmin') checkIsAdmin!: ElementRef;
  @ViewChild('userImg') imgUser!: ElementRef;

  user: UserType = {
    idUser: '',
    idDoc: '',
    name: '',
    lastname: '',
    cell: '',
    email: '',
    password: '',
    image: '',
    admin: false
  }

  constructor(private userService: DatauserService, private render: Renderer2) {
    if (this.protection()) return

    this.myUser = this.userService.getStorage()
    console.log(this.myUser)

    setTimeout(() => this.loadDataUser(this.myUser), 0)

    if (UserComponent.instance) return UserComponent.instance
    return UserComponent.instance = this

  }

  private loadDataUser(userDate: UserType) {
    this.render.setAttribute(this.txtName.nativeElement, 'value', userDate.name)
    this.render.setAttribute(this.txtLastname.nativeElement, 'value', userDate.lastname)
    this.render.setAttribute(this.txtCell.nativeElement, 'value', userDate.cell)
    this.render.setAttribute(this.txtEmail.nativeElement, 'value', userDate.email)
    this.render.setAttribute(this.txtPassword.nativeElement, 'value', userDate.password)
    this.render.setProperty(this.checkIsAdmin.nativeElement, 'checked', userDate.admin)
    this.render.setAttribute(this.imgUser.nativeElement, 'src', userDate.image)

    this.imgDefault = userDate.image
  }



  isAdmin(check: Event) {
    const isChecked = (check.target as HTMLInputElement).checked;
    this.user.admin = isChecked
  }
  isShortPassword() {
    this.txtPassword.nativeElement.value.length < 8 && shortPassword();

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

  //Validacion de datos  
  checkInputs(): boolean {
    if (!this.txtName.nativeElement.value) return false
    if (!this.txtLastname.nativeElement.value) return false
    if (!this.txtCell.nativeElement.value) return false
    if (!this.txtEmail.nativeElement.value) return false
    if (!this.txtPassword.nativeElement.value) return false


    return true
  }
  //Obtiene los datos del formulario para modificar
  getAllInputs() {
    this.user.name = this.txtName.nativeElement.value
    this.user.lastname = this.txtLastname.nativeElement.value
    this.user.cell = this.txtCell.nativeElement.value
    this.user.email = this.txtEmail.nativeElement.value
    this.user.password = this.txtPassword.nativeElement.value
    this.user.image = this.imgUser.nativeElement.src
    this.user.admin = this.checkIsAdmin.nativeElement.checked
  }


  saveChanges() {
    const isVerify = this.checkInputs()
    if (isVerify) {
      this.getAllInputs()
      this.userService.upDateUser(this.user)

      return
    }

    errorInputs()
  }

  fillDataUser(user: UserType) {
    this.myUser = user
    this.loadDataUser(this.myUser)
  }

  fillModifyUser(user: UserType) {
    this.user = user
    this.loadDataUser(this.user)
  }


  protection() {
    try {
      const userService = DatauserService.getInstance()
      const userLoged = userService.getAuth().currentUser

      console.log(userLoged)

      if (!userLoged) {
        const router = new Router()
        router.navigate(['/bienvenido'])
        return true
      }
      return false

    } catch (error) {
      const router = new Router()
      router.navigate(['/bienvenido'])
      return true
    }
  }

  setIdUser(id: string) {
    this.myUser.idUser = id
  }

  //Obtener la instancia del componente
  public static getIntance() {
    return this.instance
  }

  setUser(user: UserType) {
    this.user = user
  }
}