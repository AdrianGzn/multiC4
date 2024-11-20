import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { Establishment } from '../../shared/models/establishment';
import { serviceEstablishment } from '../../shared/models/serviceEstablishment';
import { GeneralServices } from '../../shared/services/general-services.service';
import { SharedDataService } from '../../shared/services/shared-data.service';

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
  serviceEstablishment: serviceEstablishment[] = [];

  constructor(private router: Router, private generalServices: GeneralServices, private serviceAndEstablishmentData: ServiceAndEstablishmentDataService, private getId: SharedDataService) {}

  ngOnInit(): void {
    this.getId.id$.subscribe(
      id => {
        this.idEstablishment = id;
        console.log(id)
      }
    )
    this.dataEstablishment = this.serviceAndEstablishmentData.getEstablishment();
    
    this.generalServices.getServiceEstablishemnt(29).subscribe({
      next: (item) => {
        console.log(item)
        this.serviceEstablishment = item;
        console.log(this.serviceEstablishment);
      },
      error: (error) => {
        console.log('Ha ocurrido un error al obtener los servicos del establecimiento');
        console.log(error);
      }
    })
  }

  generate(): void {
    this.router.navigate(['/appointments/generate']);
    if (this.serviceAndEstablishmentData.selectEstablishment(this.dataEstablishment)) {
      console.log('Datos del establecimiento guardados correctamente en el servicio.');
    } else {
      console.log('No se han podido guardar los datos en el servicio correctamente.');
    }
  }
}
