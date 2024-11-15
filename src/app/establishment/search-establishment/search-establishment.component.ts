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

  establishmentFinded: EstablishmentShortResponse[] = [];

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
        this.establishmentFinded = next;
        console.log(next)
      },

      error => {
        console.log(error)
      }
    )
  }

  submitTipoCategoria(): void {
      
  }

  submitNombre(): void {
    let nombre = this.formEstablishmentByName.value;
    let idAddress = 0;

    let estabishmentResponse: EstablishmentShortResponse = {
      id_establishment: 0,
      nombre: nombre,
      direccion:  ''
    }
    console.log(nombre)
    this.generalService.getEstablishmentByName("string").subscribe({
      next: (data: Establishment) => {
        console.log(data)
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
    console.log(this.formEstablishmentByService.value.servicio)
    let myService = this.formEstablishmentByService.value.servicio;
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
