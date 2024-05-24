import { Component } from '@angular/core';
 import { RouterLink, RouterOutlet } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { FooterComponent } from './footer/footer.component';
import { ModulesessionModule } from './modulesession/modulesession.module';
import { IniciarsesionComponent } from './pages/iniciarsesion/iniciarsesion.component';
 
@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
   imports: [RouterOutlet, BienvenidaComponent,FooterComponent, ModulesessionModule, IniciarsesionComponent],
=======
   imports: [RouterOutlet, BienvenidaComponent,FooterComponent, RouterLink],
>>>>>>> 476719a92ac79e030232a3a0c73dfd0d130c80f8
    templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'biblioteca-saquicela-villa';
}
