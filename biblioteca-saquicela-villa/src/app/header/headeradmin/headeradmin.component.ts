import { Component } from '@angular/core';
import { DatauserService } from '../../services/datauser.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header.component';

@Component({
  selector: 'app-headeradmin',
  standalone: true,
  imports: [],
  templateUrl: './headeradmin.component.html',
  styleUrl: './headeradmin.component.scss'
})
export class HeaderadminComponent {
  constructor(private useService: DatauserService, private router: Router) { }

  back() {
    this.useService.back();
  }
  linkLibros() {
    this.router.navigate(['/adminbooks'])
    this.headerModif(true);
    console.log('Libros');
  }

  linkPerfil() {  
    this.router.navigate(['/usuario'])
    this.headerModif(true);
    console.log('Perfil');
  }
  linkUsuarios() {  
    this.router.navigate(['/usuariosAdmin'])
    this.headerModif(true);
    console.log('Administra Usuarios');
  }

  linkAtri() {  
    this.router.navigate(['/atribuciones'])
    this.headerModif(true);
    console.log('Atribuciones');
  }

  headerModif(opc: boolean){
    const dadHeader = HeaderComponent.getInstance();
      dadHeader.setIngreso(opc);
  }
}
