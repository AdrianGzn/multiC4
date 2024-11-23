import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
      nombre: new FormControl(null, [Validators.required]),
      contraseña: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    const person = {
      nombre: this.loginForm.value.nombre,
      contraseña: this.loginForm.value.contraseña
    }

    if (this.loginForm.valid) {
      this.userService.loginEmployee(person).subscribe({
        next: (data: any) => {
          console.log(data.data_user.id_establecimiento)
          localStorage.setItem('userData', JSON.stringify(data.data_user));          
          if(data.data_user.rol === 'patient') {
            this.router.navigate(["./establishment/search"])
          }else if(data.data_user.rol === "medic") {
            this.router.navigate(["./welcome/doctor"])
          }else if(data.data_user.rol === "receptionist"){
            this.router.navigate(["./establishment/save"])
          }

          console.log(data)

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
  signEmployee(): void {
    this.router.navigate(['/sign-employee']); 
  }
}