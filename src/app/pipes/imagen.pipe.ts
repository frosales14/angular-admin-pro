import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const url_base = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string | undefined, tipo: 'usuarios' | 'medicos' | 'hospitales' ): string {
    
    if(!img){
      return `${url_base}/upload/${tipo}/no-image`
    }else if(img?.includes('https')){
        return img;
    }else if( img ){
        return `${url_base}/upload/${tipo}/${img}`
    }else{
        return `${url_base}/upload/${tipo}/no-image`
    }
  }

}
