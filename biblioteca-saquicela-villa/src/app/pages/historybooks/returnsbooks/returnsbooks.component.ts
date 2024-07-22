import { Component, Input } from '@angular/core';
import { AdminBook, BookHistory } from '../../../../assets/models/models';
import { ReturnbookshistoryService } from '../../../services/history/returnbookshistory.service';

@Component({
  selector: 'app-returnsbooks',
  standalone: true,
  imports: [],
  templateUrl: './returnsbooks.component.html',
  styleUrl: './returnsbooks.component.scss'
})
export class ReturnsbooksComponent {
  @Input({ required: true }) book!: AdminBook;
  returnsBooks: BookHistory[] = [];

  constructor(private returnBookSerive: ReturnbookshistoryService) { }

  ngOnInit() {
    this.returnBookSerive.getReturnBooks().subscribe((returns) => this.returnsBooks = returns.filter((rbook)=> this.book.name === rbook.name ))
  }
}
