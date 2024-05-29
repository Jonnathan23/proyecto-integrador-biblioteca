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
  // Determina si se agrega o se modifica
  addUser = true

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
    setTimeout(() => this.loadDataUser(), 0)

    if (UserComponent.instance) return UserComponent.instance
    return UserComponent.instance = this

  }

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

  isAdmin(check: Event) {
    const isChecked = (check.target as HTMLInputElement).checked;
    this.myUser.admin = isChecked
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

  saveChanges() {
    const isVerify = this.checkInputs()
    if (isVerify) {
      this.getAllInputs()
      this.userService.upDateUser(this.myUser)

      return
    }

    errorInputs()
  }

  fillDataUser(user: UserType) {
    this.myUser = user
    this.loadDataUser()
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

  setAddUser(option: boolean) {
    this.addUser = option
  }
}