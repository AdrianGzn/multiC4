import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeDoctorComponent } from './welcome-doctor/welcome-doctor.component';
import { WelcomePatientComponent } from './welcome-patient/welcome-patient.component';
import { WelcomeReceptionistComponent } from './welcome-receptionist/welcome-receptionist.component';

const routes: Routes = [
  { path: 'patient', component: WelcomePatientComponent },
  { path: 'receptionist', component: WelcomeReceptionistComponent },
  { path: 'doctor', component: WelcomeDoctorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
