import { Routes } from '@angular/router';
import { ModulebooksComponent } from './modulebooks/modulebooks.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';


export const routes: Routes = [
    {path:'modulebooks', component:ModulebooksComponent},
    {path:'bienvenido', component:BienvenidaComponent},
    {path: '', redirectTo:'bienvenido', pathMatch:'full'}
];
