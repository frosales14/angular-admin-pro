import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('valor') progress: number = 50;
  @Input() btnClass: string = 'btn-primary'
  
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  incrementarProgress( incrementar: number ) {
    
    if( this.progress >= 100 && incrementar >= 0) { 
      this.valorSalida.emit(100);
      return this.progress = 100; 
    }

    if( this.progress <= 0 && incrementar < 0 ) { 
      this.valorSalida.emit(0);
      return this.progress = 0; 
    }

    this.progress += incrementar;
    return this.valorSalida.emit(this.progress);
    
  }

  onChange( valor: number){
    if(valor >= 100){
      this.progress = 100;
    }else if( valor <= 0 ){
      this.progress = 0;
    }else{
      this.progress = valor;
    }

    this.valorSalida.emit( this.progress );
  }
}
