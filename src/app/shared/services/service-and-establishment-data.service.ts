import { Injectable } from '@angular/core';
import { Establishment } from '../models/establishment';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceAndEstablishmentDataService {
  constructor() { }

  currentEstablishment: Establishment = {
    id_establishment: 0,
    id_tipo_establecimiento: 0,
    descripción: '',
    categoria: '',
    id_dirección: 0,
    id_horario: 0,
    nombre: ''
  }

  currentService: Service = {
    id_servicio: 0,
    id_stablishment: 0,
    tipo: '',
    costo: 0
  }

  selectEstablishment(establishment: Establishment): boolean {
    let status = false
    
    try {
      this.currentEstablishment = establishment;
      status = true;
    } catch {
      console.log('error al guardar datos');
      status = false
    }

    return status;
  }

  selectService(service: Service): boolean {
    let status = false
    
    try {
      this.currentService = service;
      status = true;
    } catch {
      console.log('error al guardar datos');
      status = false
    }

    return status;
  }

  getEstablishment(): Establishment {
    return this.currentEstablishment;
  }

  getService(): Service {
    return this.currentService;
  }

  clearEstablishment(): boolean {
    let estatus = false;

    try {
      this.currentEstablishment = {
        id_establishment: 0,
        id_tipo_establecimiento: 0,
        descripción: '',
        categoria: '',
        id_dirección: 0,
        id_horario: 0,
        nombre: ''
      }
      estatus = true
    } catch {
      console.log('error al limpiar los datos');
      estatus = false
    }

    return estatus;
  }

  clearService(): boolean {
    let estatus = false;

    try {
      this.currentService = {
        id_servicio: 0,
        id_stablishment: 0,
        tipo: '',
        costo: 0
      }
      estatus = true
    } catch {
      console.log('error al limpiar los datos');
      estatus = false
    }

    return estatus;
  }

  clearAll() {
    let estatus = false;

    try {
      this.currentService = {
        id_servicio: 0,
        id_stablishment: 0,
        tipo: '',
        costo: 0
      }

      this.currentEstablishment = {
        id_establishment: 0,
        id_tipo_establecimiento: 0,
        descripción: '',
        categoria: '',
        id_dirección: 0,
        id_horario: 0,
        nombre: ''
      }
      
      estatus = true
    } catch {
      console.log('error al limpiar los datos');
      estatus = false
    }

    return estatus;
  }
}
