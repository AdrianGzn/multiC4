import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { EstablishmentShortResponse } from '../../shared/models/establishment-short-response';
import { Establishment } from '../../shared/models/establishment';
import { Address } from '../../shared/models/address';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-search-establishment',
  templateUrl: './search-establishment.component.html',
  styleUrl: './search-establishment.component.css'
})

export class SearchEstablishmentComponent implements OnInit {

  formEstablishment: FormGroup;
  formEstablishmentByName: FormGroup;
  formEstablishmentByService: FormGroup;
  services: string[] = ['General', 'Pediatría', 'Obstetricia', 'Odontología'];
  tipo: string[] = ['Hospital', 'Clínica', 'Consultorio']; //lista de todos lo que va en formularios
  categoria: string[] = ['Público', 'Privado'];

  establishmentFinded: any[] = [];

  constructor(private generalService: GeneralServices, private formBuilder: FormBuilder) {
    this.formEstablishment = this.formBuilder.group({
      tipo: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^\d+$/)]),
      categoria: new FormControl('', [Validators.required, Validators.min(10), Validators.max(250), Validators.pattern(/^\d+(\.\d+)?$/)]),
    });

    this.formEstablishmentByName = this.formBuilder.group({
      nombre: new FormControl(null, []),
    });

    this.formEstablishmentByService = this.formBuilder.group({
      servicio: new FormControl(null, []),
    });
  }

  ngOnInit(): void {
    this.generalService.establishmentInformation().subscribe(
      (next) => {
        console.log(next)
        this.establishmentFinded = next;
      },

      error => {
        console.log(error)
      }
    )
  }

  submitTipoCategoria(): void {
    const formTypeCategory = {
      type: this.formEstablishment.value.tipo,
      category: this.formEstablishment.value.categoria
    }
    console.log(formTypeCategory)
      this.generalService.getEstablishmentByTypeCategory(formTypeCategory.type, formTypeCategory.category).pipe().subscribe(
        data => {
          this.establishmentFinded = data.map((establishment: any) => ({
            id_establishment: establishment.id_establishment,
            nombre: establishment.nombre,
            direccion:  {
                calle: establishment.dirección.calle,
                colonia: establishment.dirección.colonia,
                descripcion: establishment.dirección.descripción,
                id_dirección: establishment.dirección.id_dirección,
                latitud: establishment.dirección.latitud,
                longitud: establishment.dirección.longitud,
                numero: establishment.dirección.numero
            },
            image: establishment.image
          })); 
          console.log(this.establishmentFinded)
        },
        error => {
          console.log(error)
        }
      )
  }

  submitNombre(): void {
    let nombre = this.formEstablishmentByName.value;


    console.log(nombre)
    this.generalService.getEstablishmentByName(this.formEstablishmentByName.value.nombre).subscribe({
      next: (data) => {
        console.log(data)
            this.establishmentFinded = data
      },
      error: (error) => {    
        alert("No se pudo encontrar al establecimiento: " + error)
      }
    })
  }

  submitServicio(): void {
    console.log(this.formEstablishmentByService.value.servicio)
    let myService = this.formEstablishmentByService.value.servicio;
    console.log(myService)
    this.generalService.getEstablishmentByService(myService).subscribe({
      next: (data: EstablishmentShortResponse[]) => {
        console.log(data)
        this.establishmentFinded = data;        
      },
      error: (error) => {    
        alert("No se pudieron encontrar los establecimientos con el servicio: " + error);
      }
    })
  }

}
