import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { HospitalService } from '../../../services/hospital.service';
import { ModalService } from '../../../services/modal.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales    : Hospital[] = [];
  hospitalesTemp: Hospital[] = [];
  cargando      : boolean = true;
  valor         : string = '';

  constructor(  private hospitalService: HospitalService, private modalService: ModalService, private busquedaService: BusquedasService ) { }

  ngOnInit(): void {
    this.listarHospitales();
    this.subsImageChange();
  }

  subsImageChange(){
    this.modalService.imagenSubida.pipe( delay(1000) ).subscribe( () => this.listarHospitales() );
  }

  busquedaHospitales(){
    if( this.valor.length === 0 ){
      this.hospitales = this.hospitalesTemp;
      return;
    }

    this.busquedaService.buscar( this.valor, 'hospitales' )
        .subscribe( resp => {
          this.hospitales = resp as Hospital[];
        });
  }

  listarHospitales(){
    this.cargando = true;
    this.hospitalService.listHospitales()
        .subscribe( hospitales => {
          this.hospitales = hospitales;
          this.hospitalesTemp = hospitales;
          this.cargando = false;
        });
  }

  actualizarHospital( hospital: Hospital ){
    
    this.hospitalService.actualizarHospital(  hospital._id ,hospital.nombre )
        .subscribe( () => {
          Swal.fire('Actualizado',hospital.nombre,'success');
          this.listarHospitales();
        });
  }

  borrarHospital( hospital: Hospital ){
    this.hospitalService.eliminarHospital( hospital._id )
        .subscribe( () => {
          Swal.fire('Eliminado', hospital.nombre, 'success');
          this.listarHospitales();
        });
  }

  async crearHospital(){
    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Nombre Del Hospital'
    })

    if( value!.trim().length > 0 ){
      this.hospitalService.crearHospital( value || '' )
          .subscribe( ( hospital ) => {
            this.hospitales.push(hospital);
          });
    }
  }

  abrirModal(hospital: Hospital){
    this.modalService.abrirModal('hospitales',hospital._id,hospital.img);
  }

}
