import { Component, Input } from '@angular/core';
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
    direccion:  '',
  };

  details(id: number):void {
    console.log(id);
    
  }
}
