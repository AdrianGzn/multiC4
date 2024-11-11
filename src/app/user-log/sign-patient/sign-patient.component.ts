import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-patient',
  templateUrl: './sign-patient.component.html',
  styleUrls: ['./sign-patient.component.css']
})
export class SignPatientComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      usernameGroup: this.fb.group({
        username: ['', Validators.required]
      }),
      passwordGroup: this.fb.group({
        password: ['', Validators.required]
      }),
      confirmPasswordGroup: this.fb.group({
        confirmPassword: ['', Validators.required]
      })
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      console.log('Formulario válido:', this.signInForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }

  signRegresar(): void {
    this.router.navigate(['/login']); 
  }

  signEmployee(): void {
    this.router.navigate(['/sign-employee']); 
  }
}
