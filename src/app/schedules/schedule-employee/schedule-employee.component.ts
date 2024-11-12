import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';
import { Horarios } from '../../shared/models/horarios';
import { OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-schedule-employee',
  templateUrl: './schedule-employee.component.html',
  styleUrl: './schedule-employee.component.css'
})
export class ScheduleEmployeeComponent implements OnInit {
  user: User = {
    id_usuario: 0,
    id_rol: 0,
    nombre: '',
    horario: [],
    id_establecimiento: 0,
    id_servicio: 0
  };

  ngOnInit(): void {
      /*const data = localStorage.getItem('userData');
      
      if (data) {
        const dataUser: User = JSON.parse(data);
        this.user = dataUser;
        console.log(this.user);
      } else {
        console.log("No se encontró 'userData' en el localStorage");
      }*/
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
    let dias: Horarios[] = [
      {
        dia: 'domingo',
        entrada: this.formSchedules.value.domingoE,
        salida: this.formSchedules.value.domingoS
      },
      {
        dia: 'lunes',
        entrada: this.formSchedules.value.lunesE,
        salida: this.formSchedules.value.lunesS
      },
      {
        dia: 'martes',
        entrada: this.formSchedules.value.martesE,
        salida: this.formSchedules.value.martesS
      },
      {
        dia: 'miercoles',
        entrada: this.formSchedules.value.miercolesE,
        salida: this.formSchedules.value.miercolesS
      },
      {
        dia: 'jueves',
        entrada: this.formSchedules.value.juevesE,
        salida: this.formSchedules.value.juevesS
      },
      {
        dia: 'viernes',
        entrada: this.formSchedules.value.viernesE,
        salida: this.formSchedules.value.viernesS
      },
      {
        dia: 'sabado',
        entrada: this.formSchedules.value.sabadoE,
        salida: this.formSchedules.value.sabadoS
      }
    ];

    this.user.horario = dias;
    this.userService.changeEmployee(`${this.user.id_usuario}`, this.user).subscribe({
      next: (response) => {
        console.log("Niceee: " + response);
      },
      error: (error) => {
        console.log("Not nice: " + error);        
      }
    })
    
  }
}
