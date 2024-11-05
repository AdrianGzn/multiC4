import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignPatientComponent } from './sign-patient/sign-patient.component';
import { SignEmployeeComponent } from './sign-employee/sign-employee.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sign-patient', component: SignPatientComponent },
  { path: 'sign-employee', component: SignEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLogRoutingModule { }
