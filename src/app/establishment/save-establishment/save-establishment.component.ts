import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { serviceEstablishment } from '../../shared/models/serviceEstablishment';
import { User } from '../../shared/models/user';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { ServiceResponse } from '../../shared/models/service-response';
import { error } from 'console';
import { Establishment } from '../../shared/models/establishment';
import { UserService } from '../../shared/services/user.service';
import { AddressResponse } from '../../shared/models/address-response';
import { Address } from '../../shared/models/address';
import { Service } from '../../shared/models/service';

@Component({
  selector: 'app-save-establishment',
  templateUrl: './save-establishment.component.html',
  styleUrl: './save-establishment.component.css'
})
export class SaveEstablishmentComponent implements OnInit {
  userFinal = {};

  formData: FormGroup;
  formUbication: FormGroup;
  formSchedule: FormGroup;
  formServices: FormGroup;
  formDoctors: FormGroup;

  type_options: string[] = [];
  category_options: string[] = [];

  nameServices: string[] = [];
  services: Service[] = []
  doctors: User[] = [];



  constructor(private generalServices: GeneralServices, private serviceAndEstablishmentData: ServiceAndEstablishmentDataService, private userService: UserService) {
    this.formData = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripción: new FormControl('', [Validators.required]),
      id_tipo_establecimiento: new FormControl(null, [Validators.required]),
      id_categoria_establecimiento: new FormControl(null, [Validators.required])
    }),
      this.formUbication = new FormGroup({
        calle: new FormControl('', [Validators.required]),
        colonia: new FormControl('', [Validators.required]),
        numero: new FormControl(null),
        latitud: new FormControl(null),
        longitud: new FormControl(null)
      }),
      this.formSchedule = new FormGroup({
        entrada: new FormControl(null, [Validators.required]),
        salida: new FormControl(null, [Validators.required]),
      }),
      this.formServices = new FormGroup({
        servicio: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
        costo: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
      }),
      this.formDoctors = new FormGroup({
        doctor: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
        servicioDoctor: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
      })
  }

  ngOnInit(): void {
    let userCurrent = localStorage.getItem("userData"); 
    if(userCurrent) {
      this.userFinal = JSON.parse(userCurrent);
    } 
  }

  onSubmit(): void {
    let tempAddress: AddressResponse = {
      latitud: 0,
      longitud: 0,
      descripcion: '',
      calle: '',
      colonia: '',
      numero: 0
    }
    this.generalServices.createAddress(tempAddress).subscribe({
      next: (item) => {
        console.log(item);
      },
      error: (error) => {
        console.log('No se pudo crear la dirección');
      }
    })
  }

  onChangeSelectedImage(event: Event): void {

  }

  addService():void {

  }
}