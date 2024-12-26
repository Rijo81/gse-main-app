import { Component, ViewEncapsulation } from '@angular/core';
import { IonMenuToggle, IonLabel, IonItem, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { MenuI } from 'src/app/models/menu.models';
import { addIcons } from 'ionicons';
  import * as all from 'ionicons/icons';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [IonIcon, IonItem, IonLabel, IonMenuToggle]
})
export class SidemenuComponent {

  menu: MenuI [];
  constructor(
    private router: Router,
  ) {
    this.initMenu();
    addIcons(all);
  }

  initMenu(){
    this.menu = [
      {name: 'Inicio', enlace: '/segments', icon: 'home'},
      {name: 'Estados', enlace: '/state/list-state', icon: 'list'},
      {name: 'Categorias', enlace: '/list-categories', icon: 'duplicate'},
      {name: 'Tipos de Solicitudes', enlace: '/', icon: 'keypad-outline'},
      {name: 'Usuarios', enlace: '/auth/users', icon: 'people-circle-outline'},
    ];
  }

  navigateMenu(url: any) {
    this.router.navigate([url])
  }

  async closeMenu(){

  }

}
