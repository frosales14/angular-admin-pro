import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';
import { Usuario } from '../models/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  private _urlBase = environment.base_url;

  
  private get headers(){
    return {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    }
  }

  constructor( private http: HttpClient ) { }

  private transformarUsuarios( resultados: any[] ){

    return resultados.map( (user:any) => new Usuario( user.nombre,'',user.role,user.email,user.google,user.img,user.uid ));

  }

  private transformHospitales( resultado: any[] ): Hospital[]{
    return resultado;
  }

  private transformMedicos( resultado: any[] ): Medico[]{
    return resultado;
  }

  buscar( termino: string, coleccion: 'usuarios' | 'medicos' | 'hospitales' ){

    const url = `${this._urlBase}/todo/coleccion/${coleccion}/${termino}`;

    return this.http.get( url, this.headers )
      .pipe(
        map( (resp:any) => {
          
          switch( coleccion ){
            case 'usuarios': 
              return this.transformarUsuarios( resp.resultados );
            case 'hospitales':
              return this.transformHospitales( resp.resultados );
            case 'medicos':
              return this.transformMedicos( resp.resultados );
            default: 
              return this.transformMedicos( resp.resultados );
          }
        })
      )

  }

}
