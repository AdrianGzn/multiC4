import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignPatientComponent } from './sign-patient/sign-patient.component';
import { SignEmployeeComponent } from './sign-employee/sign-employee.component';
import { UserLogRoutingModule } from './user-log-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignPatientComponent,
    SignEmployeeComponent
  ],
  imports: [
    CommonModule,
    UserLogRoutingModule
  ]
})
export class UserLogModule { }
