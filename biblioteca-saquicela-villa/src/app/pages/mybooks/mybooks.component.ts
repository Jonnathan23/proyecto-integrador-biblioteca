import { Component } from '@angular/core';
import { AdminBook, BookHistory, UserType } from '../../../assets/models/models';
import { ReturnbookshistoryService } from '../../services/history/returnbookshistory.service';
import { LoginserviceService } from '../../services/foruser/loginservice.service';
import { DatabookService } from '../../services/forbook/databook.service';
import { MybooksService } from '../../services/history/mybooks.service';

@Component({
  selector: 'app-mybooks',
  standalone: true,
  imports: [],
  templateUrl: './mybooks.component.html',
  styleUrl: './mybooks.component.scss'
})
export class MybooksComponent {

  books: AdminBook[] = []
  myUser!: UserType;

  constructor(private bookService: DatabookService, private loginService: LoginserviceService, private myBooksService: MybooksService) { }

  ngOnInit() {
    this.loginService.getUserActive().subscribe((user) => {
      const userLocal = this.loginService.getUserStorage()!;
      this.myUser = userLocal.idUser ? userLocal : user

      this.bookService.getBooks().subscribe((books) => {
        this.myBooksService.getMyBooks().subscribe((myBooks) => {

          const booksUser = myBooks.filter((myBook) => myBook.idUser === this.myUser.idUser)

          this.books = books.filter((book) => {
            return booksUser.some((lendBook) => lendBook.idBook === book.id)
          })
        })
      })

    })
  }
  returnBook(book: AdminBook) {


  }

}
