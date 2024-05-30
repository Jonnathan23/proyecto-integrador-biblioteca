import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-headerbienv',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './headerbienv.component.html',
  styleUrl: './headerbienv.component.scss'
})
export class HeaderbienvComponent {
constructor(private route: Router) { }

  goHome() {
    this.route.navigate(['/bienvenido']);
  } 

}
