import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeDoctorComponent } from './welcome-doctor/welcome-doctor.component';
import { WelcomePatientComponent } from './welcome-patient/welcome-patient.component';
import { WelcomeReceptionistComponent } from './welcome-receptionist/welcome-receptionist.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'patient', component: WelcomePatientComponent,canActivate: [AuthGuard]  },
  { path: 'receptionist', component: WelcomeReceptionistComponent,canActivate: [AuthGuard]  },
  { path: 'doctor', component: WelcomeDoctorComponent, canActivate: [AuthGuard] },
  { path: 'landing', component: LandingComponent, },
  { path: '**', redirectTo: '/login' },


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
