import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { User } from '../../shared/models/user';
import { SchedulesFromUserId } from '../../shared/models/schedules-from-user-id';
import Swal from 'sweetalert2';
import { ScheduleDoctorToPut } from '../../shared/models/schedule-doctor-to-put';
import { EstablishmentGetResponse } from '../../shared/models/establishment-get-response';
import { Schedule } from '../../shared/models/schedule';

@Component({
  selector: 'app-schedule-employee',
  templateUrl: './schedule-employee.component.html',
  styleUrls: ['./schedule-employee.component.css']
})
export class ScheduleEmployeeComponent implements OnInit {
  user: User = {
    id_usuario: 0,
    id_rol: 0,
    nombre: '',
    contraseña: '',
    id_establecimiento: 0,
    localidad: '',
    id_servicio: 0
  };

  currentSchedule: Schedule = {
    id_horario: 0,
    entrada: '',
    salida: ''
  }

  persona_dia: SchedulesFromUserId[] = [];
  diasSemana: string[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  formSchedules: FormGroup;

  constructor(private generalServices: GeneralServices) {
    this.formSchedules = new FormGroup({
      domingoE: new FormControl(null, [Validators.required]),
      domingoS: new FormControl(null, [Validators.required]),
      lunesE: new FormControl(null, [Validators.required]),
      lunesS: new FormControl(null, [Validators.required]),
      martesE: new FormControl(null, [Validators.required]),
      martesS: new FormControl(null, [Validators.required]),
      miercolesE: new FormControl(null, [Validators.required]),
      miercolesS: new FormControl(null, [Validators.required]),
      juevesE: new FormControl(null, [Validators.required]),
      juevesS: new FormControl(null, [Validators.required]),
      viernesE: new FormControl(null, [Validators.required]),
      viernesS: new FormControl(null, [Validators.required]),
      sabadoE: new FormControl(null, [Validators.required]),
      sabadoS: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    const user = localStorage.getItem("userData");
    const finalUser = user ? JSON.parse(user) : null;
    this.user = finalUser;
    console.log(this.user);

    this.generalServices.getAllHorsById(this.user.id_usuario).subscribe({
      next: (item: SchedulesFromUserId[]) => {
        console.log('Se han obtenido los horarios del doctor exitosamente');
        
        this.persona_dia = item.filter(schedule => this.diasSemana.includes(schedule.dia));
        
        // Llamar a la función para cargar los datos en el formulario
        this.cargarHorariosEnFormulario();
      },
      error: (error) => {
        console.log('Ha habido un error al obtener los horarios.');
        console.log(error);
      }
    });

    this.getCurrentScheduleEstablishment();
  }

  cargarHorariosEnFormulario(): void {
    this.persona_dia.forEach(itemDay => {
      const entradaControl = this.formSchedules.get(itemDay.dia + 'E');
      const salidaControl = this.formSchedules.get(itemDay.dia + 'S');
      
      if (entradaControl) {
        entradaControl.setValue(itemDay.entrada.slice(0, 5));
      }
      if (salidaControl) {
        salidaControl.setValue(itemDay.salida.slice(0, 5));
      }
    });

    Swal.fire(
      'Horario del establecimiento',
      'La entrada es: ' + this.currentSchedule.entrada + ' y la salida: ' + this.currentSchedule.salida,
      'success'
    );
  }

  onSubmit(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas guardar los horarios?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.validarHorarioFormulario()) {
          let diasSemana = this.diasSemana.map(dia => ({
            dia: dia,
            entrada: this.formSchedules.value[`${dia}E`],
            salida: this.formSchedules.value[`${dia}S`]
          }));
  
          this.persona_dia.forEach((item: SchedulesFromUserId) => {
            const diaConfig = diasSemana.find(d => d.dia === item.dia.toLowerCase());
            if (diaConfig) {
              item.entrada = diaConfig.entrada;
              item.salida = diaConfig.salida;
            }
          });
  
          console.log(this.persona_dia);
          this.persona_dia.forEach((item: SchedulesFromUserId) => {
            let tempSchedule: ScheduleDoctorToPut = {
              id_horario: item.id_schedule_doctor,
              día: item.dia,
              id_usuario: item.id_doctor,
              entrada: item.entrada,
              salida: item.salida
            };
  
            this.generalServices.changeScheduleDoctor(tempSchedule.id_horario, tempSchedule).subscribe({
              next: (changeResponse: ScheduleDoctorToPut) => {
                console.log(changeResponse);
              },
              error: (error) => {
                console.log('Ha ocurrido un error');
                console.log(error);
              }
            });
          });
  
          this.cargarHorariosEnFormulario();
  
          Swal.fire(
            '¡Guardado!',
            'Los horarios han sido guardados exitosamente.',
            'success'
          );
        }else {

          Swal.fire(
            'Error',
            'Los horarios no están dentro del rango del horario del establecimiento.',
            'error'
          );

        }
        
      } else {
        Swal.fire(
          'Cancelado',
          'Los horarios no fueron guardados.',
          'error'
        );
      }
    });
  }

  getCurrentScheduleEstablishment(): void {
    this.generalServices.getEstablishment().subscribe({
      next: (itemEstablishments: EstablishmentGetResponse[]) => {        
        itemEstablishments.forEach((elementEstablishment: EstablishmentGetResponse) => {
          
          if (this.user.id_establecimiento == elementEstablishment.id_establecimiento) {
            console.log(elementEstablishment); 
            this.generalServices.getSchedule().subscribe({
              next: (itemSchedules: Schedule[]) => {

                itemSchedules.forEach((elementEschedule: Schedule) => {
                  if (elementEschedule.id_horario === elementEstablishment.id_horario) {

                    this.currentSchedule = elementEschedule;
                    console.log(this.currentSchedule);
                    
                  }
                });

              },
              error: (error) => {
                console.log('Ha ocurrido un error al obtener los horarios');
                console.log(error);
              }
            })

          }
        });
      },
      error: (error) => {
        console.log('Ha ocurrido un error al obtener los horarios de los hospitales');
        console.log(error);
      }
    });
  }

  validarHorarioFormulario(): boolean {
    let esValido = true;
  
    this.diasSemana.forEach(dia => {
      const entrada = this.formSchedules.value[`${dia}E`];
      const salida = this.formSchedules.value[`${dia}S`];
  
      if (!this.horarioEsValido(entrada, salida)) {
        esValido = false;
      }
    });
  
    return esValido;
  }
  
  horarioEsValido(entrada: string, salida: string): boolean {
    return entrada >= this.currentSchedule.entrada && salida <= this.currentSchedule.salida && entrada < salida;
  }
  
}
