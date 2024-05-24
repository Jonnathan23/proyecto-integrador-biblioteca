import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ModulebooksModule } from './modulebooks/modulebooks.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,ModulebooksModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'biblioteca-saquicela-villa';
}
