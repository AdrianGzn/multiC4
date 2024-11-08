import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyScheduleComponent } from './my-schedule/my-schedule.component';
import { SchedulesRoutingModule } from './schedules-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MyScheduleComponent
  ],
  imports: [
    CommonModule,
    SchedulesRoutingModule,
    SharedModule
  ]
})
export class SchedulesModule { }
