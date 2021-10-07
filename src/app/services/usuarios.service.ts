import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private base_url: string = environment.base_url;

  public auth2: any;

  public usuario!: Usuario;

  get token(){
    return localStorage.getItem('token') || '';
  }
  get uid(){
    return this.usuario.uid || '';
  }

  constructor( 
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.googleApiInit();
  }

  googleApiInit(){
    return new Promise( (resolve:any): void =>  {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '645442196396-hnt87vk9f4no031brelbe92v9upr1uo5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
      });
    })

  }

  renewToken(): Observable<boolean>{

    const url = `${this.base_url}/login/renew`;

    return this.http.get( url, {
      headers:{
        'x-token': this.token
      }
    }).pipe(
      map( (res: any) => {
        localStorage.setItem('token', res.token)
        const { email, img = '', nombre, google, role, uid } = res.usuario;
        this.usuario = new Usuario( nombre, '', role, email, google, img, uid );
        return true;
      }),
      catchError( err => of(false) )
    )

  }


  crearUsuario(formData:RegisterForm){
    const url = `${this.base_url}/usuarios`;
    
    return this.http.post(url, formData);

  }

  actuaalizarUsuario( data : { nombre:string,email: string, role: string }){
    const url = `${this.base_url}/usuarios/${this.uid}`;

    data = {
      ...data,
      role: this.usuario.role
    };

    return this.http.put( url , data, {
      headers: {
        'x-token': this.token
      }
    });

  }

  login(loginForm: LoginForm){
    const url = `${this.base_url}/login`;
    
    return this.http.post(url,loginForm)
      .pipe(tap( (res: any) => {
        localStorage.setItem('token', res.token);
      }));
  }

  loginGoogle(token: string){
    const url = `${this.base_url}/login/google`;
    
    return this.http.post(url,{token})
      .pipe(tap( (res: any) => {
        localStorage.setItem('token', res.token);
      }));
  }


  logOut(){
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {
        this.router.navigateByUrl('/login');
      });
    });
  }

}
