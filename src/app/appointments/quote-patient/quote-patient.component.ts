import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import Swal from 'sweetalert2';
import { braiting } from '../../shared/models/braiting';

@Component({
  selector: 'app-quote-patient',
  templateUrl: './quote-patient.component.html',
  styleUrls: ['./quote-patient.component.css']
})
export class QuotePatientComponent implements OnInit {
  @Input() quote = {
    id_cita: 0,
    cita: '',
    fecha: '',
    estatus: '',
    id_establishment: 0
  };


  constructor(private generalService: GeneralServices) { }

  ngOnInit(): void {
    let currentUser = localStorage.getItem("userData");

    if (currentUser) {
      this.userFinal = JSON.parse(currentUser);
    }
  }

  @Output() emitId = new EventEmitter<number>();

  rating: { [key: number]: number } = {};
  showRatingModal: boolean = false;
  userFinal: any = {};

  openRatingModal(): void {
    if (this.quote.estatus === 'Atendidos') {
      this.showRatingModal = true;
    }
  }

  closeRatingModal(): void {
    const qualification: braiting = {
      id_establecimiento: this.quote.id_establishment,
      id_usuario: this.userFinal.id_usuario,
      calificacion: this.rating[this.quote.id_cita]
    };
    this.generalService.postStars(qualification).subscribe({
      next: () => {
        Swal.fire("Puntuación", "Se generó la calificación", "success");
      },
      error: (error) => {
        Swal.fire("Puntuación", "No se logró generar la calificación", "error");
      }
    });

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
    if (this.quote.estatus === 'Atendidos') {
      console.log(`Calificación guardada: ${this.rating[this.quote.id_cita]} estrellas para la cita ${this.quote.id_cita}`);

      this.closeRatingModal(); // Se pasa el objeto de calificación
    }
  }
}
