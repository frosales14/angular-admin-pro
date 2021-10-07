import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
    `
      .img-perfil{
        width: 200px;
        height: 200px;
      }
    `
  ]
})
export class PerfilComponent implements OnInit {

  myForm!: FormGroup;

  usuario!: Usuario;

  imagenSubir: File | undefined;
  imagenTemp: any = null;

  constructor( 
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private fileService: FileUploadService
  ) { 
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.myForm = this.fb.group({
      nombre : [ this.usuario.nombre || '' , [Validators.required] ],
      email  : [ this.usuario.email || '', [Validators.required, Validators.email] ]
    });
  }

  update(){
    this.usuarioService.actuaalizarUsuario( this.myForm.value )
        .subscribe( () => {
          const { nombre, email } = this.myForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('Guardado','Informacion Actualizada Exitosamente', 'success');
        }, (err) => {
          Swal.fire('No Se Guardo', err.error.msg , 'error');
        });
  }


  cambiarImagen( event: any): void{
    this.imagenSubir = event.target.files[0];
    
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
    console.log()
    this.fileService.actualizarFoto( this.imagenSubir!,'usuarios', this.usuario.uid || '' )
        .then( img => {
          this.usuario.img = img;
          Swal.fire('Exito', 'La Imagen Se Guardo Exitosamente', 'success');
        })
        .catch( () =>  {
          Swal.fire('Error', 'No Se Logro Cargar La Imagen', 'error');
        });
  }
}
