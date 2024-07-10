import { Component } from '@angular/core';
import { AdminComponent } from '../adminbooks/admin/admin.component';
import { HeaderComponent } from '../../header/header.component';
import { DatauserService } from '../../services/foruser/datauser.service';
import { UserType } from '../../../assets/models/models';
import { SelecteduserService } from '../../services/foruser/selecteduser.service';

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

  constructor(private userService: DatauserService, private selectedUserService: SelecteduserService) { }

  ngOnInit(){    
    this.userService.getUsers().subscribe(users => this.users = users)
  }

  selectedUser(user:UserType){
    this.selectedUserService.setSelectedUser(user)
  }

}