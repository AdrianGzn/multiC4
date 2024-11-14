import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
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
    const newPatient = {
      id_rol: 1,
      nombre: "re",
      contraseña: "re"
    }
    console.log(newPatient)
    if (this.signInForm.valid) {
      this.userService.register(newPatient).subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.log(error)
        }
      )
    } else {
      console.log('Formulario no válido');
    }
  }

  signRegresar(): void {
    this.router.navigate(['/sign-regresar']);
  }
}
