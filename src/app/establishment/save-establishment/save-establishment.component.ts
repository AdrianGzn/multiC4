import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { User } from '../../shared/models/user';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { ServiceResponse } from '../../shared/models/service-response';
import { UserService } from '../../shared/services/user.service';
import { AddressResponse } from '../../shared/models/address-response';
import { Address } from '../../shared/models/address';
import { Service } from '../../shared/models/service';
import { Schedule } from '../../shared/models/schedule';
import { ScheduleResponse } from '../../shared/models/schedule-response';
import { EstablishmentResponse } from '../../shared/models/establishment-response';
import { EstablishmentShortResponse } from '../../shared/models/establishment-short-response';
import { EstablishmentGetResponse } from '../../shared/models/establishment-get-response';

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
  services: Service[] = [];

  doctors: User[] = [];

  selectedImage: File | null = null;

  id_schedule: number = 0;
  id_address: number = 0;
  id_establishment: number = 0;
  

  constructor(private generalServices: GeneralServices, private serviceAndEstablishmentData: ServiceAndEstablishmentDataService, private userService: UserService) {
    this.formData = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripción: new FormControl('', [Validators.required]),
      id_tipo_establecimiento: new FormControl(null, [Validators.required]),
      categoria: new FormControl(null, [Validators.required])
    }),
      this.formUbication = new FormGroup({
        calle: new FormControl('', [Validators.required]),
        colonia: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        numero: new FormControl(null, [Validators.required]),
        latitud: new FormControl(null, [Validators.required]),
        longitud: new FormControl(null, [Validators.required])
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
      latitud: this.formUbication.value.latitud,
      longitud: this.formUbication.value.longitud,
      descripcion: this.formUbication.value.descripcion,
      calle: this.formUbication.value.calle,
      colonia: this.formUbication.value.colonia,
      numero: this.formUbication.value.numero
    }

    this.generalServices.createAddress(tempAddress).subscribe({
      next: (item: Address) => {
        this.id_address = item.id_dirección;
        console.log(item);
      },
      error: (error) => {
        console.log('No se pudo crear la dirección');
      }
    })

    let tempSchedule: ScheduleResponse = {
      entrada: this.formSchedule.value.entrada,
      salida: this.formSchedule.value.salida
    }

    this.generalServices.createSchedule(tempSchedule).subscribe({
      next: (item: Schedule) => {
        console.log(item);
        this.id_schedule = item.id_horario;
      },
      error: (error) => {
        console.log('No se pudo crear la dirección');
      }
    });

    let tempEstablishment: EstablishmentResponse = {
      id_tipo_establecimiento: 0,
      descripción: this.formData.value.descripción,
      categoria: this.formData.value.categoria,
      id_dirección: this.id_address,
      id_horario: this.id_schedule,
      nombre: this.formData.value.nombre,
      file: this.selectedImage
    }

    console.log(tempEstablishment);
    

    this.generalServices.createEstablishment(tempEstablishment).subscribe({
      next: (item: EstablishmentShortResponse) => {
        
        this.generalServices.getEstablishment().subscribe({
          next: (itemEstablishments: EstablishmentGetResponse[]) => {
            itemEstablishments.forEach((establishment: EstablishmentGetResponse) => {
              if (item.nombre == establishment.nombre && item.categoria === establishment.categoria && item.id_dirección ===establishment.id_dirección && item.id_horario == establishment.id_horario) {
                this.id_establishment = establishment.id_establecimiento;
                localStorage.setItem('establishment_id', JSON.stringify(this.id_establishment));
                console.log(this.id_establishment);
                
              }
            });
          },
          error: (error) => {
            console.log('No se han podido obtener los establecimientos');
          }
        })

      },
      error: (error) => {
        console.log('No se ha podido crear el establecimiento');
      }
    })
    
  }

  onChangeSelectedImage(file: any): void {
    if (file.target.files.length > 0) {
      this.selectedImage = file.target.files[0];
    }
  }

  addService():void {
    let tempService: ServiceResponse = {
      id_establecimiento: 0,
      tipo: '',
      costo: 0
    }
  }

  
}