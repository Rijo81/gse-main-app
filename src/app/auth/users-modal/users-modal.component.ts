import { CommonModule } from '@angular/common';
import { Component, Input, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  ModalController } from '@ionic/angular';
import { RolsI } from 'src/app/models/rols.models';
import { IonInput, IonToolbar, IonBackButton, IonButtons, IonContent, IonImg, IonLabel, IonList,
  IonItem, IonIcon, IonButton, IonSelectOption } from "@ionic/angular/standalone";

@Component({
  selector: 'app-users-modal',
  templateUrl: './users-modal.component.html',
  styleUrls: ['./users-modal.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonItem, IonList, IonLabel, IonImg, IonContent, IonButtons,
    IonBackButton, IonToolbar, IonInput, FormsModule, CommonModule,
    IonSelectOption ]
})
export class UsersModalComponent implements OnInit {

  customPopoverOptions = {
    header: 'Tipo de Usuarios',
    subHeader: 'Roles',
    message: 'Seleccione el rol a asignar',
  };
  rols: RolsI[] = [];
  image: string = '../../../assets/logo.png';

  @Input() dataRegisterUser: { id_user: string; name: string; email: string, rol: string, password: string }[] = [];
    name: string = '';
    email: string = '';
    selectRol: string = '';
    pass: string = '';

    constructor(private modalCtrl: ModalController) {}
    ngOnInit() {
      const storedRoles = localStorage.getItem('rols');
      if (storedRoles) {
        this.rols = JSON.parse(storedRoles);  // Convertir el JSON a un objeto de tipo Role[]
      }

    }
    closeModal() {
      this.modalCtrl.dismiss();
    }

    createUser() {
      if (this.name || this.email || this.pass) {
        const newUser = {
          name: this.name,
          email: this.email,
          rol: this.selectRol,
          password: this.pass,
        };
        this.modalCtrl.dismiss(newUser);
      } else {
        alert('Completa todos los campos');
      }
    }

}
