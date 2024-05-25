import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent {

}
