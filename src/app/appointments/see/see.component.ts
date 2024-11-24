import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { QuoteResponse } from '../../shared/models/quote-response';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrl: './see.component.css'
})
export class SeeComponent implements OnInit {
  isOpen: boolean = false;
  selectedOption: string = 'Atendidos';  
  options: string[] = ['Atendidos', 'No Atendidos'];
  quotes: any[] = [];

  constructor(private generalService: GeneralServices) {}

  ngOnInit(): void {
    this.fetchQuotes();
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    this.fetchQuotes();
  }

  private fetchQuotes() {
    const user = localStorage.getItem("userData");
    const finalUser = user ? JSON.parse(user) : null;

    if (finalUser && finalUser.id_usuario) {
      this.generalService.getQuotesByPatientId(finalUser.id_usuario).subscribe({
        next: (response: QuoteResponse[]) => {
          console.log(response);
          const filteredQuotes = response.filter(quote => 
            this.selectedOption === 'Atendidos' ? quote.estatus === 'Atendido' : quote.estatus !== 'Atendido'
          );

          this.quotes = filteredQuotes.map(quote => ({
            id: quote.id_cita,
            date: quote.fecha,
            status: quote.estatus,
            doctor: quote.id_doctor,
            description: `Cita con el servicio ${quote.id_servicio}`
          }));
        },
        error: (err) => {
          console.error('Error al obtener las citas:', err);
        }
      });
    } else {
      console.error('No se encontró el usuario en localStorage');
    }
  }
}
