import { environment } from "src/environments/environment";

export class Usuario {
    
    private rutaUrl = environment.base_url;

    constructor(
        public nombre      : string,
        public password    : string,
        public role        :  string,
        public email       : string,
        public google     ?: boolean,
        public img        ?: string,
        public uid        ?: string,
    ){ }

    get imagenUrl(){
        if(this.img?.includes('https')){
            return this.img;
        }

        if( this.img ){
            return `${this.rutaUrl}/upload/usuarios/${this.img}`
        }else{
            return `${this.rutaUrl}/upload/usuarios/no-image`
        }
    }

}