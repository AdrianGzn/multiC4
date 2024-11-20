import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { Establishment } from '../../shared/models/establishment';
import { serviceEstablishment } from '../../shared/models/serviceEstablishment';
import { GeneralServices } from '../../shared/services/general-services.service';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { establishmentResponseWith } from '../../shared/models/establishmentResponseWith';

@Component({
  selector: 'app-details-establishment',
  templateUrl: './details-establishment.component.html',
  styleUrls: ['./details-establishment.component.css']
})
export class DetailsEstablishmentComponent implements OnInit{
  idEstablishment: number = 0
  dataEstablishment: Establishment = {
    id_establishment: 0,
    id_tipo_establecimiento: 0,
    descripción: '',
    categoria: '',
    id_dirección: 0,
    id_horario: 0,
    nombre: ''
  }

  serviceEstablishment: establishmentResponseWith = {
    id_establishment: 0,
    nameEstablishment: '',
    descripcion: '',
    horario: {
      entrada:'',
      salida: ''
    },
    direccion: {
      calle: '',
      colonia: '',
      numero: ''
    },
    servicios: [{
      id_service: 0,
      service: '',
      costo: 0
    }],
  };
  constructor(private router: Router, private generalServices: GeneralServices, private serviceAndEstablishmentData: ServiceAndEstablishmentDataService, private getId: SharedDataService) {}

  ngOnInit(): void {
    this.getId.id$.subscribe(
      id => {
        this.idEstablishment = id;
        console.log(id)
      }
    )
    this.dataEstablishment = this.serviceAndEstablishmentData.getEstablishment();
    
    this.generalServices.getServiceEstablishemnt(this.idEstablishment).subscribe({
      next: (item) => {
        console.log(item)
        this.serviceEstablishment = item;

      },
      error: (error) => {
        console.log('Ha ocurrido un error al obtener los servicos del establecimiento');
        console.log(error);
      }
    })
  }

  generate(): void {
    this.router.navigate(['/appointments/generate']);
    this.getId.setId(this.serviceEstablishment.id_establishment)
  }
}
