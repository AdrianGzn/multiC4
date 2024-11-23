import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { UserService } from '../../shared/services/user.service';
import { ScheduleDoctor } from '../../shared/models/schedule-doctor';
import { User } from '../../shared/models/user';
import { ScheduleDoctorResponse } from '../../shared/models/schedule-doctor-response';
import { ScheduleDoctorToPut } from '../../shared/models/schedule-doctor-to-put';
import { SchedulesFromUserId } from '../../shared/models/schedules-from-user-id';

@Component({
  selector: 'app-schedule-employee',
  templateUrl: './schedule-employee.component.html',
  styleUrls: ['./schedule-employee.component.css']
})
export class ScheduleEmployeeComponent implements OnInit, AfterViewInit {
  user: User = {
    id_usuario: 0,
      id_rol: 0,
      nombre: '',
      contraseña: '',
      id_establecimiento: 0,
      localidad: '',
      id_servicio: 0
  };

  persona_dia: SchedulesFromUserId[] = [];
  diasSemana: string[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  formSchedules: FormGroup;

  constructor(private generalServices: GeneralServices, private userService: UserService) {
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
    this.user = this.userService.getUser();
    
    this.generalServices.getAllHorsById(this.user.id_usuario).subscribe({
      next: (item: SchedulesFromUserId[]) => {
        console.log('Se han obtenido los horarios del doctor exitosamente');
        
        item.forEach((schedule: SchedulesFromUserId) => {
          if (this.diasSemana.includes(schedule.dia)) {
            this.persona_dia.push(schedule);
          }
        });
      },
      error: (error) => {
        console.log('Ha habido un error al obtener los horarios.');
        console.log(error);
      }
    });
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
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
    }, 0);
  }
  

  onSubmit(): void {    
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
      }      

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
  }

  onSome(): void {
    let tempSchedule: ScheduleDoctorToPut = {
      id_horario: 1,
      día: 'domingo',
      id_usuario: 1,
      entrada: '02:29:52.054Z',
      salida: '02:29:52.054Z'
    };
    
    console.log(tempSchedule);
  
    this.generalServices.changeScheduleDoctor(1, tempSchedule).subscribe({
      next: (changeResponse: ScheduleDoctorToPut) => {
        console.log('Se ha guardado correctamente el item con día: ' + changeResponse.día);
      },
      error: (error) => {
        console.log('Ha ocurrido un error');
        console.log(error);
      }
    });
  }
}