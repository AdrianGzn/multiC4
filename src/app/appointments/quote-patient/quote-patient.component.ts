import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quote-patient',
  templateUrl: './quote-patient.component.html',
  styleUrls: ['./quote-patient.component.css']
})
export class QuotePatientComponent {
  @Input() quote = {
    id_cita: 0,
    cita: '',
    fecha: '',
    estatus: '' 
  };
  @Output() emitId = new EventEmitter<number>();

  rating: { [key: number]: number } = {}; 
  showRatingModal: boolean = false; 

  openRatingModal(): void {
    if (this.quote.estatus === 'Atendidos') {
      this.showRatingModal = true;  
    }
  }
  

  closeRatingModal(): void {
    this.showRatingModal = false;
  }


  rateQuote(idCita: number, stars: number): void {
    this.rating[idCita] = stars;
    console.log(`Cita ${idCita} calificada con ${stars} estrellas`);
  }
  sendQuoteId(): void {
    this.emitId.emit(this.quote.id_cita);
  }
 saveRating(): void {
  if (this.quote.estatus === 'Atendido') {
    console.log(`Calificación guardada: ${this.rating[this.quote.id_cita]} estrellas para la cita ${this.quote.id_cita}`);
    this.closeRatingModal();
  
  }

}
}
