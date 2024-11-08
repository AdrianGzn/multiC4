import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchEstablishmentComponent } from './search-establishment/search-establishment.component';
import { DetailsEstablishmentComponent } from './details-establishment/details-establishment.component';
import { SaveEstablishmentComponent } from './save-establishment/save-establishment.component';
import { EstablishmentRoutingModule } from './establishment-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SearchEstablishmentComponent,
    DetailsEstablishmentComponent,
    SaveEstablishmentComponent,
  ],
  imports: [
    CommonModule,
    EstablishmentRoutingModule,
    SharedModule
  ]
})
export class EstablishmentModule { }
