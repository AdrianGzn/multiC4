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
import Swal from 'sweetalert2';
import { error } from 'console';
import { serviceAllId } from '../../shared/models/serviceAlId';

@Component({
  selector: 'app-save-establishment',
  templateUrl: './save-establishment.component.html',
  styleUrl: './save-establishment.component.css'
})
export class SaveEstablishmentComponent implements OnInit {

  formData: FormGroup;
  formUbication: FormGroup;
  formSchedule: FormGroup;
  formServices: FormGroup;
  formDoctors: FormGroup;
  userFinal = {
    id_establecimiento:  0, 
    id_rol: 0,
    id_usuario: 0,
    nombre: '',
    rol: ''  
  }
  type_options: any[] = [];
  category_options: string[] = [];
  nameServices: string[] = ["Ortopedia"];
  services: serviceAllId[] = []
  doctors: User[] = [];

  selectedImage: File | null = null;

  id_schedule: number = 0;
  id_address: number = 0;
  id_establishment: number = 0;
    selectedService: any = null;


  constructor(private generalServices: GeneralServices, private serviceAndEstablishmentData: ServiceAndEstablishmentDataService, private userService: UserService) {
    this.formData = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripción: new FormControl('', [Validators.required]),
      id_type_establishment: new FormControl(1, [Validators.required]),
      categoria: new FormControl('', [Validators.required]),
      id_dirección: new FormControl(0),
      id_horario: new FormControl(0)
    });

    this.formUbication = new FormGroup({
      calle: new FormControl('', [Validators.required]),
      colonia: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      numero: new FormControl(null, [Validators.required]),
      latitud: new FormControl(null, [Validators.required]),
      longitud: new FormControl(null, [Validators.required])
    });

    this.formSchedule = new FormGroup({
      entrada: new FormControl(null, [Validators.required]),
      salida: new FormControl(null, [Validators.required]),
    });

    this.formServices = new FormGroup({
      servicio: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
      costo: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
    });

    this.formDoctors = new FormGroup({
      doctor: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
      servicioDoctor: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
    });
  }

  ngOnInit(): void {
    let userCurrent = localStorage.getItem("userData");
    if (userCurrent) {
      this.userFinal = JSON.parse(userCurrent);
    }
    this.generalServices.getTypeEstablishment().subscribe({
      next: (types) => {
        this.type_options = types
      },

      error: (error) => {
        console.log(error)
      }
    })

    this.generalServices.getAllInformtaionServiceById(this.userFinal.id_establecimiento).subscribe({
      next: (service) => {
        this.services = service
      },

      error: (error) => {
        console.log(error)
      }
    })
  }

  onSubmit(): void {
    const formData = new FormData();

    let tempAddress: AddressResponse = {
      latitud: this.formUbication.value.latitud,
      longitud: this.formUbication.value.longitud,
      descripcion: this.formUbication.value.descripcion,
      calle: this.formUbication.value.calle,
      colonia: this.formUbication.value.colonia,
      numero: this.formUbication.value.numero
    };

    this.generalServices.createAddress(tempAddress).subscribe({
      next: (item: Address) => {
        this.id_address = item.id_dirección;
        console.log('Dirección creada:', item);

        this.formData.patchValue({
          id_dirección: this.id_address
        });

        let tempSchedule: ScheduleResponse = {
          entrada: this.formSchedule.value.entrada,
          salida: this.formSchedule.value.salida
        };

        this.generalServices.createSchedule(tempSchedule).subscribe({
          next: (item: Schedule) => {
            console.log('Horario creado:', item);
            this.id_schedule = item.id_horario;
            console.log(this.id_schedule)

            this.formData.patchValue({
              id_horario: this.id_schedule
            });


            Object.keys(this.formData.value).forEach(key => {
              formData.append(key, this.formData.value[key]);
            });

            if (this.selectedImage) {
              formData.append('file', this.selectedImage, this.selectedImage.name);
            }

            formData.forEach((value, key) => {
              console.log(key, value);
            });

            this.generalServices.createEstablishment(formData).subscribe({
              next: (item) => {
                if (item) {
                  let currentUser = localStorage.getItem("userData")
                  if (currentUser) {
                    this.userFinal = JSON.parse(currentUser);
                  }
                  const modifyUser = {
                    "id_establecimiento": item.establishment.id_establecimiento
                  }
                  this.generalServices.changeRecepcionist(modifyUser, this.userFinal.id_usuario).subscribe({
                    next: (item) => {
                      localStorage.setItem("userData", JSON.stringify(item))
                      Swal.fire("Generar establecimiento", "Se logro generar el establecimiento", "success")
                    },
                    error: (error) => {
                      Swal.fire("Generar establecimiento", "No se logro generar el establecimiento", "error")
                    }
                  }
                  )
                }
                localStorage.setItem("establishmentData", JSON.stringify(item.establishment))
                console.log('Establecimiento creado:', item);
              },
              error: (error) => {
                console.log('Error al crear el establecimiento:', error);
              }
            });
          },
          error: (error) => {
            console.log('No se pudo crear el horario:', error);
          }
        });
      },
      error: (error) => {
        console.log('No se pudo crear la dirección:', error);
      }
    });
  }

  selectService(service: any): void {
    this.selectedService = service;
    console.log('Servicio seleccionado:', service);
  }

  onChangeSelectedImage(file: any): void {
    if (file.target.files.length > 0) {
      this.selectedImage = file.target.files[0];
    }
  }

  // Agregar servicio (solo ejemplo, aún no implementado completamente)
  addService(): void {
    let tempService: ServiceResponse = {
      id_establecimiento: 0,
      tipo: '',
      costo: 0
    };
  }

  deleteSelectedImage(input: HTMLInputElement): void {
    this.selectedImage = null; 
    input.value = '';  
  }

  postDoctorOnEstablishment(): void {
    this.generalServices.createService(this.formDoctors.value).subscribe({
      next: (item) => {
        Swal.fire("Generar servicio", "Se genero el servicio", "success")
        this.ngOnInit()
      },

      error: (error) => {
        Swal.fire("General servicio", "No se logro generar servicio", "error")
      }
    })
  }

  postServiceOnEstablishment(): void {
    const service = {
      id_establecimiento: this.userFinal.id_establecimiento,
      tipo: this.formServices.value.servicio,
      costo: this.formServices.value.costo
    }
    console.log(service)
    this.generalServices.createService(service).subscribe({
      next: (item) => {
        console.log(item)
        Swal.fire("Generar servicio", "se logro generar el servicio", "success")
      },

      error: (error) => {
        Swal.fire("Generar servicio", "no se logor generar servicio", "error")
      }
    })
  }

  deleteService(): void {
    this.generalServices.deleteService(this.selectedService.id_service).subscribe({
      next: (item) => {
        Swal.fire("Eliminar servico", "Se logro eliminar el sevicio", "success")
      },

      error: (error) => {
        Swal.fire("Eliminar servicio", "No se logro elimnar el servicio", "error")
      }
    })
  }
}
