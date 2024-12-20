import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEstablishmentComponent } from './search-establishment/search-establishment.component';
import { DetailsEstablishmentComponent } from './details-establishment/details-establishment.component';
import { SaveEstablishmentComponent } from './save-establishment/save-establishment.component';
import { EstablishmentRoutingModule } from './establishment-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardEstablishmentComponent } from './card-establishment/card-establishment.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe'; 

@NgModule({
  declarations: [
    SearchEstablishmentComponent,
    DetailsEstablishmentComponent,
    SaveEstablishmentComponent,
    CardEstablishmentComponent,
    MapComponent,
    TitleCasePipe,
    DateFormatPipe,

  ],
  imports: [
    CommonModule,
    EstablishmentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    FontAwesomeModule
  ]
})
export class EstablishmentModule { }
