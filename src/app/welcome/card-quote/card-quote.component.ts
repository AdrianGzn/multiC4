import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Quote } from '../../shared/models/quote';
@Component({
  selector: 'app-card-quote',
  templateUrl: './card-quote.component.html',
  styleUrl: './card-quote.component.css'
})
export class CardQuoteComponent {
  @Input() quote: Quote = {
    id_cita: 0,
    id_usuario: 0,
    fecha: '',
    horario: '' ,
    id_doctor: 0,
    id_servicio: 0 
  }
}
