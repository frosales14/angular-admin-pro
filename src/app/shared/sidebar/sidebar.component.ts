import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from '../../services/sidebar.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[] = [];

  usuario: Usuario;

  constructor( private sidebarService: SidebarService, private usuarioService: UsuariosService ) { 
    this.menuItems = this.sidebarService.menu;
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
  }

}
