import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor( 
    private userService:UsuariosService,
    private router: Router
  ){ }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {
    
      return this.userService.renewToken()
        .pipe( tap( estaAutenticado => {
            if(!estaAutenticado){
              this.router.navigateByUrl('/login');
            }
          })
        );
  
    }
  
}
