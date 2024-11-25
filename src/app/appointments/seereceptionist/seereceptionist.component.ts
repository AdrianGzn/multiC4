import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { QuoteResponse } from '../../shared/models/quote-response';

@Component({
  selector: 'app-seereceptionist',
  templateUrl: './seereceptionist.component.html',
  styleUrls: ['./seereceptionist.component.css']
})
export class SeereceptionistComponent implements OnInit {
  isOpen: boolean = false;
  selectedOption: string = 'Atendidos';
  options: string[] = ['Atendidos', 'No Atendidos'];
  quotesDoctor: any[] = [];
  establishmentData: any = {};

  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    const currentEstablishment = localStorage.getItem('userData');
    if (currentEstablishment) {
      this.establishmentData = JSON.parse(currentEstablishment);
    }

    this.loadReceptionistQuotesByStatus();
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    this.loadReceptionistQuotesByStatus();
  }

  loadReceptionistQuotesByStatus(): void {
    this.generalService
      .getQuotesByEstablishmentStatus(
        4,
        "string"
      )
      .subscribe({
        next: (data) => {
          this.quotesDoctor = data.map((quote: QuoteResponse) => ({
            id_cita: quote.id_cita,
            cita: quote.horario,
            fecha: quote.fecha,
            estatus: quote.estatus
          }));
        },
        error: (err) => console.error('Error al cargar las citas:', err)
      });
  }

  deleteQuote(quoteId: number): void {
    this.generalService.deleteQuote(quoteId).subscribe({
      next: () => {
        console.log('Cita eliminada exitosamente');
        this.loadReceptionistQuotesByStatus();
      },
      error: (err) => console.error('Error al eliminar la cita:', err)
    });
  }
}
