import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { UserType } from '../../../assets/models/models';
import { errorInputs, shortPassword } from '../../../alerts/alerts';
import { UseradminComponent } from "../useradmin/useradmin.component";
import { DatauserService } from '../../services/foruser/datauser.service';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginserviceService } from '../../services/foruser/loginservice.service';
import { SelecteduserService } from '../../services/foruser/selecteduser.service';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [UseradminComponent]
})




export class UserComponent {

  imgDefault = 'assets/img/imageUser.jpg'
  myUser!: UserType  //Usuario dueño de la sesión
  userModify!: UserType  //
  @ViewChild('userImg') imgUser!: ElementRef;

  constructor(private loginService: LoginserviceService, private selectedUser: SelecteduserService) {
  }
  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
      this.myUser = userLocal.idUser ? userLocal : user;
    })

    //this.selectedUser.getSelectedUser().subscribe((user) => this.userModify = user)
    this.selectedUser.getSelectedUser().subscribe((user) =>
      this.userModify = user.idUser ? user : this.loginService.getUserStorage()
    )
  }

  
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
}