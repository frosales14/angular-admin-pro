import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private url_base = environment.base_url;

  private _ocultarModal: boolean = true;

  public tipo!: 'usuarios'| 'medicos' | 'hospitales';
  public id: string = '';
  public img: string = '';

  public imagenSubida: EventEmitter<string> = new EventEmitter(); 

  constructor() { }

  get ocultarModal(): boolean{
    return this._ocultarModal;
  }

  abrirModal( tipo: 'usuarios'| 'medicos' | 'hospitales', id: string = '', img: string = 'no-img' ){
    
    this.tipo = tipo;
    this.id = id;
    this._ocultarModal = false;
    
    if(img.includes('http')){
      this.img = `${this.url_base}/upload/${this.tipo}/${img}`
    }else {
      this.img = `${this.url_base}/upload/${this.tipo}/${img}`
    }

  }

  cerrarModal(){
    this._ocultarModal = true;
  }
}
