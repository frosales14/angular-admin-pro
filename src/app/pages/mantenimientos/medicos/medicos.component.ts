import { Component, OnInit, OnDestroy } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalService } from '../../../services/modal.service';
import { Subject, Subscription } from 'rxjs';
import { first, takeUntil, delay } from 'rxjs/operators';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos     : Medico[] = [];
  medicosTemp : Medico[] = [];
  valor       : string = '';
  cargando    : boolean = true;
  // imgSubscription: Subscription = new Subscription();

  unsuscribe$ = new Subject();

  constructor( 
    private medicoService:MedicoService, 
    public busquedaService: BusquedasService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.listarMedicos();
    this.subscribeImgChange();
  }

  subscribeImgChange(){
    this.modalService.imagenSubida
        .pipe( 
          takeUntil(this.unsuscribe$),
          delay(1000) 
        ).subscribe( (cambio) => this.listarMedicos() );
  }

  listarMedicos(){
    this.cargando = true;
    this.medicoService.listarMedicos()
        .subscribe( medicos => {
          this.medicos = medicos;
          this.medicosTemp = medicos;
          this.cargando = false;
        });
  }

  
  borrarMedico( id: string = "" ){
    this.medicoService.borrarMedico(id)
        .subscribe( () => {
          this.listarMedicos();
        });
  }

  buscar(){
    this.cargando = true;
    if( this.valor.length === 0 ){
      this.medicos = this.medicosTemp;
      this.cargando = false;
      return;
    }

    this.busquedaService.buscar( this.valor,'medicos' )
        .pipe( takeUntil(this.unsuscribe$) )
        .subscribe( (medicos) => {
          this.medicos = medicos as Medico[]
          this.cargando = false;
        });
  }

  abrirModal( medico: Medico ){
    this.modalService.abrirModal('medicos',medico._id, medico.img);
  }

  ngOnDestroy(){
    this.unsuscribe$.next();
    this.unsuscribe$.complete();
  }
}
