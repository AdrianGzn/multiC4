import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { GeneralServices } from '../../shared/services/general-services.service';
import { ScheduleDoctor } from '../../shared/models/schedule-doctor';
import { User } from '../../shared/models/user';
import { ScheduleDoctorResponse } from '../../shared/models/schedule-doctor-response';


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

    let idRole: number = 0;

    if (this.signInForm.value.role === "Doctor") {
      idRole = 2;
    }else if (this.signInForm.value.role === "Recepcionista") {
      idRole = 3;
    }

    const newEmployee = {
      id_rol: 0,
      nombre: this.signInForm.value.username,
      contraseña: this.signInForm.value.password
    }
    

    if(this.signInForm.valid){
      if (this.signInForm.value.role === 'Doctor') {
        newEmployee.id_rol = 3;
      } else if (this.signInForm.value.role === 'Recepcionista') {
        newEmployee.id_rol = 2;
      }

      if (this.signInForm.value.password === this.signInForm.value.confirmPassword) {
        this.userService.register(newEmployee).subscribe({
          next: (data: User) => {
            myUser = data;
            this.createSchedulesForDoctor(myUser.id_usuario);
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

  createSchedulesForDoctor(idDoctor: number): void {
    let dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jeves', 'viernes', 'sabado'];

    dias.forEach((itemDia) => {

      let tempSchedule: ScheduleDoctorResponse = {
        día: itemDia,
        id_usuario: idDoctor,
        entrada: '',
        salida: ''
      } 

      this.generalService.createScheduleDoctor(tempSchedule).subscribe({
        next: (item) => {
          console.log('horario con día ' + itemDia + ' creado correctamente');
          console.log(item);          
        },
        error: (error) => {
          console.log('Ha ocurrido un error al generar el horario');
          console.log(error);
        }
      })
    })
  }
}
