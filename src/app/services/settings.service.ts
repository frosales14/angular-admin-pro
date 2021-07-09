import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  
  private linkTheme = document.querySelector('#theme');
  private url: string = '';

  constructor() {
    this.url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href',this.url);
  }

  changeTheme( tema: string ){

    const url = `./assets/css/colors/${tema}.css`;
    this.linkTheme?.setAttribute('href',url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const link = document.querySelectorAll('.selector');
    link.forEach(  ele => {
      ele.classList.remove('working');
      const btnTheme = ele.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const btnCurrentTheme = this.linkTheme?.getAttribute('href');
      
      if( btnThemeUrl === btnCurrentTheme ){
        ele.classList.add('working');
      }
      
    });
  }
}
