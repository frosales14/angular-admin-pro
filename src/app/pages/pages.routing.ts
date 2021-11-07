import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/crear-editar/medico.component';

const routes: Routes = [
    { 
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'grafica #1' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Tema' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
            { path: 'perfil', component: PerfilComponent, data: {titulo: 'Mi Perfil'} },
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios De Aplicacion'} },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' } },
            { path: 'medicos/:id', component: MedicoComponent, data: { titulo: 'Medico' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
