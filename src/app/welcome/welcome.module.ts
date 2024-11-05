import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePatientComponent } from './welcome-patient/welcome-patient.component';
import { WelcomeDoctorComponent } from './welcome-doctor/welcome-doctor.component';
import { WelcomeReceptionistComponent } from './welcome-receptionist/welcome-receptionist.component';
import { HeaderDoctorComponent } from '../shared/components/header-doctor/header-doctor.component';
import { HeaderPatientComponent } from '../shared/components/header-patient/header-patient.component';
import { HeaderReceptionistComponent } from '../shared/components/header-receptionist/header-receptionist.component';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  declarations: [
    WelcomePatientComponent,
    WelcomeDoctorComponent,
    WelcomeReceptionistComponent,
    HeaderDoctorComponent,
    HeaderPatientComponent,
    HeaderReceptionistComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
