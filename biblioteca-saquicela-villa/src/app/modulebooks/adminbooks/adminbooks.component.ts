import { Component, Input } from '@angular/core';
import { BookType } from '../../../assets/models/models';
import { DatabookService } from '../../services/databook.service';

@Component({
  selector: 'app-adminbooks',
  templateUrl: './adminbooks.component.html',
  styleUrl: './adminbooks.component.scss'
})
export class AdminbooksComponent {
  @Input({required:true}) books?:BookType[];

}
