import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateComponent } from './generate/generate.component';
import { SeeComponent } from './see/see.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GenerateComponent,
    SeeComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AppointmentsModule { }
