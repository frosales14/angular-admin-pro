import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../models/hospital.model';
import { MedicoService } from '../../../../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public myForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Medico | undefined;
  public hospitalSeleccionado: Hospital | undefined;

  constructor( 
    public fb: FormBuilder,
    public hospitalService: HospitalService,
    public medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initForm();
    this.cargarHospitales();
    this.cambioHospital();
    this.activatedRoute.params.subscribe( ({id}) =>  this.obtenerMedico(id));
  }

  initForm(){
    this.myForm = this.fb.group({
      nombre    : [ "", [Validators.required] ],
      hospital  : [ "", [Validators.required] ] 
    });
  }

  cambioHospital(){
    this.myForm.get('hospital')?.valueChanges
        .subscribe( (idHospital: string) => {
          this.hospitalSeleccionado = this.hospitales.find( (hospital) => hospital._id === idHospital );
        });
  }

  guardarMedico(){

    if(this.medicoSeleccionado){
      const medico = {
        ...this.myForm.value,
        _id: this.medicoSeleccionado._id
      };

      this.medicoService.editarMedico(medico)
          .subscribe(resp => {
            Swal.fire("Actualizado", "Medico Actualizado", "success");
          });
    }else{
      this.medicoService.crearMedico( this.myForm.value )
          .subscribe( ({_id,nombre}) => {
            Swal.fire("Creado",`medico ${nombre} creado exitosamente`,"success");
            this.router.navigateByUrl(`dashboard/medicos/${_id}`);
          });
    }

  }

  cargarHospitales(){
    this.hospitalService.listHospitales()
        .subscribe( (hospitales) => {
          this.hospitales = hospitales;
        });
  }

  obtenerMedico(id:string){

    if(id === "nuevo"){
      return;
    }

    this.medicoService.obtenerMedico(id)
        .pipe( 
          delay(100)
        )
        .subscribe( medico => {
          const { nombre, hospital: {_id} } = medico;
          this.myForm.setValue({nombre, hospital: _id })
          this.medicoSeleccionado = medico;
        }, err => this.router.navigateByUrl("dashboard/medicos"));
  }

}
