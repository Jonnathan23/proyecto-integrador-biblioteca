import { Component } from '@angular/core';
import { AdminComponent } from '../adminbooks/admin/admin.component';
import { HeaderComponent } from '../../header/header.component';
import { DatauserService } from '../../services/datauser.service';

@Component({
  selector: 'app-useradmin',
  standalone: true,
  imports: [AdminComponent, HeaderComponent],
  templateUrl: './useradmin.component.html',
  styleUrl: './useradmin.component.scss'
})
export class UseradminComponent {

  allUsers: any[] = []

  constructor(private userService: DatauserService ){}

  ngOnInit(){
    //this.userService.getUsers().subscribe( (users) => this.allUsers = users)
  }


}
