import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { GeneralServices } from '../../shared/services/general-services.service';
import { ScheduleDoctor } from '../../shared/models/schedule-doctor';
import { User } from '../../shared/models/user';


@Component({
  selector: 'app-sign-employee',
  templateUrl: './sign-employee.component.html',
  styleUrls: ['./sign-employee.component.css']  
})
export class SignEmployeeComponent {
  signInForm: FormGroup;

  newSchedule: ScheduleDoctor[] = [];
  days: string[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private generalService: GeneralServices) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    let myUser: User = {
      id_usuario: 0,
      id_rol: 0,
      nombre: '',
      id_establecimiento: 0,
      id_servicio: 0
    };

    const newPatient = {
      id_rol: 0,
      nombre: this.signInForm.value.username,
      contraseña: this.signInForm.value.password
    }
    

    if(this.signInForm.valid){
      if (this.signInForm.value.role === 'Doctor') {
        newPatient.id_rol = 3;
      } else if (this.signInForm.value.role === 'Recepcionista') {
        newPatient.id_rol = 2;
      }

      if (this.signInForm.value.password === this.signInForm.value.confirmPassword) {
        this.userService.register(newPatient).subscribe({
          next: (data: User) => {
            myUser = data;
          },
          error: (error) => {
            console.log(error)
          }
        });
      } else {
        alert('Las contraseñas no corresponden');
      };
    }else {
      alert('Formulario no válido')
    };
  }

  signRegresar(): void {
    this.router.navigate(['/sign-regresar']);
  }
}
