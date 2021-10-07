import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private base_url = environment.base_url;

  
  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'medicos' | 'usuarios' | 'hospitales',
    id: string
  ){
    try {
      const url = `${ this.base_url }/upload/${tipo}/${id}`;
      const formData = new FormData();  

      formData.append( 'imagen', archivo );

      const res = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await res.json();
      return data.nombreArchivo;

    } catch (error) {
      console.log( error );
      return false;
    }

  }

}
