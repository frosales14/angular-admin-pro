import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

  private transformarUsuarios( resultados: any[] ){

    return resultados.map( (user:any) => new Usuario( user.nombre,'',user.role,user.email,user.google,user.img,user.uid ));

  }
  
  constructor( private http: HttpClient ) { }



  buscar( termino: string, coleccion: 'usuarios' | 'medicos' | 'hospitales' ){

    const url = `${this._urlBase}/todo/coleccion/${coleccion}/${termino}`;

    return this.http.get( url, this.headers )
      .pipe(
        map( (resp:any) => {
          
          switch( coleccion ){
            case 'usuarios': 
              return this.transformarUsuarios( resp.resultados );
            default: 
              return [];
          }
        })
      )

  }

}
