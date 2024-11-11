import { Component, Input } from '@angular/core';
import { CardData } from '../models/card-data';

@Component({
  selector: 'app-card-establishment',
  templateUrl: './card-establishment.component.html',
  styleUrls: ['./card-establishment.component.css']
})
export class CardEstablishmentComponent {
  @Input() card: CardData = { 
    id: 0,
    imagen: '', 
    titulo: '', 
    direccion: '' 
  };

  details(id: number):void {
    console.log(id);
    
  }
}
