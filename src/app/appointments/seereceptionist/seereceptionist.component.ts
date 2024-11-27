import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { QuoteResponse } from '../../shared/models/quote-response';
import { EstablishmentServiceInterface } from '../../shared/models/establishment-service-interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-seereceptionist',
  templateUrl: './seereceptionist.component.html',
  styleUrls: ['./seereceptionist.component.css']
})
export class SeereceptionistComponent implements OnInit {
  isOpen: boolean = false;
  selectedOption: string = 'Atendidos';  
  options: string[] = ['Atendidos', 'No Atendidos', 'Pagados'];
  quotesDoctor: any[] = [];


  constructor(private generalService: GeneralServices, private userService: UserService) {}

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
    console.log(this.selectedOption);
    
    const user = localStorage.getItem("userData");
    const finalUser = user ? JSON.parse(user) : null;

    this.generalService.getQuotesByReceptionisStatus(finalUser.id_establecimiento, this.selectedOption).subscribe(
      {
        next: (next) => {
          this.quotesDoctor = next
        }
      }
    )
  }

  deleteQuote(id: number) {
    console.log('ID de la cita seleccionada:', id);

    let tempQuote: any = {
      estatus: '',
    }

    if (this.selectedOption === 'Atendidos') {
      tempQuote.estatus = 'No Atendidos';
    }else if (this.selectedOption === 'No Atendidos') {
      tempQuote.estatus = 'Atendidos';
    }

    console.log(tempQuote);
    
    this.generalService.changeQuote(id, tempQuote).subscribe({
      next: (item) => {
        console.log('Se ha cambiado exitosamente el estatus de la cita');
        console.log(item);
      },
      error: (error) => {
        console.log('Ha ocurrido un error al editar la cita');
        console.log(error);
      }
    })

    this.fetchQuotes();
      
  }
}
