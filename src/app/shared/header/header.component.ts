import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  usuario: Usuario;

  constructor( 
    private usuarioService: UsuariosService  
  ) { 
    this.usuario = usuarioService.usuario;
  }

  logOut(){
    this.usuarioService.logOut();
  }

}
