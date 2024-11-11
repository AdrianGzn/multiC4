import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ScheduleEmployeeComponent } from './schedule-employee/schedule-employee.component';

@NgModule({
  declarations: [
    ScheduleEmployeeComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    SharedModule
  ]
})
export class SchedulesModule { }
