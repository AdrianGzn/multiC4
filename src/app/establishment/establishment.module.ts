import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEstablishmentComponent } from './search-establishment/search-establishment.component';
import { DetailsEstablishmentComponent } from './details-establishment/details-establishment.component';
import { SaveEstablishmentComponent } from './save-establishment/save-establishment.component';
import { EstablishmentRoutingModule } from './establishment-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardEstablishmentComponent } from './card-establishment/card-establishment.component';
import { GenerateEstablishmentComponent } from './generate-establishment/generate-establishment.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    SearchEstablishmentComponent,
    DetailsEstablishmentComponent,
    SaveEstablishmentComponent,
    CardEstablishmentComponent,
    GenerateEstablishmentComponent,
    MapComponent

  ],
  imports: [
    CommonModule,
    EstablishmentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    GoogleMapsModule
  ]
})
export class EstablishmentModule { }
