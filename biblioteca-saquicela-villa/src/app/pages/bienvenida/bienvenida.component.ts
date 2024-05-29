import { Component } from '@angular/core';
import { Atribuciones } from '../../../assets/models/models';
import { DataatribucionesService } from '../../services/dataatribuciones.service';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss'
})
export class BienvenidaComponent {

  atribuciones : Atribuciones[] = []

  constructor(private atribService:DataatribucionesService){ }

  ngOnInit(){
    this.atribService.getAtribuciones().subscribe( (atribuciones) => this.atribuciones = atribuciones)
  }

}