import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  title1 : string   = 'Ventas X Año';
  labels1: string[] = ['Año 2018', 'Año 2019', 'Año 2020'];
  data1  : any      = [[1000,2000,3000]];
  colors : any = [ { backgroundColor: [ '#6858E6','#007FEE','#FE8414'] } ];

}
