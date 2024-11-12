import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CardData } from '../models/card-data';
import { GeneralServices } from '../../shared/services/general-services.service';

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

  establishmentFinded: CardData[] = [];

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
      
  }

  submitNombre(): void {
    console.log(this.formEstablishmentByName.value)
    this.generalService.getEstablishmentByName(this.formEstablishmentByName.value.nombre).subscribe({
      next: (data) => {
        console.log(data)
        this.establishmentFinded.push(data)
      },
      error: (error) => {    
        alert("No se pudo encontrar: " + error)
      }
    })
  }

  submitServicio(): void {
    this.generalService.getEstablishmentByService(this.formEstablishmentByService.value).subscribe({
      next: (data) => {
        this.establishmentFinded = data;
      },
      error: (error) => {    
        alert("No se pudo encontrar: " + error);
      }
    })
  }

}
