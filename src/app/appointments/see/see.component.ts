import { Component, OnInit } from '@angular/core';
import { GeneralServices } from '../../shared/services/general-services.service';
import { QuoteResponse } from '../../shared/models/quote-response';
import { UserService } from '../../shared/services/user.service';
import { EstablishmentServiceInterface } from '../../shared/models/establishment-service-interface';

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
  
    if (finalUser && finalUser.id_usuario) {
      this.generalService.getQuotesByPatientId(finalUser.id_usuario).subscribe({
        next: (response: QuoteResponse[]) => {
          this.quotes = [];
  
          this.generalService.getServices().subscribe({
            next: (services: EstablishmentServiceInterface[]) => {
  
              response.forEach((element: QuoteResponse) => {
                if (element.estatus === this.selectedOption) {
                  let nameService: string = '';
                  let nameEstablishment: string = '';
                  let id_establishment: number = 0;
  
                  const service = services.find(service => service.service.id_servicio === element.id_servicio);
                  if (service) {
                    nameService = service.service.tipo;
                    nameEstablishment = service.establishment.nombre;
                    id_establishment = service.establishment.id_establecimiento;
                  }
  
                  this.quotes.push({
                    id_cita: element.id_cita,
                    cita: `Cita con el servicio ${nameService} del establecimiento ${nameEstablishment}`,
                    id_establishment: id_establishment,
                    fecha: element.fecha,
                    estatus: element.estatus
                  });
                }
              });
  
              console.log(this.quotes);
            },
            error: (error) => {
              console.log('No se han podido obtener los servicios');
              console.log(error);
            }
          });
        },
        error: (err) => {
          console.error('Error al obtener las citas:', err);
        }
      });
    } else {
      console.error('No se encontró el usuario en localStorage');
    }
  }
  

  handleQuoteId(id: number) {
    console.log('ID de la cita seleccionada:', id);

    let tempQuote: any = {
      estatus: 'Eliminado',
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
