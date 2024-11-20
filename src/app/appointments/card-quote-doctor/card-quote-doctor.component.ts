import { Component, Output } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-card-quote-doctor',
  templateUrl: './card-quote-doctor.component.html',
  styleUrl: './card-quote-doctor.component.css'
})
export class CardQuoteDoctorComponent {
  @Input() quote = {
    id_cita: 0,
    cita: '',
    fecha: '',
    estatus: '' 
   }
   @Output() emitId = new EventEmitter<number>();
   sendQuoteId(): void {
    this.emitId.emit(this.quote.id_cita)
   }
}
