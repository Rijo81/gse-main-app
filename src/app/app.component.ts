import { Component } from '@angular/core';
import {  Platform } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { FcmService } from './services/fcm/fcm.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import * as all from 'ionicons/icons';
import { MenuI } from './models/menu.models';

register()
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  menu: MenuI [];

  constructor(private platform: Platform,
    private router: Router,
    private fcm: FcmService) {

    this.platform.ready().then(() => {
      document.body.classList.remove('dark');

      this.fcm.initPush().then();
    }).catch((e: any) => {
      console.log(e);
    })
    this.initMenu();
    addIcons(all);
  }

  initMenu(){
    this.menu = [
      {name: 'Inicio', enlace: '/segments', icon: 'home'},
      {name: 'Estados', enlace: '/state/list-state', icon: 'list'},
      {name: 'Categorias', enlace: '/list-categories', icon: 'duplicate'},
      {name: 'Tipos de Solicitudes', enlace: '/type-requests', icon: 'keypad-outline'},
      {name: 'Solicitudes', enlace: '/requests', icon: 'send'},
      {name: 'Roles', enlace: '/rols', icon: 'settings'},
      {name: 'Usuarios', enlace: '/auth/users', icon: 'people-circle-outline'},
    ];
  }

  navigate(url: any) {
    this.router.navigate([url])
  }

  navigateTo(){

  }

  logout(){

  }
}
