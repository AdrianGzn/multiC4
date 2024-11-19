import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { GeneralServices } from '../../shared/services/general-services.service';
import { Establishment } from '../../shared/models/establishment';


@Component({
  selector: 'app-card-establishment',
  templateUrl: './card-establishment.component.html',
  styleUrls: ['./card-establishment.component.css']
})
export class CardEstablishmentComponent implements OnInit{
  constructor(private serviceAndEstablishmentData: ServiceAndEstablishmentDataService, private generalServices: GeneralServices) {}

  @Input() card = { 
    id_establishment: 0,
    nombre: '',
    direccion:  {
      calle: '',
      colonia: '',
      descripcion: '',
      id_dirección: 0,
      latitud: 0,
      longitud: 0,
      numero: 0
    },
    image: ''
  };

  @Output() emitCardId = new EventEmitter<number>(); 

  ngOnInit(): void {

    this.generalServices.getEstablishment().subscribe({
      next: (item: Establishment[]) => {
        item.forEach((item: Establishment) => {
          if (item.id_establishment === this.card.id_establishment) {
            this.serviceAndEstablishmentData.selectEstablishment(item);
          }
        });
      },
      error: (error) => {
        console.log('Ha ocurrido un error al obtener los establecimientos');
        console.log(error);  
      }
    })
  }
  
  details():void {
    console.log(this.card.nombre)
  }
}
