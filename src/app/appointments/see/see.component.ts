import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { QuoteResponse } from '../../shared/models/quote-response';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-see',
  templateUrl: './see.component.html',
  styleUrls: ['./see.component.css']
})
export class SeeComponent implements OnInit {
  isOpen: boolean = false;
  selectedOption: string = 'Atendidos';  
  options: string[] = ['Atendidos', 'No Atendidos', 'Pagados'];
  quotes: any[] = [];  // Array que almacenará las citas
  id_establishment: number = 0;

  constructor(private generalService: GeneralServices, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchQuotes();
  }

  toggleSelect() {
    this.isOpen = !this.isOpen;
  }

  trackByFn(index: number, item: any): number {
    return item.id_cita; // Usar un identificador único para cada cita
  }
  

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
    this.fetchQuotes(); // Cargar las citas cuando se seleccione una opción
  }

  fetchQuotes() {
    const user = localStorage.getItem("userData");
    const finalUser = user ? JSON.parse(user) : null;
  
    if (finalUser) {
      this.generalService.getQuotesByPatientIdStatus(finalUser.id_usuario, this.selectedOption).subscribe({
        next: (response: QuoteResponse[]) => {
          // Asegúrate de que no haya duplicación de datos
          this.quotes = response;
          console.log(response); 
        },
        error: (err) => {
          console.error('Error al obtener las citas:', err);
        }
      });
    }
  }
  

  handleQuoteId(id: number) {
    console.log('ID de la cita seleccionada:', id);

    let tempQuote: any = {
      estatus: 'Eliminado',
    }
    
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
  }
}
