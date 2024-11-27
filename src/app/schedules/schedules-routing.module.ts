import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEmployeeComponent } from './schedule-employee/schedule-employee.component';
import { GeneralServices } from '../shared/services/general-services.service';

const routes: Routes = [
    { path: 'scheduleEmployee', component: ScheduleEmployeeComponent,  },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SchedulesRoutingModule implements OnInit {
    constructor(private generalService: GeneralServices) {}
    ngOnInit(): void {
      this.generalService
    }
   }
  