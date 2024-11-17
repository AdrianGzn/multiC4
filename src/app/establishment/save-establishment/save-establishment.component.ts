import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-save-establishment',
  templateUrl: './save-establishment.component.html',
  styleUrl: './save-establishment.component.css'
})
export class SaveEstablishmentComponent implements OnInit{
  type_options: any[] = [];
  formData: FormGroup;
  formUbication: FormGroup;
  formSchedule: FormGroup;
  formImage: FormGroup;
  formServices: FormGroup;
  formDoctors: FormGroup;

  constructor(private generalServices: GeneralServices) {
      this.formData = new FormGroup({
        nombre: new FormControl(null, [Validators.required]),
        descripcion: new FormControl(null, [Validators.required]),
        tipo: new FormControl(null, [Validators.required]),
        categoria: new FormControl(null, [Validators.required])
      }),
      this.formUbication = new FormGroup({
        calle: new FormControl(null, [Validators.required]),
        colonia: new FormControl(null, [Validators.required]),
        numero: new FormControl(null),
        latitud: new FormControl(null),
        longitud: new FormControl(null),
        thisUbication: new FormControl(false),
      }),
      this.formSchedule = new FormGroup({
        horaInicio: new FormControl(null, [Validators.required]),
        diaInicio: new FormControl(null, [Validators.required]),
        horaCierre: new FormControl(null, [Validators.required]),
        diaCierre: new FormControl(null, [Validators.required]),
      }),
      this.formImage = new FormGroup({
        imagen: new FormControl(null, [Validators.required]),
      }),
      this.formServices = new FormGroup({
        servicio: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
        costo: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
      }),
      this.formDoctors = new FormGroup({
        doctor: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
        servicioDoctor: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
      })
  }

  ngOnInit(): void {
    this.generalServices.getTypeEstablishment().subscribe(
      (next) => {
        this.type_options =  next;
        console.log(next) 
      }
    )
  }
  onSubmit() {
    console.log(this.formData.value.tipo)
  }
}