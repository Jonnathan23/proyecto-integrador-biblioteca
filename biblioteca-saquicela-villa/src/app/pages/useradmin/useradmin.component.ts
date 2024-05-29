import { Component } from '@angular/core';
import { AdminComponent } from '../adminbooks/admin/admin.component';
import { HeaderComponent } from '../../header/header.component';
import { DatauserService } from '../../services/datauser.service';
import { UserType } from '../../../assets/models/models';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-useradmin',
  standalone: true,
  imports: [AdminComponent, HeaderComponent],
  templateUrl: './useradmin.component.html',
  styleUrl: './useradmin.component.scss'
})
export class UseradminComponent {

  users:UserType[] = []

  userSelec!:UserType

  constructor(private userService: DatauserService ){}

  ngOnInit(){
    //this.userService.getUsers().subscribe( (users) => this.allUsers = users)
    this.userService.getUsers().subscribe(users => this.users = users)

  }

  selectedUser(user:UserType){
    this.userSelec = user
    const userComponent =   UserComponent.getIntance()
    userComponent.fillDataUser(user)
  }



  


}