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
  options: string[] = ['Atendidos', 'No Atendidos'];
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

    if (finalUser && finalUser.id_usuario) {
      this.generalService.getQuotesByPatientId(finalUser.id_usuario).subscribe({
        next: (response: QuoteResponse[]) => {
          this.quotesDoctor = [];
          
          response.forEach((element: QuoteResponse) => {
            if (element.estatus === this.selectedOption) {
              let nameService: string = '';
              let nameEstablishment: string = '';

              this.generalService.getServices().subscribe({
                next: (item: EstablishmentServiceInterface[]) => {
                  
                  item.forEach((element2: EstablishmentServiceInterface) => {
                    if (element.id_servicio === element2.service.id_servicio) {
                      nameEstablishment = element2.establishment.nombre;
                      nameService = element2.service.tipo;
                    }
                  });

                },
                error: (error) => {
                  console.log('No se han podido obtener los servicios');
                  console.log(error);
                }
              })

              this.quotesDoctor.push({
                id_cita: element.id_cita,
                cita: `Cita con el servicio ${nameService} del establecimiento ${nameEstablishment}`,
                fecha: element.fecha,
                estatus: element.estatus 
              })
            }
          });

          console.log(this.quotesDoctor);
          
        },
        error: (err) => {
          console.error('Error al obtener las citas:', err);
        }
      });
    } else {
      console.error('No se encontró el usuario en localStorage');
    }
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
