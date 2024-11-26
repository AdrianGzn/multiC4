import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import Swal from 'sweetalert2';
import { braiting } from '../../shared/models/braiting';
import jsPDF from 'jspdf';
import { StripeService } from '../../shared/services/stripe.service';
import { QuoteResponse } from '../../shared/models/quote-response';

@Component({
  selector: 'app-quote-patient',
  templateUrl: './quote-patient.component.html',
  styleUrls: ['./quote-patient.component.css']
})
export class QuotePatientComponent implements OnInit {
  @Input() quote = {
    id_cita: 0,                 
    fecha: '',                  
    estatus: '',                 
    horario: '',          
    id_establecimiento: 0
  };


  constructor(private generalService: GeneralServices, private stripeService: StripeService) { }

  ngOnInit(): void {
    if (this.quote && this.quote.id_cita) {
      console.log(this.quote)
      let currentUser = localStorage.getItem("userData");
      if (currentUser) {
        this.userFinal = JSON.parse(currentUser);
      }
    }
  }
  

  @Output() emitId = new EventEmitter<number>();

  rating: { [key: number]: number } = {};
  showRatingModal: boolean = false;
  userFinal: any = {};

  openRatingModal(): void {
      this.showRatingModal = true;
  }

  closeRatingModal(): void {
    const qualification: braiting = {
      id_establecimiento: this.quote.id_establecimiento,
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
      this.closeRatingModal(); 
    }
  }

  agendarCita(): void {

    const quote = {
      "quote_request": {
        "items": [
          {
            "name": `Servicio medico`,
            "product": "re",
            "price": 100,
            "quantity": 1
          }
        ]
      },
      "quote_data": {
        "id_usuario": this.userFinal.id_usuario,
        "fecha": `${this.quote.fecha}`,
        "horario": ``,
        "estatus": "0pendiente",
        "id_doctor": 10,
        "id_servicio": 12,
      }
    };
    const newEstatus = {
      estatus: "Pagados"
    }
    this.generalService.changeQuote(this.quote.id_cita, newEstatus).subscribe({
      next: (quoteChange) => {
        Swal.fire("Generar cambio", "Se cambio el estatus", "success")
      },

      error: (error) => {
        console.log(error)
      }
    })
    setTimeout(() => {
      this.stripeService.onCheckout(quote)
    }, 2000)

    this.generatePDF(this.quote)
  }


  generatePDF(quote: any): void {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Detalles de la Cita Médica", 20, 20);

    doc.setFontSize(12);
    doc.text(`Folio: ${quote.quote_data.id_servicio}`, 20, 40);
    doc.text(`Servicio: ${quote.quote_request.items[0].product}`, 20, 50);
    doc.text(`Fecha: ${quote.quote_data.fecha}`, 20, 60);
    doc.text(`Hora: ${quote.quote_data.horario}`, 20, 70);
    doc.text(`Doctor: ${quote.quote_data.id_doctor}`, 20, 80);
    doc.text(`Costo: $${quote.quote_request.items[0].price}`, 20, 90);
    doc.text("¡Descargar PDF!", 20, 100);
    doc.save('cita_medica.pdf');
  }
}
