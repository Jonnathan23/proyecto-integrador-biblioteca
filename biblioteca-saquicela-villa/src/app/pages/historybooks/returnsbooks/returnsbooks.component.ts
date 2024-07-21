import { Component, Input } from '@angular/core';
import { AdminBook, ReturnBookHistory } from '../../../../assets/models/models';

@Component({
  selector: 'app-returnsbooks',
  standalone: true,
  imports: [],
  templateUrl: './returnsbooks.component.html',
  styleUrl: './returnsbooks.component.scss'
})
export class ReturnsbooksComponent {
  @Input({ required: true }) book!: AdminBook;
  returnsBooks: ReturnBookHistory[] = [];

  ngOnInit(){
    
  }
}
