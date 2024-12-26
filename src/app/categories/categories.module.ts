import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { IonicModule, IonMenu } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SidemenuComponent } from '../components/sidemenu/sidemenu.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    IonicModule,
    FormsModule,

  ],
})
export class CategoriesModule { }
