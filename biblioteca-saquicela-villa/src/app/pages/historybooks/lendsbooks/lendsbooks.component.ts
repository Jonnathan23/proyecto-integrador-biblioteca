import { Component, Input } from '@angular/core';
import { AdminBook, LendBookHistory } from '../../../../assets/models/models';

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

  /** 
   * TODO: Colocar la la condificion de filtrado para retornar solo el libro del Input  
   *  * Se puede validar desde aquíd
   *  * Se puede validar desde el back - end
   */
  ngOnInit(){

  }
}
