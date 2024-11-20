import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { serviceEstablishment } from '../../shared/models/serviceEstablishment';
import { User } from '../../shared/models/user';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { ServiceResponse } from '../../shared/models/service-response';

@Component({
  selector: 'app-save-establishment',
  templateUrl: './save-establishment.component.html',
  styleUrl: './save-establishment.component.css'
})
export class SaveEstablishmentComponent implements OnInit {
  type_options: string[] = ['hola'];
  formData: FormGroup;
  formUbication: FormGroup;
  formSchedule: FormGroup;
  formServices: FormGroup;
  formDoctors: FormGroup;
  selectedImage: File | null = null;
  userFinal: any | null = {}
  services: serviceEstablishment[] = [];
  doctors: User[] = [];
  optionDoctors: string[] = [];

  constructor(private generalServices: GeneralServices, private serviceAndEstablishmentData: ServiceAndEstablishmentDataService) {
    let userCurrent = localStorage.getItem("userData"); 
    if(userCurrent) {
      this.userFinal = JSON.parse(userCurrent);
    }

    this.formData = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripción: new FormControl('', [Validators.required]),
      id_tipo_establecimiento: new FormControl(null, [Validators.required]),
      categoria: new FormControl(null, [Validators.required])
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
    this.generalServices.getServices().subscribe({
      next: (item: serviceEstablishment[]) => {
        item.forEach((service: serviceEstablishment) => {
          if (service.id_establishment === this.userFinal.data_user.id_establishment) {
            this.services.push(service);
          }
        });
        console.log(this.services);
        
      },
      error: (error) => {
        console.log('No se ha podido obtener los servicios del hospital');
        console.log(error);
      }
    });
  }

  onChangeSelectedImage(file: any): void {
    if (file.target.files.length > 0) {
      this.selectedImage = file.target.files[0];
    }
  }

  onChangeSelectService(idServiceSelected: number): void {
    this.generalServices.getDoctorByService(idServiceSelected).subscribe({
      next: (item) => {
        item.forEach((data: any) => {
          this.doctors.push(data);
          this.optionDoctors.push(data.name);
        });
      },
      error: (error) => {
        console.log('No se han podido obtener los doctores del servicio especificado');
        console.log(error);
      }
    })
  }

  addService() {
    let nombre = this.formServices.value.servicio;
    let costo = this.formServices.value.costo;

    let data: ServiceResponse = {
      id_establecimiento: this.serviceAndEstablishmentData.getEstablishment().id_establishment,
      tipo: nombre,
      costo: costo
    }

    this.generalServices.createService(data).subscribe({
      next: (item: any) => {
        this.services.push(item);
      },
      error: (error) => {
        console.log('Ha ocurrido un error al crear el servicio');
        console.log(error);
      }
    })
  }

  onSubmit() {
    
  }
}