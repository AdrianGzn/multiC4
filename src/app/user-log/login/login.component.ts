import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  onSubmit() {
    const person = {
      nombre: this.loginForm.value.nombre,
      contraseña: this.loginForm.value.contraseña
    }

    if (this.loginForm.valid) {
      this.userService.loginEmployee(person).subscribe({
        next: (data: User) => {
          console.log('Inicio se Sesión exitoso');
          localStorage.setItem('userData', JSON.stringify(data));

        },
        error: (erro) => {
          console.log('Ha ocurrido un error: ' + erro);
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
  signPatient(): void {
    this.router.navigate(['/sign-patient']);
  }
}