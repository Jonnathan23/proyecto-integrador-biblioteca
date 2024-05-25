import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesessionComponent } from './modulesession.component';
import { IniciosessionComponent } from './iniciosession/iniciosession.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';



@NgModule({
  declarations: [
    ModulesessionComponent,
    IniciosessionComponent,
    RegistrarseComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[ModulesessionComponent]
})
export class ModulesessionModule { }
