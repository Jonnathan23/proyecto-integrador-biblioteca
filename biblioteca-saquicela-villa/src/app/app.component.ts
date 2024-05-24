import { Component } from '@angular/core';
 import { RouterOutlet } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { FooterComponent } from './footer/footer.component';
 import { ModulebooksModule } from './modulebooks/modulebooks.module';
 
@Component({
  selector: 'app-root',
  standalone: true,
   imports: [RouterOutlet, BienvenidaComponent,FooterComponent],
    templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'biblioteca-saquicela-villa';
}
