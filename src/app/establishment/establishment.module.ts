import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEstablishmentComponent } from './search-establishment/search-establishment.component';
import { DetailsEstablishmentComponent } from './details-establishment/details-establishment.component';
import { SaveEstablishmentComponent } from './save-establishment/save-establishment.component';
import { EstablishmentRoutingModule } from './establishment-routing.module';
import { HeaderPatientComponent } from '../shared/components/header-patient/header-patient.component';
import { HeaderReceptionistComponent } from '../shared/components/header-receptionist/header-receptionist.component';


@NgModule({
  declarations: [
    SearchEstablishmentComponent,
    DetailsEstablishmentComponent,
    SaveEstablishmentComponent,
    HeaderPatientComponent,
    HeaderReceptionistComponent
  ],
  imports: [
    CommonModule,
    EstablishmentRoutingModule
  ]
})
export class EstablishmentModule { }
