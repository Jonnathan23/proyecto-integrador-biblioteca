import { Routes } from '@angular/router';

import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { IniciarsesionComponent } from './pages/iniciarsesion/iniciarsesion.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { AdminbooksComponent } from './pages/adminbooks/adminbooks.component';
import { UserComponent } from './pages/user/user.component';




export const routes: Routes = [    
    {path:'bienvenido', component:BienvenidaComponent},
    {path:'iniciar', component:IniciarsesionComponent},
    {path:'adminbooks', component:AdminbooksComponent}, 
    {path:'registrarse', component: RegistrarseComponent},
    {path:'usuario', component:UserComponent},
    {path: '', redirectTo:'bienvenido', pathMatch:'full'},

];
