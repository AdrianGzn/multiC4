import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleEmployeeComponent } from './schedule-employee/schedule-employee.component';
import { authGuard } from '../welcome/guards/auth.guard';
const routes: Routes = [
    { path: 'scheduleEmployee', component: ScheduleEmployeeComponent,canActivate: [authGuard]  },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SchedulesRoutingModule { }
  