import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formSubmited: boolean = false;

  myForm = this.fb.group({
    email       : [ 'fernando@gmail.com', [Validators.required]],
    nombre      : [ 'Fernando', [Validators.required] ],
    password    : [ 'paswword', [Validators.required] ],
    password2   : [ 'paswword2', [Validators.required] ],
    terminos    : [ false, [Validators.required] ],
  },{
    validators: this.passwordIguales('password','password2')
  }); 

  constructor( private fb: FormBuilder,
                private userService: UsuariosService) { }

  ngOnInit(): void {
  }

  campoValido(campo:string): boolean{
    return (this.myForm.get(campo)?.invalid && this.formSubmited)
    ? true
    : false; 
  }

  aceptarTerminos(){
    return !this.myForm.get('terminos')?.value && this.formSubmited
  }

  register(){
    this.formSubmited = true;
    console.log(this.myForm);

    if(this.myForm.invalid) return;

    this.userService.crearUsuario(this.myForm.value)
        .subscribe( res => {
          console.log(res);
        }, (err)=>{
          Swal.fire('Error', err.error.msg, 'error');
        });
  }
  passwordIguales( pass1: string, pass2: string){
    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control?.value === pass2Control?.value ){
        pass2Control?.setErrors(null);
      }else{
        pass2Control?.setErrors({noEsigual: true});
      }

    }
  }

}
