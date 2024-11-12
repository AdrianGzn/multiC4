import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent  {
  campaniaForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.campaniaForm = new FormGroup({
      nombreCampania: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
      imagen: new FormControl(''),
      direccionCampania: new FormControl(''),
      publicoDirigido: new FormControl(''),
      fechaInicio: new FormControl(''),
    });
  }

  onSubmit() {
    if (this.campaniaForm.valid) {
      console.log(this.campaniaForm.value);
      // Aquí puedes enviar los datos a tu API o manejarlos como desees.
    }
  }
}
