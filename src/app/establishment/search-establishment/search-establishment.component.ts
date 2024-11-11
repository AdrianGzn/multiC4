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

  establishmentFinded: CardData[] = [
    {
      id: 1,
      imagen: '',
      titulo: 'Mi primera card',
      direccion: 'Mi casa'
    },
  ];

  constructor(private generalService: GeneralServices) {
    this.formEstablishment = new FormGroup({
      tipo: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^\d+$/)]),
      categoria: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250), Validators.pattern(/^\d+(\.\d+)?$/)]),
    });

    this.formEstablishmentByName = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^\d+$/)]),
    });

    this.formEstablishmentByService = new FormGroup({
      servicio: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^\d+$/)]),
    });
  }

  submitTipoCategoria(): void {
      
  }

  submitNombre(): void {

  }

  submitServicio(): void {

  }

}
