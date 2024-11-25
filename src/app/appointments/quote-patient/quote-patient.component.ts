import { Component, OnInit, Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quote-patient',
  templateUrl: './quote-patient.component.html',
  styleUrl: './quote-patient.component.css'
})
export class QuotePatientComponent {
  @Input() quote = {
    id_cita: 0,
    cita: '',
    fecha: '',
    estatus: '' 
   }
   @Output() emitId = new EventEmitter<number>();
   sendQuoteId(): void {
    this.emitId.emit(this.quote.id_cita);
  }
}
