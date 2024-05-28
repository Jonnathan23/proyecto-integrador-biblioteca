import { Component } from '@angular/core';
import { DatauserService } from '../../services/datauser.service';
import { RouterLink,Router } from '@angular/router';
import { HeaderComponent } from '../header.component';


@Component({
  selector: 'app-headersession',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './headersession.component.html',
  styleUrl: './headersession.component.scss'
})
export class HeadersessionComponent {

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
