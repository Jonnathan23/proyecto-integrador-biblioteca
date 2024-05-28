import { Component } from '@angular/core';
import { HeaderbienvComponent } from './headerbienv/headerbienv.component';
import { HeadersessionComponent } from './headersession/headersession.component';
import { Router } from '@angular/router'; // Add this line

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderbienvComponent, HeadersessionComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  ingreso= false;
  private static instance: HeaderComponent;

  constructor() {
    if (HeaderComponent.instance) return HeaderComponent.instance;
    HeaderComponent.instance = this;
   }

   setIngreso(option: boolean) {
    this.ingreso = option;
  }

  public static getInstance() {
    return HeaderComponent.instance;
  }

 
}
