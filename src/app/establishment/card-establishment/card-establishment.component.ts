import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EstablishmentShortResponse } from '../../shared/models/establishment-short-response';


@Component({
  selector: 'app-card-establishment',
  templateUrl: './card-establishment.component.html',
  styleUrls: ['./card-establishment.component.css']
})
export class CardEstablishmentComponent {
  @Input() card: EstablishmentShortResponse = { 
    id_establishment: 0,
    nombre: '',
    direccion:  {
      calle: '',
      colonia: '',
      descripción: '',
      id_dirección: 0,
      latitud: 0,
      longitud: 0,
      numero: 0
    },
    image: ''
  };

  @Output() emitCardId = new EventEmitter<number>(); 
  
  details(id: number):void {
    this.emitCardId.emit(this.card.id_establishment)
  }
}
