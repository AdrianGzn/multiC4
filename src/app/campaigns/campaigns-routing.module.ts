import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { DetailsComponent } from './details/details.component';
import { GeneralsComponent } from './generals/generals.component';
import { ReceptionistSeeComponent } from './receptionist-see/receptionist-see.component';
import { UpdateComponent } from './update/update.component';
import { UserSeeComponent } from './user-see/user-see.component';

const routes: Routes = [
  { path: 'delete', component: DeleteComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'generals', component: GeneralsComponent },
  { path: 'receptionistSee', component: ReceptionistSeeComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'userSee', component: UserSeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
