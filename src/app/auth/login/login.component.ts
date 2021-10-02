import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';

import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  myForm = this.fb.group({
    email     : [localStorage.getItem('email') || '',[Validators.required]],
    password  : ['',[Validators.required]],
    remember  : [false,[Validators.required]],
  });

  auth2: any;

  constructor( 
    private router: Router,
    private fb: FormBuilder,
    private userService: UsuariosService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    console.log(this.myForm.value);
    
    this.userService.login(this.myForm.value)
        .subscribe( res => {
          if(this.myForm.get('remember')!.value){
            localStorage.setItem('email', this.myForm.get('email')!.value )
          }else{
            localStorage.removeItem('email');
          }

          this.router.navigateByUrl('/');

        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        })
    // this.router.navigateByUrl('/dashboard');
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp() {

      await this.userService.googleApiInit();
      this.auth2 = this.userService.auth2;
      this.attachSignin(document.getElementById('my-signin2'));
    
  };

  attachSignin(element: any){
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser: any) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.userService.loginGoogle(id_token)
              .subscribe( res => {
                this.ngZone.run( () =>  {
                  this.router.navigateByUrl('/');
                });
              });
          
        }, (error: any) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
