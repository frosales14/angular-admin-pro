import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu = [
    {
      titulo: 'Dahshboard',
      icono: 'mdi mdi-gauge',
      subMenu: [
        {  titulo: 'Main', url: '/'},
        {  titulo: 'ProgressBar', url: 'progress'},
        {  titulo: 'Graficas', url: 'grafica1'},
      ]
    }
  ]
  constructor() { }
}
