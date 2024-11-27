import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { UserService } from '../../shared/services/user.service';
import { QuoteResponse } from '../../shared/models/quote-response';
import { EstablishmentServiceInterface } from '../../shared/models/establishment-service-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seedoctor',
  templateUrl: './seedoctor.component.html',
  styleUrls: ['./seedoctor.component.css']
})
export class SeedoctorComponent implements OnInit {
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

    this.generalService.getQuotesByDoctorStatus(finalUser.id_usuario, this.selectedOption).subscribe(
      {
        next: (next) => {
          this.quotesDoctor = next; 
          console.log(this.quotesDoctor);
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
        Swal.fire("Cambiar estatus de la cita", "Se cambio el estatus de la cita", "success")
        console.log(item);
      },
      error: (error) => {
        Swal.fire("Cambiar estatus de la cita", "No se logro cambiar el estatus de la cita", "error")
        console.log(error);
      }
    })

    this.fetchQuotes();
      
  }
}
