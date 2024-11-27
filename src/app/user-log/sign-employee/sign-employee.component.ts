import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { GeneralServices } from '../../shared/services/general-services.service';
import { ScheduleDoctor } from '../../shared/models/schedule-doctor';
import { User } from '../../shared/models/user';
import { ScheduleDoctorResponse } from '../../shared/models/schedule-doctor-response';
import { UserToPost } from '../../shared/models/user-to-post';


@Component({
  selector: 'app-sign-employee',
  templateUrl: './sign-employee.component.html',
  styleUrls: ['./sign-employee.component.css']  
})
export class SignEmployeeComponent {
  signInForm: FormGroup;

  newSchedule: ScheduleDoctor[] = [];

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
      contraseña: '',
      id_establecimiento: 0,
      localidad: '',
      id_servicio: 0
    };

    let idRole: number = 0;

    if (this.signInForm.value.role === "Doctor") {
      idRole = 2;
    }else if (this.signInForm.value.role === "Recepcionista") {
      idRole = 3;
    }

    const newEmployee: UserToPost = {
      id_rol: 2,
      nombre: this.signInForm.value.username,
      contraseña: this.signInForm.value.password,
      localidad: 'nothing'
    }
    

    if(this.signInForm.valid){
      if (this.signInForm.value.role === 'Doctor') {
        newEmployee.id_rol = 2;
      } else if (this.signInForm.value.role === 'Recepcionista') {
        newEmployee.id_rol = 3;
      }

      if (this.signInForm.value.password === this.signInForm.value.confirmPassword) {
        this.userService.register(newEmployee).subscribe({
          next: (data: User) => {
            localStorage.setItem('userData', JSON.stringify(data));  
                        
            this.userService.saveUser(data);

            let currentDoctor = localStorage.getItem("userData")

            if(currentDoctor) {
              myUser = JSON.parse(currentDoctor)
            }
            if (data.id_rol === 2) {
              console.log(myUser)
              this.createSchedulesForDoctor(myUser.id_usuario);
              this.router.navigate(['/welcome/doctor']); 
            }
            if (data.id_rol === 3) {
              this.router.navigate(['/welcome/receptionist']); 
            }
            
          },
          error: (error) => {
            console.log('Ha ocurrido un error al crear el rol del usuario');
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
    let dias = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

    dias.forEach((itemDia) => {

      let tempSchedule: ScheduleDoctorResponse = {
        día: itemDia,
        id_usuario: idDoctor,
        entrada: '00:00:00.000Z',
        salida: '00:00:00.000Z'
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
