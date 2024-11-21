import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ServiceAndEstablishmentDataService } from '../../shared/services/service-and-establishment-data.service';
import { GeneralServices } from '../../shared/services/general-services.service';
import { Establishment } from '../../shared/models/establishment';
import { SharedDataService } from '../../shared/services/shared-data.service';
import { Router } from '@angular/router';
import { EstablishmentGetResponse } from '../../shared/models/establishment-get-response';


@Component({
  selector: 'app-card-establishment',
  templateUrl: './card-establishment.component.html',
  styleUrls: ['./card-establishment.component.css']
})
export class CardEstablishmentComponent implements OnInit{
  constructor(private router: Router,private serviceAndEstablishmentData: ServiceAndEstablishmentDataService, private generalServices: GeneralServices, private idSent: SharedDataService) {}

  @Input() card = { 
    id_establecimiento: 0,
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
      next: (item: any[]) => {
        item.forEach((itemEstablishment: any) => {
          if (itemEstablishment.id_establecimiento === this.card.id_establecimiento) {
            this.serviceAndEstablishmentData.selectEstablishment(itemEstablishment);
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
    console.log(this.card.id_establecimiento)
    this.idSent.setId(this.card.id_establecimiento)
    this.router.navigate(['./establishment/details']);
  }
}
