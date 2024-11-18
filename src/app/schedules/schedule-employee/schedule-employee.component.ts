import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { ScheduleDoctor } from '../../shared/models/schedule-doctor';

@Component({
  selector: 'app-schedule-employee',
  templateUrl: './schedule-employee.component.html',
  styleUrl: './schedule-employee.component.css'
})
export class ScheduleEmployeeComponent implements OnInit {
  schedulesFiltered: ScheduleDoctor[] = [];
  user: User = {
    id_usuario: 0,
    id_rol: 0,
    nombre: '',
    id_establecimiento: 0,
    id_servicio: 0
  };

  ngOnInit(): void {
    let díasOrdenados = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    this.user = this.userService.getUser();

    this.generalServices.getScheduleDoctor().subscribe({
      next: (item: ScheduleDoctor[]) => {
        console.log('Se han obtenido los horarios del doctor exitosamente');
        
        item.map((schedule: ScheduleDoctor) => {
          if (schedule.id_doctor === this.user.id_usuario) {
            this.schedulesFiltered.push(schedule);
          }
        })
      },
      error: (error) => {
        console.log('Ha habido un error al obtener los horarios.');
        console.log(error);
      }
    });

    this.schedulesFiltered.sort((a, b) => {
      return díasOrdenados.indexOf(a.dia.toLowerCase()) - díasOrdenados.indexOf(b.dia.toLowerCase());
    });
  }
  

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
      sabadoS: new FormControl(null, [Validators.required]),
      sabadoE: new FormControl(null, [Validators.required]),
    });

  }

  onSubmit(): void {
    let diasSemana = [
      { 
        dia: 'domingo', 
        entrada: this.formSchedules.value.domingoE, 
        salida: this.formSchedules.value.domingoS 
      },{ 
        dia: 'lunes', 
        entrada: this.formSchedules.value.lunesE, 
        salida: this.formSchedules.value.lunesS 
      },{ 
        dia: 'martes', 
        entrada: this.formSchedules.value.martesE, 
        salida: this.formSchedules.value.martesS 
      },{ 
        dia: 'miercoles', 
        entrada: this.formSchedules.value.miercolesE, 
        salida: this.formSchedules.value.miercolesS 
      },{ 
        dia: 'jueves', 
        entrada: this.formSchedules.value.juevesE, 
        salida: this.formSchedules.value.juevesS
      },{ 
        dia: 'viernes', 
        entrada: this.formSchedules.value.viernesE, 
        salida: this.formSchedules.value.viernesS 
      },{ 
        dia: 'sabado', 
        entrada: this.formSchedules.value.sabadoE, 
        salida: this.formSchedules.value.sabadoS 
      },
    ];

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
          console.log('Se ha guardado correctamente el item con día: ' + item.dia)
        },
        error: (error) => {
          console.log('Ha ocurrido un error');
          console.log(error);
        }
      })
    })
    
  }
}
