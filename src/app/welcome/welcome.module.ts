import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePatientComponent } from './welcome-patient/welcome-patient.component';
import { WelcomeDoctorComponent } from './welcome-doctor/welcome-doctor.component';
import { WelcomeReceptionistComponent } from './welcome-receptionist/welcome-receptionist.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WelcomePatientComponent,
    WelcomeDoctorComponent,
    WelcomeReceptionistComponent,
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule
  ]
})
export class WelcomeModule { }
