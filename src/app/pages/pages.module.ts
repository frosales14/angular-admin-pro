import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Grafica1Component,
    ProgressComponent,
    DashboardComponent,
    NopagefoundComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
