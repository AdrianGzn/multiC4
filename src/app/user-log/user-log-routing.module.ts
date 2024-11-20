import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignPatientComponent } from './sign-patient/sign-patient.component';
import { SignEmployeeComponent } from './sign-employee/sign-employee.component';
import { LandingComponent } from '../welcome/landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-patient', component: SignPatientComponent },
  { path: 'sign-employee', component: SignEmployeeComponent },
  { path: 'sign-regresar', component: LoginComponent },
  { path: 'sign-login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLogRoutingModule { }
