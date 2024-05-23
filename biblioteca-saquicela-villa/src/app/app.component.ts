import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModulobooksComponent } from './modulobooks/modulobooks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModulobooksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'biblioteca-saquicela-villa';
}
