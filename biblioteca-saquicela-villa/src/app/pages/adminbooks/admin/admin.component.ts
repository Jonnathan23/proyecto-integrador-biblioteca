import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { BookType, CategoryType } from '../../../../assets/models/models';
import { categories } from '../../../../assets/data/categorias';
import { DatabookService } from '../../../services/databook.service';
import { error } from '../../../../alerts/alerts';
import { __values } from 'tslib';
import { AddbookComponent } from "./addbook/addbook.component";

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss',
    imports: [AddbookComponent]
})
export class AdminComponent {
  @Input({ required: true }) books?: BookType[];

  //Agregar o modificar
  addBook = true 
  
}

