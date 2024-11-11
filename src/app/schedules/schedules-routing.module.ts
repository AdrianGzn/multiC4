import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEmployeeComponent } from './schedule-employee/schedule-employee.component';

const routes: Routes = [
    { path: 'scheduleEmployee', component: ScheduleEmployeeComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SchedulesRoutingModule { }
  