import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSeeComponent } from './user-see/user-see.component';
import { ReceptionistSeeComponent } from './receptionist-see/receptionist-see.component';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { GeneralsComponent } from './generals/generals.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardCampaignComponent } from './card-campaign/card-campaign.component';
import { UserDoctorComponent } from './user-doctor/user-doctor.component';


@NgModule({
  declarations: [
    UserSeeComponent,
    ReceptionistSeeComponent,
    DetailsComponent,
    DeleteComponent,
    UpdateComponent,
    GeneralsComponent,
    UserDoctorComponent,
    CardCampaignComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CampaignsModule { }
