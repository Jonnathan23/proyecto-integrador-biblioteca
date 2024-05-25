import { Routes } from '@angular/router';
import { ModulebooksComponent } from './modulebooks/modulebooks.component';
import { ModulesessionComponent } from './modulesession/modulesession.component';

export const routes: Routes = [
    {path:'modulebooks', component:ModulebooksComponent},
    {path:'sesion', component:ModulesessionComponent}
];
