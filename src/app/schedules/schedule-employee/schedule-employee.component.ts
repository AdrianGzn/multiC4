import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { UserService } from '../../shared/services/user.service';
import { ScheduleDoctor } from '../../shared/models/schedule-doctor';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-schedule-employee',
  templateUrl: './schedule-employee.component.html',
  styleUrls: ['./schedule-employee.component.css']
})
export class ScheduleEmployeeComponent implements OnInit, AfterViewInit {
  schedulesFiltered: ScheduleDoctor[] = [];
  user: User = {
    id_usuario: 0,
    id_rol: 0,
    nombre: '',
    id_establecimiento: 0,
    id_servicio: 0
  };

  persona_dia: any[] = [];
  diasSemana: string[] = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  // Formulario reactivo
  formSchedules: FormGroup;

  constructor(
    private generalServices: GeneralServices,
    private userService: UserService
  ) {
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
  
    this.generalServices.getAllHorsById(1).subscribe({
      next: (item: ScheduleDoctor[]) => {
        console.log(item);
        console.log('Se han obtenido los horarios del doctor exitosamente');
        
        // Asignamos los horarios a los días de la semana
        item.forEach((schedule: ScheduleDoctor) => {
          if (this.diasSemana.includes(schedule.dia)) {
            this.persona_dia.push({
              "día": schedule.dia,
              "entrada": schedule.entrada,
              "salida": schedule.salida
            });
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
        // Comprobamos si existe un control para cada día
        const entradaControl = this.formSchedules.get(itemDay.día + 'E');
        const salidaControl = this.formSchedules.get(itemDay.día + 'S');
        if (entradaControl) {
          entradaControl.setValue(itemDay.entrada);
        }
        if (salidaControl) {
          salidaControl.setValue(itemDay.salida);
        }
      });
    }, 0); // Usamos setTimeout para retrasar la ejecución y asegurarnos de que el formulario ya está renderizado.
  }

  onSubmit(): void {
    let diasSemana = this.diasSemana.map(dia => ({
      dia: dia,
      entrada: this.formSchedules.value[`${dia}E`],
      salida: this.formSchedules.value[`${dia}S`]
    }));

    this.schedulesFiltered.forEach((item: ScheduleDoctor) => {
      const diaConfig = diasSemana.find(d => d.dia === item.dia.toLowerCase());
      if (diaConfig) {
        item.entrada = diaConfig.entrada;
        item.salida = diaConfig.salida;
      }
    });

    this.schedulesFiltered.forEach((item: ScheduleDoctor) => {
      this.generalServices.changeScheduleDoctor(item.id_horario, item).subscribe({
        next: (item) => {
          console.log('Se ha guardado correctamente el item con día: ' + item.dia);
        },
        error: (error) => {
          console.log('Ha ocurrido un error');
          console.log(error);
        }
      });
    });
  }
}