import { Component } from '@angular/core';
import { BookType } from '../../assets/models/models';
import { DatabookService } from '../services/databook.service';

@Component({
  selector: 'app-modulebooks',
  templateUrl: './modulebooks.component.html',
  styleUrl: './modulebooks.component.scss'
})
export class ModulebooksComponent {
  admin = true
  allBooks:BookType[] = []
  constructor(private bookService:DatabookService){}

  ngOnInit(){
    this.bookService.getBooks().subscribe( (books) => this.allBooks = books)
  }
}
