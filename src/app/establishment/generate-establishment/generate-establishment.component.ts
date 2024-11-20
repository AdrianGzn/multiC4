import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { ScheduleResponse } from '../../shared/models/schedule-response';
import { Schedule } from '../../shared/models/schedule';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { Establishment } from '../../shared/models/establishment';
import { EstablishmentResponse } from '../../shared/models/establishment-response';
import { Address } from '../../shared/models/address';
import { AddressResponse } from '../../shared/models/address-response';

@Component({
  selector: 'app-generate-establishment',
  templateUrl: './generate-establishment.component.html',
  styleUrls: ['./generate-establishment.component.css']
})
export class GenerateEstablishmentComponent implements OnInit {
  constructor(private generalService: GeneralServices, private userService: UserService) {}

  myUser: User = {
    id_usuario: 0,
    id_rol: 0,
    nombre: '',
    id_establecimiento: 0,
    id_servicio: 0
  };

  myEstablishment: Establishment = {
    id_establishment: 0,
    id_tipo_establecimiento: 0,
    descripción: '',
    categoria: '',
    id_dirección: 0,
    id_horario: 0,
    nombre: ''
  };

  mySchedule: Schedule = {
    id_horario: 0,
    entrada: '',
    salida: ''
  };

  myAddress: Address = {
    id_dirección: 0,
    latitud: 0,
    longitud: 0,
    descripcion: '',
    calle: '',
    colonia: '',
    numero: 0
  };

  selectedImage: File | null = null;

  ngOnInit(): void {
    this.myUser = this.userService.getUser();
  }

  generateAll(): void {
    if (!this.haveEstablishment()) {
      const tempSchedule: ScheduleResponse = {
        entrada: '',
        salida: ''
      };

      this.generalService.createSchedule(tempSchedule).subscribe({
        next: (nextSchedule: Schedule) => {
          this.mySchedule = nextSchedule;
          console.log('Horario creado:', nextSchedule);

          const tempAddress: AddressResponse = {
            latitud: 0,
            longitud: 0,
            descripcion: '',
            calle: '',
            colonia: '',
            numero: 0
          };

          this.generalService.createAddress(tempAddress).subscribe({
            next: (address: Address) => {
              this.myAddress = address;
              console.log('Dirección creada:', address);

              const formData = new FormData();
              formData.append('id_dirección', address.id_dirección.toString());
              formData.append('id_horario', nextSchedule.id_horario.toString());
              formData.append('id_tipo_establecimiento', '1');
              formData.append('descripción', '');
              formData.append('categoria', '');
              formData.append('nombre', '');

              if (this.selectedImage) {
                formData.append('file', this.selectedImage, this.selectedImage.name);
              }

              this.generalService.createEstablishment(formData).subscribe({
                next: (establishment: Establishment) => {
                  this.myEstablishment = establishment;
                  console.log('Establecimiento creado:', establishment);

                  const editPerson = {
                    id_establecimiento: establishment.id_establishment
                  };

                  this.generalService.editRecepcionist(this.myUser.id_usuario, editPerson).subscribe({
                    next: () => {
                      console.log('Recepcionista actualizada correctamente');
                      alert('Se logró completar el registro');
                    },
                    error: (err) => {
                      console.log('Error al actualizar la recepcionista:', err);
                    }
                  });
                },
                error: (err) => {
                  console.log('Error al crear el establecimiento:', err);
                }
              });
            },
            error: (err) => {
              console.log('Error al crear la dirección:', err);
            }
          });
        },
        error: (err) => {
          console.log('Error al crear el horario:', err);
        }
      });
    } else {
      console.log('La recepcionista ya tiene un establecimiento asignado');
    }
  }

  onChangeSelectedImage(file: any): void {
    if (file.target.files.length > 0) {
      this.selectedImage = file.target.files[0];
    }
  }

  haveEstablishment(): boolean {
    return this.myUser.id_establecimiento !== null && this.myUser.id_establecimiento !== 0;
  }
}
