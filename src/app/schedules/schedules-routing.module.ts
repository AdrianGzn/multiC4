import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';

const routes: Routes = [
    { path: 'mySchedule', component: MyScheduleComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class SchedulesRoutingModule { }
  