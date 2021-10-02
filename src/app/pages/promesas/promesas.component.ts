import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    this.getUsuarios().then( resp => {
      console.log(resp);
    })
  
    // ------------------------Ejemplo de como hacer una promesa ------------------------
    // const promesa = new Promise( (resolve, reject) => {

    //   if( false ){
    //     resolve('Todo Salio Bien');
    //   }else{
    //     reject('Todo Salio Mal');
    //   }



    // });

    // promesa.then( mensaje => {
    //   console.log(mensaje);
    // }).catch( error => console.log(error) );

    // console.log('fin init')
  }


  getUsuarios(){

    //-----------Forma 1 de hacer un fetch------------------
    // fetch('https://reqres.in/api/users')
    //   .then( res => {
    //     res.json()
    //     .then( data => {
    //       console.log(data.data);
    //     })
    //   })

    //---------------Forma 2 de hacer un fetch ---------------------------
    // fetch('https://reqres.in/api/users')
    //   .then( resp => resp.json() )
    //   .then( body => console.log(body.data) );

    //----------------Forma de retornar una promesa con el resultado del fetch

    return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( body => resolve( body.data ) )

    });
  }
}
