import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPatientComponent } from './header-patient/header-patient.component';
import { HeaderDoctorComponent } from './header-doctor/header-doctor.component';
import { HeaderReceptionistComponent } from './header-receptionist/header-receptionist.component';


@NgModule({
  declarations: [
    HeaderPatientComponent,
    HeaderDoctorComponent,
    HeaderReceptionistComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderPatientComponent,
    HeaderDoctorComponent,
    HeaderReceptionistComponent
  ]
})
export class SharedModule { }
