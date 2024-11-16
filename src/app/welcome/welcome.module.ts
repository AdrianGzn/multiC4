import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePatientComponent } from './welcome-patient/welcome-patient.component';
import { WelcomeDoctorComponent } from './welcome-doctor/welcome-doctor.component';
import { WelcomeReceptionistComponent } from './welcome-receptionist/welcome-receptionist.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CartpatientComponent } from './cartpatient/cartpatient.component';
import { CartpatientcampanisComponent } from './cartpatientcampanis/cartpatientcampanis.component';
import { SitiosComponent } from './sitios/sitios.component';
import { FooterpatientComponent } from './footerpatient/footerpatient.component';
import { HeaderPatientComponent } from '../shared/header-patient/header-patient.component';

@NgModule({
  declarations: [
    WelcomePatientComponent,
    WelcomeDoctorComponent,
    WelcomeReceptionistComponent,
    CartpatientComponent,
    CartpatientcampanisComponent,
    SitiosComponent,
    FooterpatientComponent,
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SharedModule
  ]
})
export class WelcomeModule { }
