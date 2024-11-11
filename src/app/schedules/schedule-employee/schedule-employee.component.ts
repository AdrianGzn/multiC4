import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralServices } from '../../shared/services/general-services.service';

@Component({
  selector: 'app-schedule-employee',
  templateUrl: './schedule-employee.component.html',
  styleUrl: './schedule-employee.component.css'
})
export class ScheduleEmployeeComponent {
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
      sabadoS: new FormControl(null, [Validators.required]),
      sabadoE: new FormControl(null, [Validators.required]),
    });

  }
}
