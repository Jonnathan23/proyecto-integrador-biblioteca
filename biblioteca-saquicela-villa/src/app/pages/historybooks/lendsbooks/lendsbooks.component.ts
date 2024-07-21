import { Component, Input } from '@angular/core';
import { AdminBook, LendBookHistory } from '../../../../assets/models/models';
import { LendbookshistoryService } from '../../../services/history/lendbookshistory.service';

@Component({
  selector: 'app-lendsbooks',
  standalone: true,
  imports: [],
  templateUrl: './lendsbooks.component.html',
  styleUrl: './lendsbooks.component.scss'
})
export class LendsbooksComponent {
  @Input({ required: true }) book!: AdminBook;

  lendsBooks: LendBookHistory[] = []

  constructor(private lendBookService: LendbookshistoryService) { }

  /** 
   * TODO: Colocar la la condificion de filtrado para retornar solo el libro del Input  
   *  * Se puede validar desde aquíd
   *  * Se puede validar desde el back - end
   */
  ngOnInit() {
    this.lendBookService.getLendsBoos().subscribe((lends) => this.lendsBooks = lends.filter((lend) => this.book.name === lend.name))
    console.log(this.lendsBooks)
  }
}
