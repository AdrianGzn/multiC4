import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-sign-patient',
  templateUrl: './sign-patient.component.html',
  styleUrls: ['./sign-patient.component.css']
})
export class SignPatientComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      locality: ['', Validators.required] // Campo de localidad añadido
    });
  }

  onSubmit(): void {
    const newPatient = {
      id_rol: 1,
      nombre: this.signInForm.value.username,
      contraseña: this.signInForm.value.password,
      localidad: this.signInForm.value.locality // Agregamos la localidad al objeto
    };

    console.log(newPatient);

    if (this.signInForm.valid) {
      if (this.signInForm.value.password === this.signInForm.value.confirmPassword) {
        this.userService.register(newPatient).subscribe({
          next: (data) => {
            console.log(data);
            this.router.navigate(['/welcome/patient']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      } else {
        alert('Las contraseñas no coinciden');
      }
    } else {
      alert('Formulario no válido');
    }
  }

  signRegresar(): void {
    this.router.navigate(['/sign-regresar']);
  }
}
