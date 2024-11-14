import { Component, Directive } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { EstablishmentShortResponse } from '../../shared/models/establishment-short-response';
import { Establishment } from '../../shared/models/establishment';
import { Address } from '../../shared/models/address';

@Component({
  selector: 'app-search-establishment',
  templateUrl: './search-establishment.component.html',
  styleUrl: './search-establishment.component.css'
})
export class SearchEstablishmentComponent {

  formEstablishment: FormGroup;
  formEstablishmentByName: FormGroup;
  formEstablishmentByService: FormGroup;
  services: string[] = ['General', 'Pediatría', 'Obstetricia', 'Odontología'];
  tipo: string[] = ['Hospital', 'Clínica', 'Consultorio']; //lista de todos lo que va en formularios
  categoria: string[] = ['Público', 'Privado'];

  establishmentFinded: EstablishmentShortResponse[] = [];

  constructor(private generalService: GeneralServices) {
    this.formEstablishment = new FormGroup({
      tipo: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^\d+$/)]),
      categoria: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250), Validators.pattern(/^\d+(\.\d+)?$/)]),
    });

    this.formEstablishmentByName = new FormGroup({
      nombre: new FormControl(null, []),
    });

    this.formEstablishmentByService = new FormGroup({
      servicio: new FormControl(null, []),
    });
  }

  submitTipoCategoria(): void {
    let type = this.formEstablishment.value.tipo;
    let category = this.formEstablishment.value.categoria;

    this.generalService.getEstablishmentByTypeCategory(type, category).subscribe({
      next: (data: EstablishmentShortResponse[]) => {
        this.establishmentFinded = data;
      },
      error: (error) => {   
        alert("No se pudieron encontrar establecimientos con estas especificaciones: " + error)
      }
    })
      
  }

  submitNombre(): void {
    let nombre = this.formEstablishmentByName.value.nombre;
    let idAddress = 0;

    let estabishmentResponse: EstablishmentShortResponse = {
      id_establishment: 0,
      name: nombre,
      direccion:  ''
    }

    this.generalService.getEstablishmentByName(nombre).subscribe({
      next: (data: Establishment) => {
        estabishmentResponse.id_establishment = data.id_establishment;
        idAddress = data.id_dirección;


        this.generalService.getAddress().subscribe({
          next: (data: Address[]) => {
            let tempAddress: Address | undefined = data.find((item: Address) => item.id_address === idAddress) //Como lo que se evalua es un id quiero que almacene una única instancia de Addres en tempAddres
            if (tempAddress) {
              let direccion = `${tempAddress.calle}, ${tempAddress.colonia}, #${tempAddress.numero}. ${tempAddress.descripcion}`
              estabishmentResponse.direccion = direccion;
            }

            this.establishmentFinded = [];
            this.establishmentFinded.push(estabishmentResponse);

          },
          error: (error) => {    
            alert("No se pudo encontrar el horario: " + error)
          }
        });
        
      },
      error: (error) => {    
        alert("No se pudo encontrar al establecimiento: " + error)
      }
    })
  }

  submitServicio(): void {
    let myService = this.formEstablishmentByService.value.servicio;
    this.generalService.getEstablishmentByService(myService).subscribe({
      next: (data: EstablishmentShortResponse[]) => {
        this.establishmentFinded = data;        
      },
      error: (error) => {    
        alert("No se pudieron encontrar los establecimientos con el servicio: " + error);
      }
    })
  }

}
