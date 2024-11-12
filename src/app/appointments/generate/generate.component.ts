import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent  {
  agendarCitaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.agendarCitaForm = this.fb.group({
      servicio: ['', Validators.required],
      doctor: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.agendarCitaForm.valid) {
      // Procesa los datos del formulario
      console.log(this.agendarCitaForm.value);
    } else {
      console.log("Formulario inválido");
    }
  }
}
