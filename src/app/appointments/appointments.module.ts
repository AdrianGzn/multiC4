import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateComponent } from './generate/generate.component';
import { SeeComponent } from './see/see.component';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SeedoctorComponent } from './seedoctor/seedoctor.component';
import { SeereceptionistComponent } from './seereceptionist/seereceptionist.component';
import { CardQuoteDoctorComponent } from './card-quote-doctor/card-quote-doctor.component';
import { QuotePatientComponent } from './quote-patient/quote-patient.component';
@NgModule({
  declarations: [
    GenerateComponent,
    SeeComponent,
    SeedoctorComponent,
    SeereceptionistComponent,
    CardQuoteDoctorComponent,
    QuotePatientComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AppointmentsModule { }
