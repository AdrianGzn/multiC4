import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { GeneralServices } from '../../shared/services/general-services.service';
import { ScheduleDoctor } from '../../shared/models/schedule-doctor';
import { ScheduleDoctorResponse } from '../../shared/models/schedule-doctor-response';
import { User } from '../../shared/models/user';
import { EstablishmentResponse } from '../../shared/models/establishment-response';
import { Schedule } from '../../shared/models/schedule';
import { ScheduleResponse } from '../../shared/models/schedule-response';
import { AddressResponse } from '../../shared/models/address-response';
import { Establishment } from '../../shared/models/establishment';
import { error } from 'console';


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
      horario: [],
      id_establecimiento: 0,
      id_servicio: 0
    };
    let role = 0;
    let userCreated = false;

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
  
      
      console.log(newPatient);


      if (this.signInForm.value.password === this.signInForm.value.confirmPassword) {
        this.userService.register(newPatient).subscribe({
          next: (data: User) => {
            myUser = data
            console.log(myUser);

            if(role == 3){
              this.days.forEach(element => {
                let temp: ScheduleDoctorResponse = {
                  id_doctor: 0,
                  dia: element,
                  entrada: '',
                  salida: ''
                }
                this.generalService.createScheduleDoctor(temp).subscribe({
                  next: (dataSchedule) => {
                    this.newSchedule.push(dataSchedule)
                  },
                  error: (error) => {
                    console.log('No se ha podido crear el horario para el doctor con id ' + data.id_usuario + ' con error: ' + error);
                  }
                })
              });

              localStorage.setItem('HorariosDeDoctor', JSON.stringify(this.newSchedule));
              this.router.navigate(['/welcome/patient']);

            }else if (role == 2) {
              console.log('Si llega a la condicional para recepcionista');
              
              let tempSchedule: ScheduleResponse = {
                entrada: '',
                salida: '' 
              }

              let tempAddress: AddressResponse = {
                latitud: 0,
                longitud: 0,
                descripcion: '',
                calle: '',
                colonia: '',
                numero: 0
              }

              let tempEstablishment: EstablishmentResponse = {
                id_tipo_establecimiento: 0,
                descripción: '',
                categoria: '',
                id_dirección: 0,
                id_horario: 0,
                nombre: ''
              }

              this.generalService.createSchedule(tempSchedule).subscribe({
                next: (itemSchedule: Schedule) => {
                  console.log('Si llega a la peticion para el horario');
                  tempEstablishment.id_horario = itemSchedule.id_horario;

                  this.generalService.createAddress(tempAddress).subscribe({
                    next: (itemAddress) => {
                      console.log('Si llega a la peticion para la dirección');
                      tempEstablishment.id_dirección = itemAddress.id_address;
                      
                      this.generalService.createEstablishment(tempEstablishment).subscribe({
                        next: (itemEstablishment: Establishment) => {
                          console.log('Si llega a la peticion para el establecimiento');
                          myUser.id_establecimiento = itemEstablishment.id_establishment;
                          
                          this.userService.updateUser(myUser).subscribe({
                            next: (item: User) => {
                              console.log('Id de establecimiento asignada correctamente a recepcionista: ');
                              console.log(item);
                            },
                            error: () => {
                              console.log('No se ha podido editar el perfil de recepcionista: ' + error);
                            }
                          })
                        },
                        error: (error) => {
                          console.log('No se ha podido crear el perfil para recepcionista: ' + error);
                        }
                      })

                    },
                    error: (error) => {
                      console.log('No se ha podido crear la dirección para recepcionista: ' + error);
                    }
                  })
                },
                error: (error) => {
                  console.log('No se ha podido crear el horario para recepcionista: ' + error);
                }
              })

            }

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
