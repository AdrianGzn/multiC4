import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPatientComponent } from './header-patient/header-patient.component';
import { HeaderDoctorComponent } from './header-doctor/header-doctor.component';
import { HeaderReceptionistComponent } from './header-receptionist/header-receptionist.component';
import { TestsComponent } from './tests/tests.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [
    HeaderPatientComponent,
    HeaderDoctorComponent,
    HeaderReceptionistComponent,
    TestsComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    HeaderPatientComponent,
    HeaderDoctorComponent,
    HeaderReceptionistComponent,
  ]
})
export class SharedModule {}
