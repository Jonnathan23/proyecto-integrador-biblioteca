import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { errorInputs, shortPassword } from '../../../alerts/alerts';
import { UseradminComponent } from "../useradmin/useradmin.component";
import { DatauserService } from '../../services/datauser.service';
import { user } from '@angular/fire/auth';

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

  constructor(private userService: DatauserService) {
    this.myUser = this.userService.getUserActive()
    setTimeout(() => this.loadDataUser(this.myUser), 0)

    if (UserComponent.instance) return UserComponent.instance
    return UserComponent.instance = this

  }

  private loadDataUser(userDate: UserType) {
    try {
      this.txtName.nativeElement.value = userDate.name
      this.txtLastname.nativeElement.value = userDate.lastname
      this.txtCell.nativeElement.value = userDate.cell
      this.txtEmail.nativeElement.value = userDate.email
      this.txtPassword.nativeElement.value = userDate.password
      this.checkIsAdmin.nativeElement.checked = userDate.admin
      this.imgUser.nativeElement.src = userDate.image

      this.imgDefault = userDate.image

    } catch (error) {
      console.log('Sin usuario')
    }


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

  checkInputs(): boolean {
    if (!this.txtName.nativeElement.value) return false
    if (!this.txtLastname.nativeElement.value) return false
    if (!this.txtCell.nativeElement.value) return false
    if (!this.txtEmail.nativeElement.value) return false
    if (!this.txtPassword.nativeElement.value) return false


    return true
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

  fillModifyUser(user:UserType){
    this.user = user
    this.loadDataUser(this.user)
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