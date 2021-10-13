import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  totalUsuarios : number = 0;
  desde         : number = 0;
  usuarios      : Usuario[] = [];
  usuariosTemp  : Usuario[] = [];
  loading       : boolean = false;
  valor         : string = '';

  constructor( private userService: UsuariosService,
                private busquedaService: BusquedasService ) { }

  ngOnInit( ) {
    this.getUsuarios();
  }

  getUsuarios( ){
    this.loading = true;
    this.userService.getUsuarios( this.desde )
        .subscribe( ({total, usuarios}) => {
          this.totalUsuarios = total;
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.loading = false;
        });
  }

  cambiarPagina( valor:number ){
    this.desde += valor;
    if( this.desde < 0 ){
      this.desde = 0;
    }else if( this.desde > this.totalUsuarios ){
      this.desde -= valor;
    }

    this.getUsuarios();
  }

  buscar( ){
    if( this.valor.length === 0 ){
      this.usuarios = this.usuariosTemp;
      return;
    }

    this.busquedaService.buscar( this.valor, 'usuarios' )
        .subscribe( resp => {
          this.usuarios = resp;
        });
  }

  borrar( usuario: Usuario ){

    if( usuario.uid === this.userService.uid ){
      Swal.fire( 'Error', 'No Puedes Borrarte A Ti Mismo', 'error' );
      return;
    }
    
    Swal.fire({
      title: '¿Estas Seguro?',
      text: `Estas Por Borrar a ${usuario.nombre}` ,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.userService.borrarUsuario( usuario )
            .subscribe( () => {
              
              this.getUsuarios();
              Swal.fire(
                'Eliminado',
                `El Usuario ${usuario.nombre} Fue Eliminado`,
                'success'
              );
            });
      }
    })
  }

}
