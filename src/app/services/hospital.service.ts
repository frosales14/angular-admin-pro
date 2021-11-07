import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';


interface Respuesta{
  ok: boolean;
  hospitales: Hospital[];
  hospital?: Hospital;
}

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private url_base = environment.base_url;
  private url_hospital = 'hospitales'

  constructor( private http: HttpClient ) { }


  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  listHospitales(){
    const url = `${this.url_base}/${this.url_hospital}`;
    return this.http.get<Respuesta>( url, this.headers )
      .pipe( 
        map( ({hospitales}) => hospitales )
      )
  }

  crearHospital(nombre: string){
    const url = `${this.url_base}/${this.url_hospital}`;
    return this.http.post<{ok:boolean, hospital: Hospital}>( url, {nombre}, this.headers )
      .pipe( 
        map( ({hospital}) => hospital) 
      )
      
  }

  actualizarHospital( _id: string, nombre: string ){
    const url = `${this.url_base}/${this.url_hospital}/${_id}`
    return this.http.put( url, {nombre}, this.headers );
  }

  eliminarHospital(_id: string){
    const url = `${this.url_base}/${this.url_hospital}/${_id}`;
    return this.http.delete( url, this.headers );
  }
}
