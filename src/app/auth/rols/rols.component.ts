import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { RolsI } from 'src/app/models/rols.models';
import { OverlayEventDetail } from '@ionic/core/components';
import { RolsService } from 'src/app/services/rols/rols.service';
import { UserService } from 'src/app/services/user/user.service';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonLabel, IonAvatar,
  IonPopover, IonButton, IonItem, IonList, IonReorderGroup, IonIcon, IonFab,
  IonFabButton, IonMenuButton, IonModal } from "@ionic/angular/standalone";

@Component({
  selector: 'app-rols',
  templateUrl: './rols.component.html',
  styleUrls: ['./rols.component.scss'],
  standalone: true,
  imports: [IonModal,  IonFabButton, IonFab, IonIcon, IonReorderGroup, IonList, IonItem, IonButton,
     IonPopover, IonAvatar, IonLabel, IonContent, IonButtons, IonTitle, IonToolbar,
    IonHeader,  FormsModule, CommonModule, ReactiveFormsModule, IonMenuButton ]
})
export class RolsComponent  implements OnInit {

  isLoading = false
   isClosePopoverOpen = false

   userProfile?: string;
   user: any;
   presentingElement: any = null;

   rols: RolsI[] = [];
   rolsInput = {
      name: '',
      permition_categories: false,
      permition_states: false,
      permition_users: false,
      permition_requests: false,
      permition_viewsolic: false
   }

   constructor(private rolsService: RolsService,
     private alertCtrl: AlertController,
     private router: Router,
     private userService: UserService) {

     this.loadRols();
   }

   @ViewChild(IonModal) modal: IonModal;

   cancel() {
     this.modal.dismiss(null, 'cancel');
   }

   confirm() {
     this.modal.dismiss(this.addRole(),  'confirm');
   }
   async addRole() {
    if (this.rolsInput.name.trim()) {
      console.log('Esto es el if rolsinput' ,this.rolsInput.name.trim());

      const newRols: RolsI = {
        id: '',
        name: this.rolsInput.name,
        permition_categories:  this.rolsInput.permition_categories,
        permition_states: this.rolsInput.permition_states,
        permition_users: this.rolsInput.permition_users,
        permition_requests: this.rolsInput.permition_requests,
        permition_viewsolic: this.rolsInput.permition_viewsolic
      };

      await this.rolsService.createRol(newRols);

      this.rolsInput = {
        name: '',
        permition_categories: false,
        permition_states: false,
        permition_users: false,
        permition_requests: false,
        permition_viewsolic: false
      };

    }
  }

   onWillDismiss(event: Event) {
     const ev = event as CustomEvent<OverlayEventDetail<string>>;
     if (ev.detail.role === 'confirm') {
       //this.message = `Hello, ${ev.detail.data}!`;
       console.log(`Hello, ${ev.detail.data}!`);
       this.loadRols();

     }
   }

   @ViewChild('popover') popover: any;
   ngOnInit() {
     this.presentingElement = document.querySelector('.ion-page');

     this.userProfile = this.userService.userProfileImage
     this.user = this.userService.user
   }

   presentClosePopover(e: Event) {
     this.popover.event = e;
     this.isClosePopoverOpen = true;
   }
   navigate(url: any) {
     this.router.navigate([url])
   }

   async closeSession() {
     try {
       this.isClosePopoverOpen = false
       this.isLoading = true
       await this.userService.logout()
       this.router.navigateByUrl('/auth', { replaceUrl: true });
     } catch (error) {

     } finally {
       this.isLoading = false
     }
   }

   handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
     console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
     ev.detail.complete();
   }
   async loadRols() {
     this.rols = await this.rolsService.getRols();
     console.log(this.rols);

   }

   async updateRole(rol: RolsI) {
    console.log('Esto es el if rolsinput' ,this.rolsInput.name.trim());
    if (rol.name.trim()) {
      const newRols: RolsI = {
        id: rol.id,
        name: rol.name,
        permition_categories:  rol.permition_categories,
        permition_states: rol.permition_states,
        permition_users: rol.permition_users,
        permition_requests: rol.permition_requests,
        permition_viewsolic: rol.permition_viewsolic
      };
      //const newRols = this.rols;
      // const updatedRol = { ...rol, name: data.name };
      // await this.rolsService.editRol(rol.id, updatedRol);
      await this.rolsService.editRol(rol.id, newRols);
      this.rolsInput = {
        name: '',
        permition_categories: false,
        permition_states: false,
        permition_users: false,
        permition_requests: false,
        permition_viewsolic: false
      };

    }
  }
   async updateRol(rol: RolsI){
     const alert = await this.alertCtrl.create({
       header: 'Editar Roles',
       inputs: [
         { name: 'rol',
           type: 'text',
           placeholder: 'Nombre del Rol',
           value: rol.name },

           {
            name: 'pcategories',
            type: 'checkbox',
            label: 'Opción 2',
            value: rol.permition_categories,
            checked: this.rolsInput.permition_categories, // Vincular al modelo
          },
          {
            name: 'pstates',
            type: 'checkbox',
            label: 'Opción 2',
            value: rol.permition_states,
            checked: this.rolsInput.permition_states, // Vincular al modelo
          },
          {
            name: 'pusers',
            type: 'checkbox',
            label: 'Opción 2',
            value: rol.permition_users,
            checked: this.rolsInput.permition_users, // Vincular al modelo
          },
          {
            name: 'pcategories',
            type: 'checkbox',
            label: 'Opción 2',
            value: rol.permition_viewsolic,
            checked: this.rolsInput.permition_viewsolic, // Vincular al modelo
          },
          {
            name: 'prequests',
            type: 'checkbox',
            label: 'Opción 2',
            value: rol.permition_requests,
            checked: this.rolsInput.permition_requests, // Vincular al modelo
          },
       ],
       buttons: [
         { text: 'Cancelar',
           role: 'cancel' },
         {
           text: 'Actualizar',
             handler: async (data) => {
              //permition_categories?: boolean;
  // permition_states?: boolean;
  // permition_users?: boolean;
  // permition_requests?: boolean;
  // permition_viewsolic?: boolean;
               const updatedRol = { ...rol,
                name: data.name,
                permition_categories: data.permition_categories,
                permition_states: data.permition_states,
                permition_users: data.permition_users,
                permition_viewsolic: data.permition_viewsolic,
                permition_requests: data.permition_requests,
               };
               await this.rolsService.editRol(rol.id, updatedRol);
               console.log(data.id);
               this.loadRols();
               console.log(this.loadRols());

           },
         },
       ],
     });
     await alert.present();
   }

   async delRol(id: string) {
     const alert = await this.alertCtrl.create({
       header: 'Eliminar Rol',
       subHeader: 'Esta segurdo de eliminar el Rol',
       buttons: [
         { text: 'Cancelar', role: 'cancel' },
         {
           text: 'Eliminar',
           handler: async () => {
             await this.rolsService.deleteRol(id);
             this.loadRols();
           },
         },
       ],
     });
     await alert.present();
   }
}
