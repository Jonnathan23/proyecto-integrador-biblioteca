import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BienvenidaComponent, FooterComponent,  RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'biblioteca-saquicela-villa';
}
