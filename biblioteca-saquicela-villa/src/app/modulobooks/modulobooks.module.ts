import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModulobooksComponent } from './modulobooks.component';
import { BooksComponent } from './books/books.component';
import { AdminComponent } from './admin/admin.component';



@NgModule({
  declarations: [
    ModulobooksComponent,
    BooksComponent,
    AdminComponent
  ],
  imports: [
    CommonModule
  ], exports:[ModulobooksComponent]
})
export class ModulobooksModule { }
