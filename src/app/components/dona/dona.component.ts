import { Component, Input } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  
  @Input() title: string = 'sin titulo';
  @Input('legends') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [ [350, 450, 100] ];

  @Input() colors:Color[] = [ { backgroundColor: [ '#6857E6','#009FEE','#FF8414'] } ]

}
