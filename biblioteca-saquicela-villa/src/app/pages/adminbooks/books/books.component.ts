import { Component, Input } from '@angular/core';
import { BookType } from '../../../../assets/models/models';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  @Input({ required: true }) books?: BookType[];

}
