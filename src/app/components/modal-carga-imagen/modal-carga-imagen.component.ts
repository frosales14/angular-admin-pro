import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from '../../services/modal.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-modal-carga-imagen',
  templateUrl: './modal-carga-imagen.component.html',
  styles: [`
    .img-perfil{
      width: 400px;
      height: 400px;
    }
  `]
})
export class ModalCargaImagenComponent {

  public imagenTemp: any = null;

  imagenSubir: File | undefined;

  constructor( 
    public modalService: ModalService, 
    public fileService: FileUploadService
  ) { }

  cerrarModal(){
    this.imagenTemp = '';
    this.modalService.cerrarModal(); 
  }

  cambiarImagen( event: any ){
    this.imagenSubir = event.target.files[0];
    console.log(this.imagenSubir);
    if( !this.imagenSubir ){
      this.imagenTemp = null;
      return;
    } 

    const reader = new FileReader();
    reader.readAsDataURL( this.imagenSubir );

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    }


    
  }

  subirImagen(){
    const id = this.modalService.id;
    const tipo = this.modalService.tipo;
    this.fileService.actualizarFoto( this.imagenSubir!,tipo, id || '' )
        .then( img => {
          Swal.fire('Exito', 'La Imagen Se Guardo Exitosamente', 'success');
          this.cerrarModal();
          this.modalService.imagenSubida.emit(img);
        })
        .catch( () =>  {
          Swal.fire('Error', 'No Se Logro Cargar La Imagen', 'error');
          this.cerrarModal();
        });
  }

}
