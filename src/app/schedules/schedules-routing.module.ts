import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEmployeeComponent } from './schedule-employee/schedule-employee.component';
import { authGuard } from '../shared/guards/auth.guard';
const routes: Routes = [
    { path: 'scheduleEmployee', component: ScheduleEmployeeComponent,  },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SchedulesRoutingModule { }
  