import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListStatesComponent } from './list-states/list-states.component';
import { StateComponent } from './state.component';
import { StateRoutingModule } from './state-routing.module';


@NgModule({
  declarations: [
    StateComponent,
    ListStatesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StateRoutingModule,
    IonicModule,
    // Importa aquí el IonicModule para usar componentes de Ionic

  ],
  exports:[ListStatesComponent]
})
export class StateModule { }
