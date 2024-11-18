import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { ScheduleResponse } from '../../shared/models/schedule-response';
import { Schedule } from '../../shared/models/schedule';
import { error, log } from 'console';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { Establishment } from '../../shared/models/establishment';
import { EstablishmentResponse } from '../../shared/models/establishment-response';
import { Address } from '../../shared/models/address';
import { AddressResponse } from '../../shared/models/address-response';

@Component({
  selector: 'app-generate-establishment',
  templateUrl: './generate-establishment.component.html',
  styleUrl: './generate-establishment.component.css'
})
export class GenerateEstablishmentComponent implements OnInit{
  constructor(private generalService: GeneralServices, private userService: UserService) {}

  myUser: User = {
    id_usuario: 0,
    id_rol: 0,
    nombre: '',
    id_establecimiento: 0,
    id_servicio: 0
  }

  myEstablishment: Establishment = {
    id_establishment: 0,
    id_tipo_establecimiento: 0,
    descripción: '',
    categoria: '',
    id_dirección: 0,
    id_horario: 0,
    nombre: ''
  }

  mySchedule: Schedule = {
    id_horario: 0,
    entrada: '',
    salida: '',
  }

  myAddress: Address = {
    id_dirección: 0,
    latitud: 0,
    longitud: 0,
    descripcion: '',
    calle: '',
    colonia: '',
    numero: 0
  }

  ngOnInit(): void {
    this.myUser = this.userService.getUser();
  }

  generateSchedule(): void {
    let tempSchedule: ScheduleResponse = {
      entrada: '',
      salida: ''
    }

    this.generalService.createSchedule(tempSchedule).subscribe({
      next: (response: Schedule) => {
        this.mySchedule = response;
        console.log('Horario creado con éxito');
        
      },
      error: (error) => {
        console.log('No se ha podido crear el horario.');
        console.log(error);
      }
    })

  }
  
  generateAddress(): void {
    let tempAddress: AddressResponse = {
      latitud: 0,
      longitud: 0,
      descripcion: '',
      calle: '',
      colonia: '',
      numero: 0
    }
    this.generalService.createAddress(tempAddress).subscribe({
      next: (data: Address) => {
        this.myAddress = data;
      },
      error: (error) => {
        console.log('No se ha podido crear una dirección.');
        console.log(error);
      }
    })
  }

  generateEstablishment(): void {
    let tempEstablishment: EstablishmentResponse = {
      id_tipo_establecimiento: 1,
      descripción: '',
      categoria: '',
      id_dirección: this.myAddress.id_dirección,
      id_horario: this.mySchedule.id_horario,
      nombre: ''
    }

    this.generalService.createEstablishment(tempEstablishment).subscribe({
      next: (data: EstablishmentResponse) => {
        console.log('establecimiento creado');
        console.log(this.myEstablishment);
      },
      error: (error) => {
        console.log('No se ha podido crear el horario.');
        console.log(error);
      }
    })
  }

}