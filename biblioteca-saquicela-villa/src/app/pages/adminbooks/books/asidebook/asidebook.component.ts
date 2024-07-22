import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SelectedbookService } from '../../../../services/forbook/selectedbook.service';
import { AdminBook, LendBookHistory, StateBook } from '../../../../../assets/models/models';
import { dates, statesBook } from '../../../../../assets/data/data';
import { LendbookshistoryService } from '../../../../services/history/lendbookshistory.service';
import { LoginserviceService } from '../../../../services/foruser/loginservice.service';
import { ErrorBookIsReserved, ErrorFillEmpty } from '../../../../../errors/errors';
import { addLendBookError, errorInputs } from '../../../../../alerts/alerts';

@Component({
  selector: 'app-asidebook',
  standalone: true,
  imports: [],
  templateUrl: './asidebook.component.html',
  styleUrl: './asidebook.component.scss'
})
export class AsidebookComponent {
  cbText!: string
  book!: AdminBook;
  cbDate!: string;
  datesLend = [...dates]
  states: StateBook[] = [...statesBook]
  lendBook: LendBookHistory;

  @ViewChild('name') txtName!: ElementRef;
  @ViewChild('autor') txtAutor!: ElementRef;
  @ViewChild('description') txtDescription!: ElementRef;
  @ViewChild('cbCategory') cbCategory!: ElementRef;
  @ViewChild('book_img') imgBook!: ElementRef;

  constructor(private selectedBookService: SelectedbookService, private render: Renderer2, private lendBookService: LendbookshistoryService, private loginService: LoginserviceService) {
    this.cbText = this.selectedBookService.getCbText();
    this.cbDate = this.selectedBookService.getCbDate();
    this.lendBook = this.lendBookService.getLendBookRestar()
  }

  ngOnInit() {
    this.selectedBookService.getSelectedBook().subscribe((book) => {
      this.book = book
      this.loginService.getUserActive().subscribe((user) => {
        const userLocal = this.loginService.getUserStorage()!;

        if (userLocal.idUser) {
          this.lendBook.nameUser = userLocal.name
          this.lendBook.idUser = userLocal.idUser
        } else {
          this.lendBook.nameUser = user.name
          this.lendBook.idUser = user.idUser
        }
      })

      this.setLendBookData()

      setTimeout(() => this.fillData(this.book), 0)
    })

  }

  /**
   * @description Llena los datos del formulario con el libro que se la ha pasado como parametro
   * @param book 
   */
  fillData(book: AdminBook) {
    this.render.setProperty(this.txtName.nativeElement, 'value', book.name)
    this.render.setProperty(this.txtAutor.nativeElement, 'value', book.autor)
    this.render.setProperty(this.txtDescription.nativeElement, 'value', book.description)
    this.cbText = book.category
    this.render.setProperty(this.imgBook.nativeElement, 'src', book.image)
  }

  selectDate(e: Event) {
    const date = e.target as HTMLInputElement
    const currentDate = new Date();
    const today = currentDate
    currentDate.setDate(currentDate.getDate() + dates[+date.value - 1].days)
    this.lendBook.date = `${this.lendBookService.formatDate(today)} - ${this.lendBookService.formatDate(currentDate)}`
  }

  setLendBookData() {
    this.lendBook.idBook = this.book.id
    this.lendBook.category = this.book.category
    this.lendBook.name = this.book.name
  }

  async check() {
    if (this.lendBook.date === '') throw new ErrorFillEmpty('Fecha no seleccionada')

    if (this.book.state !== statesBook[0].description) throw new ErrorBookIsReserved('Libro reservado')

  }

  async saveMyBook() {
    try {
      await this.check()
      this.book.state = statesBook[1].description
      this.lendBookService.addLendBook(this.lendBook, this.book)
    } catch (error) {

      if (error instanceof ErrorFillEmpty) errorInputs()

      else if (error instanceof ErrorBookIsReserved) addLendBookError()

      else addLendBookError()
    }
  }

  async aside() {
    try {
      await this.check()
      this.book.state = statesBook[1].description
      this.lendBookService.addLendBook(this.lendBook, this.book)
    } catch (error) {

    }
  }
}
