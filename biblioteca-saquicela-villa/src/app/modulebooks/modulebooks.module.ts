import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulebooksComponent } from './modulebooks.component';
import { BooksComponent } from './books/books.component';
import { AdminbooksComponent } from './adminbooks/adminbooks.component';



@NgModule({
  declarations: [
    ModulebooksComponent,
    BooksComponent,
    AdminbooksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModulebooksModule { }
