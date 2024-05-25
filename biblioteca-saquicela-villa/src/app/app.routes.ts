import { Routes } from '@angular/router';
import { ModulebooksComponent } from './modulebooks/modulebooks.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { IniciarsesionComponent } from './pages/iniciarsesion/iniciarsesion.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';


export const routes: Routes = [
    {path:'modulebooks', component:ModulebooksComponent},
    {path:'bienvenido', component:BienvenidaComponent},
    {path:'iniciar', component:IniciarsesionComponent},
    {path:'registrarse', component: RegistrarseComponent},
    {path: '', redirectTo:'bienvenido', pathMatch:'full'},

];
