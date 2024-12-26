import { TypeRequestsI } from './../../models/requests.models';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalstoreService } from 'src/app/services/localstore/localstore.service';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonItem, IonCardContent, IonLabel, IonList, IonRadio, IonInput, IonButton,
  IonSelectOption, IonMenuButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonRadio, IonList, IonLabel, IonCardContent, IonItem, IonCardTitle, IonCardHeader, IonCard, IonContent, IonButtons, IonTitle, IonToolbar, IonHeader,  CommonModule,
    FormsModule, ReactiveFormsModule, IonSelectOption, IonMenuButton ]
})
// IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonRadio, IonButton, IonCheckbox, IonInput, IonLabel, IonItem, IonContent,
//     IonButtons, IonTitle, IonToolbar, IonHeader, IonMenuButton, IonSelect, IonSelectOption,
export class RequestsComponent implements OnInit {
  typeRequests: TypeRequestsI[] = [];
  selectedTypeId: number | null = null;
  selectedType: TypeRequestsI | null = null;
  formData: { [key: string]: any } = {};
  requests: any[] = [];

  constructor() {
    this.loadTypeRequests();
    this.loadRequests();
  }
  ngOnInit() {
    const stored = localStorage.getItem('requests');
    if (stored) {
      this.requests = JSON.parse(stored);
    }

    console.log('Loaded categories:', this.requests);
  }

  loadTypeRequests() {
    const stored = localStorage.getItem('requestTypes');
    if (stored) {
      this.typeRequests = JSON.parse(stored);
    }
  }

  loadRequests() {
    const stored = localStorage.getItem('requests');
    if (stored) {
      this.requests = JSON.parse(stored);
    }
  }

  onTypeChange() {
    this.selectedType = this.typeRequests.find(type => type.id === this.selectedTypeId) || null;
    this.formData = {};
  }

  clearLocalStorage(){
    localStorage.removeItem('requests');
  }

  onFileChange(event: any, fieldName: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.formData[fieldName] = reader.result; // Guardamos la base64 del archivo.
      };
      reader.readAsDataURL(file);
    }
  }

  saveRequest() {
    const newRequest = {
      id: Date.now(),
      typeName: this.selectedType?.name,
      formData: { ...this.formData }
    };
    this.requests.push(newRequest);
    this.saveToLocalStorage();
    this.formData = {};
    this.selectedTypeId = null;
  }

  saveToLocalStorage() {
    localStorage.setItem('requests', JSON.stringify(this.requests));
    const stored = localStorage.getItem('requests');
    console.log('resultados: ', stored);

  }
}

// requestTypes: any[] = [];
// requestForm: FormGroup;
// selectedType: any = null;

// constructor(
//   private fb: FormBuilder,
//   private localStorageService: LocalstoreService
// ) {}

// ngOnInit() {
//   this.requestTypes = this.localStorageService.get('requestTypes') || [];
//   this.requestForm = this.fb.group({
//     type: ['', Validators.required],
//     fields: this.fb.group({})
//   });
// }

// onTypeChange(event: any): void {
//   const typeId = event.detail.value;
//   this.selectedType = this.requestTypes.find(type => type.name === typeId);
//   const group: any = {};
//   this.selectedType.fields.forEach((field: any) => {
//     const validators = field.required ? [Validators.required] : [];
//     group[field.label] = ['', validators];
//   });
//   this.requestForm.setControl('fields', this.fb.group(group));
// }

// saveRequest(): void {
//   const requests = this.localStorageService.get('requests') || [];
//   requests.push(this.requestForm.value);
//   this.localStorageService.set('requests', requests);
//   this.requestForm.reset();
//   this.requestForm.setControl('fields', this.fb.group({}));
// }



















  // requestsForm: FormGroup;
  // typeRequests: TypeRequestsI[] = []; // Deberías obtener esto desde el servicio o almacenamiento

  // constructor(private fb: FormBuilder, private localStorageService: LocalstoreService) {
  //   this.requestsForm = this.fb.group({
  //     type: [''],
  //     fields: this.fb.array([]),
  //   });
  // }

  // get fields() {
  //   return (this.requestsForm.get('fields') as FormArray);
  // }

  // // Método para inicializar los campos basados en el tipo de solicitud seleccionado
  // onTypeRequestsChange(type: TypeRequestsI ) {
  //   this.fields.clear(); // Limpiar campos previos
  //   type.fields.forEach(field => {
  //     this.fields.push(this.fb.group({
  //       name: [field.name],
  //       type: [''],
  //       //options: field.options ? field.options : [],
  //     }));
  //   });
  // }

  // saveRequests() {
  //   const requests = this.localStorageService.get('requests') || [];
  //   requests.push(this.requestsForm.value);
  //   this.localStorageService.set('requests', requests);
  //   this.requestsForm.reset();
  //   this.requestsForm.setControl('fields', this.fb.group({}));
  //   console.log(this.requestsForm.value);
  // }
