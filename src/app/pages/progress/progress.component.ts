import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progress1: number = 20;
  progress2: number = 50;

  get getValorProgress1(){
    return `${this.progress1}%`
  }

  get getValorProgress2(){
    return `${this.progress2}%`
  }

}
