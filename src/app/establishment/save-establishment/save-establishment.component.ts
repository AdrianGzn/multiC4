import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-save-establishment',
  templateUrl: './save-establishment.component.html',
  styleUrl: './save-establishment.component.css'
})
export class SaveEstablishmentComponent {
  formData: FormGroup;
  formUbication: FormGroup;
  formServices: FormGroup;
  formDoctors: FormGroup;

  constructor(private generalServices: GeneralServices) {
    this.formData = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
    });

    this.formUbication = new FormGroup({
      calle: new FormControl(null, [Validators.required]),
      colonia: new FormControl(null, [Validators.required]),
      numero: new FormControl(null),
      latitud: new FormControl(null),
      longitud: new FormControl(null),
      thisUbication: new FormControl(null),
    });

    this.formServices = new FormGroup({
      servicio: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
      costo: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
    });

    this.formDoctors = new FormGroup({
      doctor: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
      servicio: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
    });
  }

  //lógica para verificar checkbox: event.target.checked

}
