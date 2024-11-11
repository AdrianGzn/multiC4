import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private generalservices: GeneralServices
  ) {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.generalservices.loginEmployee(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/home']); 
        },
        (error) => {
          console.error('Error en el login:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  signPatient(): void {
    this.router.navigate(['/sign-patient']);
  }
}
