import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';

interface Respuesta{
  ok: boolean;
  medicos: Medico[]
}

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  private url_base = environment.base_url;
  private rutaMedicos = 'medicos';

  get token(){
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  constructor( private http: HttpClient ) { }

  listarMedicos(){
    const url = `${this.url_base}/${this.rutaMedicos}`;
    return this.http.get<Respuesta>( url, this.headers )
      .pipe(
        map( ({medicos}) => medicos)
      );
  }

  obtenerMedico( id: string ){
    const url = `${this.url_base}/${this.rutaMedicos}/${id}`;
    return this.http.get<{ok: boolean, medico:Medico}>( url, this.headers )
      .pipe(
        map( ({medico}) => medico )
      )
  }

  crearMedico(medico: {nombre: string, hospital: string}){
    const url = `${this.url_base}/${this.rutaMedicos}`;
    return this.http.post<{ok: boolean, medico: Medico}>( url, medico ,this.headers )
      .pipe(
        map( ({medico}) => medico)
      );
  }

  editarMedico(medico: {_id: string, nombre: string, hospital: string}){
    const url = `${this.url_base}/${this.rutaMedicos}/${medico._id}`;
    return this.http.put( url, medico ,this.headers );
  }

  borrarMedico( id:string ){
    const url = `${this.url_base}/${this.rutaMedicos}/${id}`;
    return this.http.delete( url, this.headers );
  }
}
