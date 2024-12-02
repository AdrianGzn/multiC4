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
  services: string[] = ["General", "Pediatría", "Obstetricia", "Odontología"];
  tipo: string[] = ['Hospital', 'Clínica', 'Consultorio']; //lista de0 todos lo que va en formularios
  categoria: string[] = ['Público', 'Privado'];
  userFinal: any = {}
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
    let currentUser = localStorage.getItem("userData")
    if(currentUser) {
      this.userFinal = JSON.parse(currentUser)
      console.log(this.userFinal);
      
    }
    this.generalService.establishmentInformation(this.userFinal.localidad).subscribe(
      (next) => {
        this.establishmentFinded = next;
        console.log(this.establishmentFinded)
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
      this.generalService.getEstablishmentByTypeCategory(this.formEstablishment.value.tipo, this.formEstablishment.value.categoria, this.userFinal.localidad).pipe().subscribe(
        data => {
          console.log(data)
          this.establishmentFinded = data
        },
        error => {
          console.log(error)
        }
      )
  }

  submitNombre(): void {
    let nombre = this.formEstablishmentByName.value;
    console.log(this.formEstablishmentByName.value)
    console.log(nombre)
    this.generalService.getEstablishmentByName(this.formEstablishmentByName.value.nombre, this.userFinal.localidad).subscribe({
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
    this.generalService.getEstablishmentByService(this.formEstablishmentByService.value.servicio, this.userFinal.localidad).subscribe({
      next: (data: any[]) => {
        console.log(data)
        this.establishmentFinded = data;        
      },
      error: (error) => {    
        alert("No se pudieron encontrar los establecimientos con el servicio: " + error);
      }
    })
  }

}
