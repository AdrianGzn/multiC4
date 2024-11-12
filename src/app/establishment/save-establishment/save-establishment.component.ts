import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-save-establishment',
  templateUrl: './save-establishment.component.html',
  styleUrls: ['./save-establishment.component.css']
})
export class SaveEstablishmentComponent {
  form: FormGroup;

  constructor(private generalServices: GeneralServices) {
    this.form = new FormGroup({
      formData: new FormGroup({
        nombre: new FormControl(null, [Validators.required]),
        descripcion: new FormControl(null, [Validators.required]),
        tipo: new FormControl(null, [Validators.required]),
      }),
      formUbication: new FormGroup({
        calle: new FormControl(null, [Validators.required]),
        colonia: new FormControl(null, [Validators.required]),
        numero: new FormControl(null),
        latitud: new FormControl(null),
        longitud: new FormControl(null),
        thisUbication: new FormControl(false),
      }),
      formServices: new FormGroup({
        servicio: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
        costo: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
      }),
      formDoctors: new FormGroup({
        doctor: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(100)]),
        servicio: new FormControl(null, [Validators.required, Validators.min(10), Validators.max(250)]),
      })
    });
  }

  // Método onSubmit que envía el formulario al servicio
  onSubmit() {
    if (this.form.valid) {
      const establishmentData = {
        ...this.form.value.formData,
        ...this.form.value.formUbication,
        services: this.form.value.formServices,
        doctors: this.form.value.formDoctors,
      };
    }
}
}