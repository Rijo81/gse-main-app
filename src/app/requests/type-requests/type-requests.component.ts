import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesI } from 'src/app/models/category.models';
import { FieldsRequestsI, TypeRequestsI } from 'src/app/models/requests.models';
import { RolsI } from 'src/app/models/rols.models';
import { LocalstoreService } from 'src/app/services/localstore/localstore.service';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonItem, IonLabel, IonList, IonButton, IonSelectOption,
  IonMenuButton, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-type-requests',
  templateUrl: './type-requests.component.html',
  styleUrls: ['./type-requests.component.scss'],
  standalone: true,
  imports: [IonInput, IonButton, IonList, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader,
    IonCard, IonContent, IonButtons, IonTitle, IonToolbar, IonHeader,  CommonModule, FormsModule,
    ReactiveFormsModule, IonSelectOption, IonMenuButton]
})
export class TypeRequestsComponent implements OnInit {
  // IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonButtons, IonCheckbox, IonButton, IonList, IonInput, IonLabel, IonItem, IonContent, IonTitle, IonToolbar,
  // IonHeader, IonSelect, IonSelectOption, FormsModule, CommonModule, ReactiveFormsModule, IonMenuButton
  typeRequests: TypeRequestsI[] = [];
  categories: CategoriesI[] = [];
  rols: RolsI[] = [];
  newTypeRequest: TypeRequestsI = {
    id: Date.now(),
    name: '',
    fields: [],
    category: undefined,
    rols: undefined,
   };

  constructor() {
    this.loadTypeRequests();
    console.log('Categorias -> ', this.categories);
    console.log('Roles -> ', this.rols);

  }

  ngOnInit() {
    const savedCategories = localStorage.getItem('categories');
    const savedRols = localStorage.getItem('rols');

    if (savedCategories) {
      this.categories = JSON.parse(savedCategories);
    }

    if (savedRols) {
      this.rols = JSON.parse(savedRols);
    }

    console.log('Loaded categories:', this.categories);
    console.log('Loaded roles:', this.rols);
  }
  addField() {
    this.newTypeRequest.fields.push({ name: '', type: 'string' });
  }

  removeField(index: number) {
    this.newTypeRequest.fields.splice(index, 1);
  }

  saveTypeRequest() {
    if (!this.newTypeRequest.name.trim()) {
      alert('Nombre tipo solicitud no puede estar vacio.');
      return;
    }

    const fieldNames = this.newTypeRequest.fields.map(field => field.name.trim());
    if (new Set(fieldNames).size !== fieldNames.length) {
      alert('Field names must be unique.');
      return;
    }

    this.typeRequests.push({ ...this.newTypeRequest });
    this.saveToLocalStorage();
    this.newTypeRequest = {
      id: Date.now(),
      name: '',
      fields: [],
      category: undefined,
      rols: undefined,
     };
  }

  onFieldTypeChange(field: FieldsRequestsI) {
    if (field.type === 'list' || field.type === 'radiobutton') {
      if (!field.options) {
        field.options = [];
      }
    } else {
      delete field.options;
    }
  }

  addOption(field: FieldsRequestsI) {
    field.options?.push('');
  }

  removeOption(field: FieldsRequestsI, index: number) {
    field.options?.splice(index, 1);
  }

  loadTypeRequests() {
    const stored = localStorage.getItem('requestTypes');
    if (stored) {
      this.typeRequests = JSON.parse(stored);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('requestTypes', JSON.stringify(this.typeRequests));
  }
  // typeRequestsForm: FormGroup;
  // typeRequests: TypeRequestsI[] = [];

  // constructor(private fb: FormBuilder, private localStorageService: LocalstoreService) {
  //   this.typeRequestsForm = this.fb.group({
  //     name: ['', Validators.required],
  //     fields: this.fb.array([]),
  //   });
  // }

  // get fields() {
  //   return (this.typeRequestsForm.get('fields') as FormArray);
  // }

  // addFields() {
  //   this.fields.push(this.fb.group({
  //     name: ['', Validators.required],
  //     type: ['', Validators.required],
  //     options: ['']  // Solo si el campo es 'lista' o 'radiobutton'
  //   }));
  // }

  // delFields(index: number) {
  //   this.fields.removeAt(index);
  // }

  // saveTypeRequests() {
  //   const newTypeRequests: TypeRequestsI = {
  //     id: this.typeRequests.length + 1,
  //     //category: this.typeRequests.value.category,
  //     name: this.typeRequestsForm.value.name,
  //     fields: this.typeRequestsForm.value.fields,
  //   };

  //   const requestTypes = this.localStorageService.get('requestTypes') || [];
  //   requestTypes.push(newTypeRequests);
  //   this.localStorageService.set('requestTypes', requestTypes);
  //   //this.typeRequests.push(newTypeRequests);
  //   this.typeRequestsForm.reset();
  //   this.typeRequestsForm.setControl('fields', this.fb.array([]));
  //   console.log(this.localStorageService.get('requestTypes'));
  // }
  // requestTypeForm: FormGroup;

  // constructor(private fb: FormBuilder, private localStorageService: LocalstoreService) {
  //   this.requestTypeForm = this.fb.group({
  //     name: ['', Validators.required],
  //     fields: this.fb.array([])
  //   });
  // }

  // get fields(): FormArray {
  //   return this.requestTypeForm.get('fields') as FormArray;
  // }

  // newField(): FormGroup {
  //   return this.fb.group({
  //     label: ['', Validators.required],
  //     type: ['', Validators.required],
  //     required: [false],
  //     options: ['']
  //   });
  // }

  // addField(): void {
  //   this.fields.push(this.newField());
  // }

  // removeField(index: number): void {
  //   this.fields.removeAt(index);
  // }

  // saveRequestType(): void {
  //   const requestTypes = this.localStorageService.get('requestTypes') || [];
  //   requestTypes.push(this.requestTypeForm.value);
  //   this.localStorageService.set('requestTypes', requestTypes);
  //   this.requestTypeForm.reset();
  //   this.requestTypeForm.setControl('fields', this.fb.array([]));
  //   console.log(this.localStorageService.get('requestTypes'));

  // }
}
