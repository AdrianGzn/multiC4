import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPatientComponent } from './shared/components/header-patient/header-patient.component';
import { HeaderDoctorComponent } from './shared/components/header-doctor/header-doctor.component';
import { HeaderReceptionistComponent } from './shared/components/header-receptionist/header-receptionist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPatientComponent,
    HeaderDoctorComponent,
    HeaderReceptionistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
