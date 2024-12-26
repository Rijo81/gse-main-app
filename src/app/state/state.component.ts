import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppointmentStateModelI } from '../models/state.models';
import { StatesService } from '../services/states/states.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
})
export class StateComponent {
  states: AppointmentStateModelI[] = [];
  data: string= '';
  private alertCtrl: AlertController = inject(AlertController);
  constructor(
    private router: Router,
    private stateService: StatesService
  ) { }

  async addState(){
    console.log('adding state');
    if (this.data !== '') {
      const newState: AppointmentStateModelI = {
        id: '',
        name: this.data,
      };
      await this.stateService.createState(newState);
      this.loadStates();

      const alert = await this.alertCtrl.create({
        header: 'Crear Estado',
        subHeader: 'Su estado fue creado con exito',
        buttons: [
          {
            text: 'Aceptar',
            handler: async () => {
              this.router.navigate(['/tab1']);
            },
          },
        ],
      });
      await alert.present();
    }
  }

  async loadStates() {
    this.states = await this.stateService.getState();
    console.log(this.states);

  }
}
