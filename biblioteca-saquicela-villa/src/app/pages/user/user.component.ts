import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { errorInputs, shortPassword } from '../../../alerts/alerts';
import { UseradminComponent } from "../useradmin/useradmin.component";
import { DatauserService } from '../../services/datauser.service';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss',
    imports: [UseradminComponent]
})
export class UserComponent {
  imgDefault = 'assets/img/imageUser.jpg'
  myUser!: UserType
  
  constructor(private userService: DatauserService){
    this.myUser = this.userService.getUserActive()
  }

  imgSelec = false
  @ViewChild('name') txtName!: ElementRef;
  @ViewChild('lastname') txtLastname!: ElementRef;
  @ViewChild('cell') txtCell!: ElementRef;
  @ViewChild('email') txtEmail!: ElementRef;
  @ViewChild('password') txtPassword!: ElementRef;
  @ViewChild('checkIsAdmin') checkIsAdmin!: ElementRef;
  @ViewChild('userImg') imgUser!: ElementRef;

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
      this.imgSelec = true

    } else {
      img.src = this.imgDefault
      this.imgSelec = false
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
    if (!this.imgSelec) return false

    return true
  }

  saveChanges(){
    const isVerify = this.checkInputs()
    if(isVerify){
      this.getAllInputs()            
      this.userService.upDateUser(this.myUser)
      
      return
    }

    errorInputs()
  }

  setIdUser(id:string){
    this.myUser.idUser = id
  }
}